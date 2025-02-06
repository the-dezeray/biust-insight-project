import React from 'react';
import { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './FloatingBackground.module.css';

const FloatingBackgroundContent = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(Array.from({ length: 10 }, (_, index) => ({
      id: index,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 20 + 10}s`,
        animationDelay: `${Math.random() * 5}s`,
      },
    })));
  }, []);

  return (
    <div className={styles.floatingBackground}>
      {items.map((item) => (
        <div key={item.id} className={styles.floatingItem} style={item.style}></div>
      ))}
    </div>
  );
};

const FloatingBackground = () => (
  <BrowserOnly>{() => <FloatingBackgroundContent />}</BrowserOnly>
);

export default FloatingBackground;
