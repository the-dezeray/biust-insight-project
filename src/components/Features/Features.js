import React, { useEffect } from 'react';
import { useAnimate, useInView } from 'framer-motion';
import { FaAtom, FaDna, FaSquareRootAlt, FaFlask, FaChartBar, FaCog, FaLaptopCode, FaBook, FaMountain, FaDatabase } from 'react-icons/fa';
import styles from "./Features.module.css";

function FeatureItem({ Icon, title, percentage, link, delay }) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5, delay });
    }
  }, [isInView, animate, delay]);

  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <a href={link} className={styles.featureLink}>
      <div ref={scope} className={styles.featureItem} style={{ opacity: 0, y: 50 }} data-subject={title.split(' ')[0]}>
        <Icon className={styles.featureIcon} />
        <h3 className={styles.featureTitle}>{title}</h3>
        <div className={styles.percentageContainer}>
          <svg className={styles.percentageRing} width="24" height="24" viewBox="0 0 24 24">
            <circle
              className={styles.percentageCircle}
              stroke="#e0e0e0"
              strokeWidth="2"
              fill="transparent"
              r={radius}
              cx="12"
              cy="12"
            />
            <circle
              className={styles.percentageProgress}
              stroke="#4a90e2"
              strokeWidth="2"
              fill="transparent"
              r={radius}
              cx="12"
              cy="12"
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
    { title: "PHYS 101", Icon: FaAtom, percentage: 75, link: "/biust-insight-project/docs/category/physics-modules" },
    { title: "PHYS 102", Icon: FaAtom, percentage: 60, link: "/biust-insight-project/docs/category/physics-modules" },
    { title: "BIO 101", Icon: FaDna, percentage: 80, link: "/biust-insight-project/docs/category/biology-modules" },
    { title: "BIO 102", Icon: FaDna, percentage: 65, link: "/biust-insight-project/docs/category/biology-modules" },
    { title: "MATH 101", Icon: FaSquareRootAlt, percentage: 70, link: "/biust-insight-project/docs/category/math-modules" },
    { title: "MATH 102", Icon: FaSquareRootAlt, percentage: 60, link: "/biust-insight-project/docs/category/math-modules" },
    { title: "CHEM 101", Icon: FaFlask, percentage: 80, link: "/biust-insight-project/docs/category/chemistry-modules" },
    { title: "CHEM 102", Icon: FaFlask, percentage: 75, link: "/biust-insight-project/docs/category/chemistry-modules" },
    { title: "STATS 101", Icon: FaChartBar, percentage: 70, link: "/biust-insight-project/docs/category/statistics-modules" },
    { title: "CETG 101", Icon: FaCog, percentage: 80, link: "/biust-insight-project/docs/category/cetg-modules" },
    { title: "CETG 102", Icon: FaCog, percentage: 75, link: "/biust-insight-project/docs/category/cetg-modules" },
    { title: "COMP 201", Icon: FaLaptopCode, percentage: 70, link: "/biust-insight-project/docs/category/computer-modules" },
    { title: "COMP 211", Icon: FaLaptopCode, percentage: 70, link: "/biust-insight-project/docs/category/computer-modules" },
    { title: "COMP 221", Icon: FaLaptopCode, percentage: 70, link: "/biust-insight-project/docs/category/computer-modules" },
    { title: "COMP 231", Icon: FaLaptopCode, percentage: 70, link: "/biust-insight-project/docs/category/computer-modules" },
    { title: "COMP 232", Icon: FaLaptopCode, percentage: 70, link: "/biust-insight-project/docs/category/computer-modules" },
    { title: "COMP 222", Icon: FaLaptopCode, percentage: 70, link: "/biust-insight-project/docs/category/computer-modules" },
    { title: "ALSS 201", Icon: FaBook, percentage: 70, link: "/biust-insight-project/docs/category/alss-modules" },
    { title: "GEOL 201", Icon: FaMountain, percentage: 70, link: "/biust-insight-project/docs/category/geol-modules" }
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
