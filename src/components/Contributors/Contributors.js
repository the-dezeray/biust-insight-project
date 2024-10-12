import React from 'react';
import { FaUserCircle, FaUserTie, FaUserGraduate, FaUserCog } from 'react-icons/fa';
import styles from './Contributors.module.css';

const mainContributors = [

      
  { name: 'Desiree Chingwaru', role: 'Lead Developer', icon: FaUserCircle },

  
  { name: 'Simion Uden', role: 'Developer', icon: FaUserCircle },

  
  { name: 'Lethabo', role: 'UI Designer', icon: FaUserCircle },
  { name: 'Lorato Gaie', role: 'Database Admin', icon: FaUserCog },
  
  { name: 'Nebiat', role: 'Marketing and Socials', icon: FaUserCircle },
  { name: 'Motheo', role: 'Tester', icon: FaUserCog },
  
  { name: 'Clarify', role: 'Tester', icon: FaUserCircle },
  { name: 'Ishe', role: 'Tester', icon: FaUserCog },
  { name: 'EJ', role: 'Marketing', icon: FaUserGraduate },
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
