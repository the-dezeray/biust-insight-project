import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import { useAnimate, useInView } from 'framer-motion';
import { auth } from '../theme/firebase';
import styles from './AuthenticatedLink.module.css';

const AuthenticatedLink = ({ href, Icon, title, year }) => {
  const history = useHistory();
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5 });
    }
  }, [isInView, animate]);

  const handleClick = (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      window.location.href = href;
    } else {
      alert('Please log in to access this content.');
      history.push('/');
    }
  };

  return (
    <button onClick={handleClick} className={styles.featureButton}>
      <div ref={scope} className={styles.featureItem} style={{ opacity: 0, y: 50 }} data-subject={title.split(' ')[0]}>
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
