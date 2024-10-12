import React, { useState, useEffect } from 'react';
import { signInWithGoogle, auth } from './firebase';
import styles from '../css/login.module.css';
import Loading from './Loading';
// Import icons from react-icons
import { FaGoogle, FaMoneyBillWave, FaSchool, FaClock, FaFileAlt, FaFlask, FaClipboardList, FaBook } from 'react-icons/fa';
import { useHistory } from '@docusaurus/router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import PricingAndPayment from './PricingAndPayment';

export default function Root({ children }) {
  const [userAuth, setUserAuth] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); // State for error message
  const [showPricing, setShowPricing] = useState(false);
  const history = useHistory();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && isValidUser(user.email)) {
        setUserAuth(user);
        checkUserPaymentStatus(user);
        history.push('/biust-insight-project/');
      } else {
        setUserAuth(null);
      }
      setAuthLoading(false);
    });

    const animationTimer = setTimeout(() => setAnimate(true), 100);

    // Create raindrops only if not authenticated
    if (!userAuth) {
      createRaindrops();
    }

    return () => {
      unsubscribe();
      clearTimeout(animationTimer);
      removeRaindrops();
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

  const isAuthenticated = Boolean(userAuth?.email);
  const containerClass = isAuthenticated ? '' : `${styles.login} ${animate ? styles.animate : ''}`;

  if (authLoading) {
    return (
      <>
        <Loading />
        <div style={{ display: 'none' }}>{children}</div>
      </>
    );
  }

  return (
    <React.Fragment>
      {isAuthenticated ? (
        <div className={styles.authenticatedView} style={{ width: '100%', height: '100%' }}>
          {children}
        </div>
      ) : (
        <div className={containerClass}>
          <div className={styles.loginContainer}>
            <h1 className={styles.loginHeading}>Biust Insight Project</h1>
            <p className={styles.loginSubheading}>An Archive Of Material</p>
            {errorMessage && (
              <div className={styles.errorMessageWrapper}>
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠️</span>
                  {errorMessage}
                </div>
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
            <button 
              className={`${styles.loginBtn} ${styles.loginGoogle}`} 
              onClick={() => signInWithGoogle(setErrorMessage)} // Pass the setErrorMessage
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
      )}
    </React.Fragment>
  );
}

const isValidUser = (email) => {
  return email.endsWith('@studentmail.biust.ac.bw');
};

const createRaindrops = () => {
  const rain = document.createElement('div');
  rain.className = styles.rain;
  for (let i = 0; i < 100; i++) {
    const raindrop = document.createElement('div');
    raindrop.className = styles.raindrop;
    raindrop.style.left = `${Math.random() * 100}%`;
    raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`;
    raindrop.style.animationDelay = `${Math.random() * 2}s`;
    rain.appendChild(raindrop);
  }
  document.body.appendChild(rain);
};

const removeRaindrops = () => {
  const rain = document.querySelector(`.${styles.rain}`);
  if (rain) {
    rain.remove();
  }
};
