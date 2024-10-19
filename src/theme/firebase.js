import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
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

// Declare currentUserEmail at the module level
let currentUserEmail = null;

// Sign out function
export const logout = (afterAction = () => {}) => {
  signOut(auth).then(() => {
    currentUserEmail = null;
    afterAction(null);
  });
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
    
    if (daysSinceCreation >= 2  &&  !userData.payable) {
      console.log("Trial ended, logging out user in the background");
      signOut(auth).catch(error => console.error("Error signing out:", error));
    }
  }
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
    currentUserEmail = user.email;
    
    // Check if the user is payable and set the cookie
    const userDocRef = doc(db, 'users', user.email);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      setPayableCookie(userData.payable, userData.createdAt.toDate());
    }
    
    checkUserAfterSignIn(user);
    return { user };
  } catch (err) {
    console.error("Error during sign in:", err);
    return { error: err.message || 'An error occurred during sign in.' };
  }
};

// Add a function to get the current user's email
export const getCurrentUserEmail = () => currentUserEmail;

// Add a new function to update the user's payable status
export const updateUserPayableStatus = async (referenceNumber) => {
  const email = getCurrentUserEmail();
  if (!email) {
    console.error("No user is currently signed in");
    return { error: 'No user is currently signed in.' };
  }

  try {
    const userDocRef = doc(db, 'users', email);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      await updateDoc(userDocRef, {
        payable: true,
        referenceNumber: referenceNumber
      });
      setPayableCookie(true, userData.createdAt.toDate());
      console.log("User's payable status updated successfully");
      return { success: true };
    } else {
      return { error: 'User document not found.' };
    }
  } catch (err) {
    console.error("Error updating user's payable status:", err);
    return { error: err.message || 'An error occurred while updating payment status.' };
  }
};

// Add this function after the existing functions
export const setPayableCookie = (isPayable, createdAt) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 30); // Cookie expires in 30 days
  const cookieValue = JSON.stringify({ isPayable, createdAt: createdAt.toISOString() });
  document.cookie = `userStatus=${encodeURIComponent(cookieValue)}; expires=${expirationDate.toUTCString()}; path=/`;
};

// Add this function to get the cookie data
export const getUserStatusFromCookie = () => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'userStatus') {
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch (error) {
        console.error('Error parsing user status cookie:', error);
        return null;
      }
    }
  }
  return null;
};

export { signOut } from 'firebase/auth';
