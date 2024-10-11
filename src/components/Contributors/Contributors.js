import React from 'react';
import { FaUserCircle, FaUserTie, FaUserGraduate, FaUserCog } from 'react-icons/fa';
import styles from './Contributors.module.css';

const mainContributors = [

      
  { name: 'Desiree Chingwaru', role: 'UI Designer', icon: FaUserCircle },

  
  { name: 'Simion Uden', role: 'UI Designer', icon: FaUserCircle },
  { name: 'John Doe', role: 'Database Admin', icon: FaUserCog },
  
  { name: 'Lethabo', role: 'UI Designer', icon: FaUserCircle },
  { name: 'Lorato Gaie', role: 'Database Admin', icon: FaUserCog },
  
  { name: 'Nebiat', role: 'UI Designer', icon: FaUserCircle },
  { name: 'John Doe', role: 'Database Admin', icon: FaUserCog },
  
  { name: 'Clarify', role: 'UI Designer', icon: FaUserCircle },
  { name: 'Ishe', role: 'Database Admin', icon: FaUserCog },
  { name: 'EJ', role: 'Developer', icon: FaUserGraduate },
];

const resourceProviders = [
  'Mike Johnson', 'Sarah Brown', 'Alex Lee', 'Emma Wilson', 'Chris Taylor', 'Olivia Moore'
];

const Contributors = () => {
  return (
    <section className={styles.contributorsSection}>
      <h2 className={styles.title}>Contributors</h2>
      <div className={styles.contributorsList}>
        {mainContributors.map((contributor, index) => (
          <div key={index} className={styles.contributorItem}>
            <div className={styles.iconWrapper}>
              {React.createElement(contributor.icon, { className: styles.icon })}
            </div>
            <div className={styles.contributorInfo}>
              <h3>{contributor.name}</h3>
              <p>{contributor.role}</p>
            </div>
          </div>
        ))}
      </div>
      
      <h3 className={styles.subtitle}>Special Thanks to Many of you</h3>
      <div className={styles.resourceProvidersList}>
        {resourceProviders.map((name, index) => (
          <div key={index} className={styles.resourceProviderItem}>
            {name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contributors;
