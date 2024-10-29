import React from 'react';
import clsx from "clsx";
import Link from "@docusaurus/Link";
import styles from "./Pricing.module.css";

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
          to="/docs/about"
          className={clsx(styles.pricingBtn, isPopular && styles.popularBtn)}
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <h2>Our Pricing Plans</h2>
          <p>Choose the plan that best fits your needs and budget.</p>
        </div>

        <div className={styles.pricingGrid}>
          <PricingItem
            title="Monthly"
            price="40 pula"
            features={[
              "for a single month ",
                "1 Users",
              "All module components",
        
              ]}
            buttonText="Get Started"
          />
          <PricingItem
            title="Semester"

            price="50 pula"

            features={[
              "the whole semester",
              "All UI components",
              "Lifetime access",
              "Free updates",
              "3 Months support",
            ]}
            buttonText="Get Pro"
            isPopular={true}
          />
          <PricingItem

            title="Enterprise"
            price="90 "

            features={[
              "unlimited users",
              "all modules",
              "90 each",
              "Free updates",
              "3 months support",
            ]}
            buttonText="Contact Us"
          />
        </div>
      </div>
    </section>
  );
}
