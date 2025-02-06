import React, { useEffect, useRef } from 'react';
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";
import styles from "./Header.module.css";

export default function Header() {
  const heroBoxRef = useRef(null);

  useEffect(() => {
    const createMeteor = () => {
      const meteor = document.createElement('div');
      meteor.classList.add(styles.meteor);
      meteor.style.left = `${Math.random() * 100}%`;
      meteor.style.top = `${Math.random() * 100}%`;
      meteor.style.animationDuration = `${Math.random() * 2 + 3}s`;
      heroBoxRef.current.appendChild(meteor);

      setTimeout(() => {
        meteor.remove();
      }, 5000);
    };

    const interval = setInterval(createMeteor, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className={styles.heroBanner}>
      <div className={styles.container}>
        <div className={styles.heroBox} ref={heroBoxRef}>
          <div className={styles.heroContent}>
            <Heading as="h1" className={styles.heroTitle}>
              Biust Insight Project
            </Heading>
            <p className={styles.heroDesc}>
              The project is based on developing a vast sustainable archive of documents and data. A comprehensive collection of matter ranging from student notes, tests, lab reports, and exams.
            </p>
            <div className={styles.heroButtons}>
              <Link
                className={clsx(styles.mainBtn, styles.exploreBtn)}
                to="/docs/category/modules"
              >
                Explore Now
              </Link>
              <Link
                className={clsx(styles.mainBtn, styles.learnMoreBtn)}
                to="/docs/category/modules"
              >
                Learn More <i className="lni lni-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
