import React, { useState, useEffect } from 'react';
import { signInWithGoogle, auth } from '../theme/firebase';
import styles from './LoginModal.module.css';
import Loading from './Loading'; // Make sure this path is correct
import { FaGoogle, FaMoneyBillWave, FaSchool, FaClock, FaFileAlt, FaFlask, FaClipboardList, FaBook, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { useHistory } from '@docusaurus/router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import PricingAndPayment from '../theme/PricingAndPayment';

const LoginModal = ({ onClose, onLogin }) => {
  const [authLoading, setAuthLoading] = useState(true);
  const [checkingTrial, setCheckingTrial] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [trialEnded, setTrialEnded] = useState(false);
  const history = useHistory();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthLoading(false);
    });

    const animationTimer = setTimeout(() => setAnimate(true), 100);

    return () => {
      unsubscribe();
      clearTimeout(animationTimer);
    };
  }, []);

  const checkUserPaymentStatus = async (user) => {
    console.log("Checking user payment status...");
    setCheckingTrial(true);
    try {
      const userDocRef = doc(db, 'users', user.email);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data:", userData);
        const creationTime = userData.createdAt.toDate();
        const currentTime = new Date();
        const daysSinceCreation = Math.floor((currentTime - creationTime) / (1000 * 60 * 60 * 24));
        console.log("Days since creation:", daysSinceCreation);
        
        if (daysSinceCreation >= 2 && !userData.payable) {
          console.log("Trial ended, showing pricing");
          setTrialEnded(true);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error("Error checking user payment status:", error);
      setErrorMessage("An error occurred while checking your account status. Please try again.");
      return false;
    } finally {
      setCheckingTrial(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setTrialEnded(false);
    
    console.log("Attempting login...");
    const result = await signInWithGoogle();
    console.log("Login result:", result);
    
    if (result.error) {
      setErrorMessage(result.error);
    } else if (result.user) {
      const isTrialEnded = await checkUserPaymentStatus(result.user);
      if (isTrialEnded) {
        setTrialEnded(true);
      } else {
        onLogin(result.user);
      }
    }
  };

  if (authLoading) {
    return <Loading />;
  }

  if (trialEnded) {
    return (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={`${styles.modalContent} ${animate ? styles.animate : ''}`} onClick={(e) => e.stopPropagation()}>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>
          

          <PricingAndPayment />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={`${styles.modalContent} ${animate ? styles.animate : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>
        
        <h1 className={styles.loginHeading}>Login</h1>
        <p className={styles.loginSubheading}>Sign in with your BIUST student email</p>
        
        {errorMessage && (
          <div className={styles.errorMessage}>
            <FaExclamationTriangle className={styles.errorIcon} />
            {errorMessage}
          </div>
        )}
        
        <button 
          className={`${styles.loginBtn} ${styles.loginGoogle}`} 
          onClick={handleLogin}
        >
          <FaGoogle /> Login with Google
        </button>
        
        <p className={styles.loginInfo}>
          By logging in, you agree to our{' '}
          <a href="/biust-insight-project/docs/about/terms" className={styles.loginLink}>Terms of Service</a> and{' '}
          <a href="/biust-insight-project/docs/about/privacy" className={styles.loginLink}>Privacy Policy</a>.
        </p>
        <small className={styles.loginSmallText}>
        Curious about the project? <a href="/biust-insight-project/docs/about" className={styles.loginLink}>Learn more</a>
        </small>
      </div>
      <div className={styles.backgroundAnimation}>
        {[...Array(10)].map((_, index) => (
          <div key={index} className={styles.floatingItem}></div>
        ))}
      </div>
    </div>
  );
};

export default LoginModal;
