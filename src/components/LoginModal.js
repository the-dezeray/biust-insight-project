import React, { useState, useEffect } from 'react';
import { signInWithGoogle, auth } from '../theme/firebase';
import styles from './LoginModal.module.css';
import { FaGoogle, FaMoneyBillWave, FaSchool, FaClock, FaFileAlt, FaFlask, FaClipboardList, FaBook } from 'react-icons/fa';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const LoginModal = ({ onClose, onLogin }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPricing, setShowPricing] = useState(false);
  const db = getFirestore();

  const handleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      checkUserPaymentStatus(user);
      onLogin(user);
    } else {
      setErrorMessage('Login failed. Please try again.');
    }
  };

  const checkUserPaymentStatus = async (user) => {
    const userDocRef = doc(db, 'users', user.email);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const creationTime = userData.createdAt.toDate();
      const currentTime = new Date();
      const daysSinceCreation = Math.floor((currentTime - creationTime) / (1000 * 60 * 60 * 24));
      
      if (daysSinceCreation >= 2 && !userData.payable) {
        setShowPricing(true);
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h1 className={styles.loginHeading}>Biust Insight Project</h1>
        <p className={styles.loginSubheading}>An Archive Of Material</p>
        {errorMessage && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            {errorMessage}
          </div>
        )}
        <div className={styles.loginFeatures}>
          <h2>Contains:</h2>
          <ul>
            <li><FaFileAlt /> Past exam papers</li>
            <li><FaFlask /> Laboratory reports</li>
            <li><FaClipboardList /> Assignment samples</li>
            <li><FaBook /> Study resources</li>
          </ul>
        </div>
        <div className={styles.loginTrial}>
          <h3>Free Trial 🎉</h3>
          <p>You will be allocated 2 days to use the app freely 🆓</p>
        </div>
        {showPricing && (
          <div className={styles.loginPricing}>
            <h3>Pricing <FaMoneyBillWave /></h3>
            <p>After your trial:</p>
            <div className={styles.pricingOptions}>
              <div className={styles.pricingOption}>
                <span className={styles.price}>80 Pula</span>
                <span className={styles.period}>per month</span>
              </div>
              <div className={`${styles.pricingOption} ${styles.bestValue}`}>
                <span className={styles.bestValueLabel}>Best Value</span>
                <span className={styles.price}>150 Pula</span>
                <span className={styles.period}>per semester <FaSchool /></span>
                <span className={styles.savings}>Save 60%</span>
              </div>
            </div>
            <small className={styles.pricingNote}>
              <FaClock /> Your contribution will be used to maintain the site
            </small>
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
          <a href="/terms" className={styles.loginLink}>Terms of Service</a> and{' '}
          <a href="/privacy" className={styles.loginLink}>Privacy Policy</a>.
        </p>
        <button className={styles.closeBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;

