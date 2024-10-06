import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";
import React, { useEffect } from 'react';
import { useAnimate, useInView } from 'framer-motion';
import { FaGift, FaBook, FaUsers, FaRocket } from 'react-icons/fa';

function HomepageHeader() {
  return (
    <header className={styles.heroBanner}>
      <div className={styles.container}>
        <div className={styles.heroBox}>
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
                to="/docs/intro"
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

function PricingSection() {
  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Our Pricing Plans</h2>
          <p>Choose the plan that best fits your needs and budget.</p>
        </div>

        <div className={styles.pricingGrid}>
          <PricingItem
            title="Basic"
            price="$19.99/mo"
            features={[
              "5 Users",
              "All UI components",
              "Lifetime access",
              "Free updates",
              "Use on 1 project",
              "4 Months support",
            ]}
            buttonText="Get Started"
          />
          <PricingItem
            title="Pro"
            price="$30.99/mo"
            features={[
              "10 Users",
              "All UI components",
              "Lifetime access",
              "Free updates",
              "Use on 3 projects",
              "6 Months support",
            ]}
            buttonText="Get Pro"
            isPopular={true}
          />
          <PricingItem
            title="Enterprise"
            price="$70.99/mo"
            features={[
              "Unlimited Users",
              "All UI components",
              "Lifetime access",
              "Free updates",
              "Unlimited projects",
              "12 Months support",
            ]}
            buttonText="Contact Us"
          />
        </div>
      </div>
    </section>
  );
}

function PricingItem({ title, price, features, buttonText, isPopular }) {
  return (
    <div className={clsx(styles.pricingItem, isPopular && styles.popularItem)}>
      {isPopular && <span className={styles.popularTag}>POPULAR</span>}
      <div className={styles.pricingHeader}>
        <h3>{title}</h3>
        <h4>{price}</h4>
      </div>
      <div className={styles.pricingBody}>
        <ul>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className={styles.pricingFooter}>
        <Link
          to="/contact"
          className={clsx(styles.pricingBtn, isPopular && styles.popularBtn)}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

function FeatureItem({ Icon, title, description, delay }) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1, y: 0 }, { duration: 0.5, delay });
    }
  }, [isInView, animate, delay]);

  return (
    <div ref={scope} className={styles.featureItem} style={{ opacity: 0, y: 50 }}>
      <div className={styles.featureIcon}>
        <Icon size={48} />
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{description}</p>
      <div>
        <Link to="/docs/intro" className={styles.featureLink}>
          Learn More
        </Link>
      </div>
    </div>
  );
}

function FeatureSection() {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });

  useEffect(() => {
    if (isInView) {
      animate(scope.current, { opacity: 1 }, { duration: 0.5 });
    }
  }, [isInView, animate]);

  return (
    <section className={styles.featureSection}>
      <div className={styles.container}>
        <div ref={scope} className={styles.featureGrid} style={{ opacity: 0 }}>
          <FeatureItem
            Icon={FaGift}
            title="Free and Open-Source"
            description="Access a wealth of academic resources without any cost, promoting collaborative learning."
            delay={0.1}
          />
          <FeatureItem
            Icon={FaBook}
            title="Comprehensive Archive"
            description="Find a vast collection of notes, tests, lab reports, and exams from various courses."
            delay={0.2}
          />
          <FeatureItem
            Icon={FaUsers}
            title="Community-Driven"
            description="Benefit from contributions made by students and faculty, fostering a collaborative environment."
            delay={0.3}
          />
          <FeatureItem
            Icon={FaRocket}
            title="Continuous Growth"
            description="Experience an ever-expanding repository of academic materials and resources."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}

function FloatingBackground() {
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

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Biust Insight Project`}
      description="An Archive of academic materials for collaborative learning"
    >
      <FloatingBackground />
      <HomepageHeader />
      <main className={styles.mainContent}>
        <FeatureSection />
        <PricingSection />
      </main>
    </Layout>
  );
}