import React, { useEffect } from 'react';
import { useAnimate } from 'framer-motion';
import styles from "./FloatingBackground.module.css";

export default function FloatingBackground() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animateBackground = async () => {
      for (let i = 0; i < 20; i++) {
        animate(`#float-${i}`, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotate: Math.random() * 360,
        }, { duration: 20 + Math.random() * 10, repeat: Infinity, repeatType: "reverse" });
      }
    };
    animateBackground();
  }, [animate]);

  return (
    <div ref={scope} className={styles.floatingBackground}>
      {[...Array(20)].map((_, index) => (
        <div
          key={index}
          id={`float-${index}`}
          className={styles.floatingElement}
          style={{
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
          }}
        />
      ))}
    </div>
  );
}
