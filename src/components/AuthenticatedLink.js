import React, { useState } from 'react';
import { auth } from '../theme/firebase';
import styles from './AuthenticatedLink.module.css';
import LoginModal from './LoginModal';

const AuthenticatedLink = ({ href, Icon, title, year }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      window.location.href = href;
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogin = (user) => {
    setShowLoginModal(false);
    if (user) {
      window.location.href = href;
    }
  };

  return (
    <>
      <button onClick={handleClick} className={styles.featureButton}>
        <div className={styles.featureItem} data-subject={title.split(' ')[0]}>
          <Icon className={styles.featureIcon} />
          <div className={styles.featureContent}>
            <h3 className={styles.featureTitle}>{title}</h3>
            <span className={styles.featureYear}>{year}</span>
          </div>
        </div>
      </button>
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLogin}
        />
      )}
    </>
  );
};

export default AuthenticatedLink;
