import React from 'react';
import { useHistory } from '@docusaurus/router';
import { auth, signInWithGoogle } from '../theme/firebase';
import styles from './AuthenticatedLink.module.css';

const AuthenticatedLink = ({ href, Icon, title, year }) => {
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      window.location.href = href;
    } else {
      const user = await signInWithGoogle();
      if (user) {
        window.location.href = href;
      } else {
        alert('Login failed. Please try again.');
      }
    }
  };

  return (
    <button onClick={handleClick} className={styles.featureButton}>
      <div className={styles.featureItem} data-subject={title.split(' ')[0]}>
        <Icon className={styles.featureIcon} />
        <div className={styles.featureContent}>
          <h3 className={styles.featureTitle}>{title}</h3>
          <span className={styles.featureYear}>{year}</span>
        </div>
      </div>
    </button>
  );
};


export default AuthenticatedLink;
