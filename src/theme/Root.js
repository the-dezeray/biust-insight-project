import React, { useState, useEffect } from 'react';
import { signInWithGoogle, auth } from './firebase';
import styles from '../css/login.module.css';
import Loading from './Loading';

export default function Root({ children }) {
  const [userAuth, setUserAuth] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async function (user) {
      if (user !== null) {
        setUserAuth(user);
      }
      setAuthLoading(false);
    });

    const animationTimer = setTimeout(() => setAnimate(true), 100);

    // Only create raindrops if not authenticated
    const createRaindrops = () => {
      if (!userAuth) {
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
      }
    };

    createRaindrops();

    return () => {
      unsubscribe();
      clearTimeout(animationTimer);
      const rain = document.querySelector(`.${styles.rain}`);
      if (rain) {
        rain.remove();
      }
    };
  }, [userAuth]);

  const isAllow = () => userAuth?.email;

  if (authLoading) {
    return (
      <>
        <Loading />
        <div style={{ display: 'none' }}>{children}</div>
      </>
    );
  }

  // Remove login-specific classes when authenticated
  const containerClass = isAllow() ? '' : `${styles.login} ${animate ? styles.animate : ''}`;

  return (
    <React.Fragment>
      {isAllow() ? (
        <div className={styles.authenticatedView} style={{ width: '100%', height: '100%' }}>
          {children}
        </div>
      ) : (
        <div className={containerClass}>
          <div className={styles.loginContainer}>
            <h1 className={styles.loginHeading}>Biust Insight Project</h1>
            <p className={styles.loginSubheading}>
              An Archive Of Material
            </p>
            <div className={styles.loginFeatures}>
              <h2>Contains:  </h2>
              <ul>
                <li>📝 Past exam papers</li>
                <li>🧪 Laboratory reports</li>
                <li>📘 Assignment samples</li>
                <li>📚 Study resources</li>
              </ul>
            </div>
            <div className={styles.loginTrial}>
              <h3>Free Access 🎉</h3>
              <p>Still in development mode therefore free access 🆓</p>
            </div>
            <div className={styles.loginPricing}>
              <h3>Pricing (Coming Soon) 💰</h3>
              <p>After your trial:</p>
              <ul>
                <li>80 Pula per month 💵</li>
                <li>or 150 for the whole semester 🏫</li>
              </ul>
              <small>Note: Pricing not yet in effect ⏳</small>
            </div>
            <button className={`${styles.loginBtn} ${styles.loginGoogle}`} onClick={signInWithGoogle}>
              <i className="fab fa-google"></i> Login with Google
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
          {!isAllow() && (
            <div className={styles.backgroundAnimation}>
              {[...Array(10)].map((_, index) => (
                <div key={index} className={styles.floatingItem}></div>
              ))}
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
}