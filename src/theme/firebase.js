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
  console.log("Checking user after sign in...");
  const userDocRef = doc(db, 'users', user.email);
  const userDoc = await getDoc(userDocRef);
  
  if (userDoc.exists()) {
    const userData = userDoc.data();
    console.log("User data:", userData);
    const creationTime = userData.createdAt.toDate();
    const currentTime = new Date();
    const daysSinceCreation = getDaysDifference(creationTime, currentTime);
    console.log("Days since creation:", daysSinceCreation);
    
    if (daysSinceCreation > 2 && !userData.payable) {
      console.log("Trial ended");
      return { trialEnded: true };
    }
  }
  return null;
};

// Sign in with Google and check if the user is valid
export const signInWithGoogle = async () => {
  try {
    console.log("Attempting Google sign in...");
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    
    if (!isValidBIUSTEmail(user.email)) {
      console.log("Invalid email, signing out");
      await signOut(auth);
      return { error: 'Only BIUST student emails are allowed.' };
    }
    
    console.log("Valid email, adding user to Firestore");
    await addUserToFirestore(user);
    
    console.log("Sign in successful");
    return { user };
   
  } catch (err) {
    console.error("Error during sign in:", err);
    return { error: err.message || 'An error occurred during sign in.' };
  }
};
