import React, { useEffect } from 'react';
import { auth, signOut, getUserStatusFromCookie } from './firebase';

const shouldLogoutUser = () => {
  const userStatus = getUserStatusFromCookie();
  if (!userStatus) {
    console.log("User status cookie not found, logging out");
    return true;
  }

  const { isPayable, createdAt } = userStatus;
  const creationDate = new Date(createdAt);
  const currentDate = new Date();
  const daysSinceCreation = Math.floor((currentDate - creationDate) / (1000 * 60 * 60 * 24));

  return !isPayable && daysSinceCreation >= 2;
};

export default function Root({ children }) {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (shouldLogoutUser()) {
          console.log("User should be logged out, signing out");
          signOut(auth).catch(error => console.error("Error signing out:", error));
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
}
