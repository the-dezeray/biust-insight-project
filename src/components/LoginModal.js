import React, { useState, useEffect } from 'react';
import { signInWithGoogle, auth } from '../theme/firebase';
import styles from './LoginModal.module.css';
import Loading from './Loading'; // Make sure this path is correct
import { FaGoogle, FaMoneyBillWave, FaSchool, FaClock, FaFileAlt, FaFlask, FaClipboardList, FaBook, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { useHistory } from '@docusaurus/router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const LoginModal = ({ onClose, onLogin }) => {
  const [userAuth, setUserAuth] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPricing, setShowPricing] = useState(false);
  const [warningMessage, setWarningMessage] = useState(null);
  const history = useHistory();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && isValidUser(user.email)) {
        setUserAuth(user);
        checkUserPaymentStatus(user);
        onLogin(user);
      } else {
        setUserAuth(null);
      }
      setAuthLoading(false);
    });

    const animationTimer = setTimeout(() => setAnimate(true), 100);

    return () => {
      unsubscribe();
      clearTimeout(animationTimer);
    };
  }, [history, userAuth]);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setWarningMessage(null);
    
    const result = await signInWithGoogle();
    
    if (result.error) {
      setErrorMessage(result.error);
    } else if (result.warning) {
      setWarningMessage(result.warning);
      onLogin(result.user);
    } else if (result.user) {
      onLogin(result.user);
    }
  };

  const isValidUser = (email) => {
    return email.endsWith('@studentmail.biust.ac.bw');
  };

  if (authLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={`${styles.modalContent} ${animate ? styles.animate : ''}`} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>
        
        <h1 className={styles.loginHeading}>Biust Insight Project</h1>
        <p className={styles.loginSubheading}>An Archive Of Material</p>
        
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
        
        <div className={styles.loginPricing}>
          <h3>Pricing  <FaMoneyBillWave /></h3>
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
        
        {errorMessage && (
          <div className={styles.errorMessage}>
            <FaExclamationTriangle className={styles.errorIcon} />
            {errorMessage}
          </div>
        )}
        
        {warningMessage && (
          <div className={styles.warningMessage}>
            <FaExclamationTriangle className={styles.warningIcon} />
            {warningMessage}
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
        <small className={styles.loginSmallText}>
          Don't have an account? <a href="/signup" className={styles.loginLink}>Sign up</a>
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
