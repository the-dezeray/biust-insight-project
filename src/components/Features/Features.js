import React, { useEffect } from 'react';
import { useAnimate, useInView } from 'framer-motion';
import { FaAtom, FaDna, FaSquareRootAlt, FaFlask, FaChartBar, FaCog, FaLaptopCode } from 'react-icons/fa';
import styles from "./Features.module.css";

function FeatureItem({ Icon, title, percentage, link, delay }) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5, delay });
    }
  }, [isInView, animate, delay]);

  const circumference = 2 * Math.PI * 13; // 30 is the radius of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <a href={link} className={styles.featureLink}>
      <div ref={scope} className={styles.featureItem} style={{ opacity: 0, y: 50 }} data-subject={title.split(' ')[0]}>
        <Icon className={styles.featureIcon} />
        <h3 className={styles.featureTitle}>{title}</h3>
        <div className={styles.percentageContainer}>
          <svg className={styles.percentageRing} width="20" height="20">
            <circle
              className={styles.percentageCircle}
              stroke="#e0e0e0"
              strokeWidth="3"
              fill="transparent"
              r="8"
              cx="10"
              cy="10"
            />
            <circle
              className={styles.percentageProgress}
              stroke="#4a90e2"
              strokeWidth="3"
              fill="transparent"
              r="8"
              cx="10"
              cy="10"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>
        </div>
      </div>
    </a>
  );
}

export default function Features() {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1 }, { duration: 0.5 });
    }
  }, [isInView, animate]);

  const subjects = [
    { title: "PHYS 101", Icon: FaAtom, percentage: 75, link: "/docs/phys-101" },
    { title: "PHYS 102", Icon: FaAtom, percentage: 60, link: "/docs/phys-102" },
    { title: "BIO 101", Icon: FaDna, percentage: 80, link: "/docs/bio-101" },
    { title: "BIO 102", Icon: FaDna, percentage: 65, link: "/docs/bio-102" },
    { title: "MATH 101", Icon: FaSquareRootAlt, percentage: 70, link: "/docs/math-101" },
    { title: "MATH 102", Icon: FaSquareRootAlt, percentage: 60, link: "/docs/math-102" },
    { title: "CHEM 101", Icon: FaFlask, percentage: 80, link: "/docs/chem-101" },
    { title: "CHEM 102", Icon: FaFlask, percentage: 75, link: "/docs/chem-102" },
    { title: "STATS 101", Icon: FaChartBar, percentage: 70, link: "/docs/stats-101" },
    { title: "CETG 101", Icon: FaCog, percentage: 80, link: "/docs/cetg-101" },
    { title: "CETG 102", Icon: FaCog, percentage: 75, link: "/docs/cetg-102" },
    { title: "COMP 231", Icon: FaLaptopCode, percentage: 70, link: "/docs/comp-231" }
  ];

  return (
    <section className={styles.featureSection}>
      <div className={styles.container}>
        <div ref={scope} className={styles.featureGrid} style={{ opacity: 0 }}>
          {subjects.map((subject, index) => (
            <FeatureItem
              key={subject.title}
              Icon={subject.Icon}
              title={subject.title}
              percentage={subject.percentage}
              link={subject.link}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
