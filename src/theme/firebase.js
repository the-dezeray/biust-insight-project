import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';

// Initialize Firebase
const app = firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);  // Initialize Firestore

// Sign out function
export const logout = (afterAction = () => {}) => {
  signOut(auth).then(r => afterAction(null));
};

// Function to validate BIUST student email
const isValidBIUSTEmail = (email) => {
  return email.endsWith('@studentmail.biust.ac.bw');
};

// Function to add a user to Firestore only if they don't already exist
const addUserToFirestore = async (user) => {
  try {
    const userDocRef = doc(db, 'users', user.email);  // Reference to the user's document
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      // If the user doesn't exist in Firestore, add them
      await setDoc(userDocRef, {
        email: user.email,
        displayName: user.displayName,
        createdAt: new Date(),  // Set creation date as the current date
        payable: false
      });
      console.log('User added to Firestore');
    } else {
      console.log('User already exists in Firestore');
    }
  } catch (err) {
    console.error('Error checking/adding user to Firestore:', err);
  }
};

// Function to calculate the difference in days between two dates
const getDaysDifference = (date1, date2) => {
  const msInDay = 24 * 60 * 60 * 1000;  // Number of milliseconds in one day
  const diffInMs = Math.abs(date2 - date1);
  return Math.floor(diffInMs / msInDay);
};

// Function to check if the user account is older than 4 days and if the user exists in Firestore
const checkUserAfterSignIn = async (user) => {
  const creationTime = new Date(user.metadata.creationTime);  // Account creation time
  const currentTime = new Date();  // Current time
  const daysSinceCreation = getDaysDifference(creationTime, currentTime);
  // Check if more than 4 days have passed
  if (daysSinceCreation > 4) {
    const userDocRef = doc(db, 'users', user.email);
    const userDoc = await getDoc(userDocRef);
    if (!userDoc.exists()) {
      // User is not in Firestore
      alert('Warning: You need to take action on your account!');
    }
  }
};

// Sign in with Google and check if the user is valid
export const signInWithGoogle = async (setErrorMessage) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    
    if (!isValidBIUSTEmail(user.email)) {
      await signOut(auth);  // Sign out the user immediately
      setErrorMessage('Only BIUST student emails are allowed.');
      return null;
    }
    
    // Add the user to Firestore if it's their first sign-in
    await addUserToFirestore(user);
    // Call function to check the user after sign-in
    await checkUserAfterSignIn(user);
    
    setErrorMessage(null); // Clear any previous error messages
    return user;  // Return the user object for further use if needed
   
  } catch (err) {
    console.error(err);
    setErrorMessage(err.message);
    return null;
  }
};