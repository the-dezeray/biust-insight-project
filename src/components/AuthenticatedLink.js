import React from 'react';
import styles from './AuthenticatedLink.module.css';

const AuthenticatedLink = ({ href, Icon, title, year }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = href;
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
