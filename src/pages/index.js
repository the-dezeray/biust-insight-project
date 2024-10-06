import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

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

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Biust Insight Project`}
      description="An Archive of academic materials for collaborative learning"
    >
      <HomepageHeader />
      <main className={styles.mainContent}>
        <PricingSection />
      </main>
    </Layout>
  );
}