import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner, "homepage-header")}>
      <div className={styles.container}>
        <div className={clsx("wow fadeInUp", styles.heroContent)} data-wow-delay=".2s">
          <h1 className={styles.heroTitle}>Biust Insight Project</h1>
          <p className={styles.heroSubtitle}>
            A sustainable and comprehensive archive providing access to past exams, lab reports, and study materials for students.
          </p>
          <ul className={styles.heroButtons}>
            <li>
              <Link className={clsx("button button--secondary button--lg", styles.mainBtn)} to="/docs/category/modules">
                Explore Archive
              </Link>
            </li>
            <li>
              <Link className={clsx("button button--lg", styles.linkBtn)} to="/docs/category/about">
                Learn More <i className="lni lni-arrow-right"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

function Features() {
  const features = [
    {
      title: 'Comprehensive Archive',
      description: 'Access a vast collection of academic materials from various disciplines.',
      icon: 'fas fa-book',
    },
    {
      title: 'Collaborative Learning',
      description: 'Connect with peers and share knowledge through our interactive platform.',
      icon: 'fas fa-users',
    },
    {
      title: 'Advanced Search',
      description: 'Find exactly what you need with our powerful search and filtering tools.',
      icon: 'fas fa-search',
    },
    {
      title: 'Mobile Friendly',
      description: 'Access your resources on-the-go with our responsive design.',
      icon: 'fas fa-mobile-alt',
    },
  ];

  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <span>Features</span>
          <h2>Main Features of Biust Insight</h2>
          <p>Discover the tools and resources that make our platform unique.</p>
        </div>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <div>
                <div className={styles.featureIcon}>
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const pricingPlans = [
    {
      title: 'Basic',
      price: '$0',
      period: '/month',
      features: [
        'Access to public documents',
        'Basic search functionality',
        'Community support',
      ],
      buttonText: 'Get Started',
      buttonLink: '/signup',
      featured: false,
    },
    {
      title: 'Pro',
      price: '$9.99',
      period: '/month',
      features: [
        'Full archive access',
        'Advanced search and filters',
        'Collaboration tools',
        'Priority support',
      ],
      buttonText: 'Get Started',
      buttonLink: '/signup',
      featured: true,
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'All Pro features',
        'Custom integrations',
        'Dedicated support',
        'Analytics and reporting',
      ],
      buttonText: 'Contact Us',
      buttonLink: '/contact',
      featured: false,
    },
  ];

  return (
    <section id="pricing" className={styles.pricing}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <span>Pricing</span>
          <h2>Choose Your Plan</h2>
          <p>Select the perfect plan to enhance your academic journey.</p>
        </div>
        <div className={styles.pricingGrid}>
          {pricingPlans.map((plan, index) => (
            <div key={index} className={clsx(styles.pricingItem, plan.featured && styles.featured)}>
              {plan.featured && <div className={styles.featuredBadge}>Most Popular</div>}
              <div>
                <h3>{plan.title}</h3>
                <div className={styles.price}>{plan.price}<span>{plan.period}</span></div>
                <ul>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
              <Link to={plan.buttonLink} className={styles.pricingBtn}>{plan.buttonText}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqItems = [
    {
      question: 'How do I contribute to the archive?',
      answer: 'You can upload your own notes, reports, and study materials through your account dashboard.',
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, we use industry-standard encryption and security measures to protect your data.',
    },
    {
      question: 'Can I cancel my subscription at any time?',
      answer: 'Absolutely! You can cancel your subscription at any time from your account settings.',
    },
    {
      question: 'How often is new content added?',
      answer: 'New content is added daily by our community of students and educators.',
    },
  ];

  return (
    <section id="faq" className={styles.faq}>
      <div className={styles.container}>
        <div className={styles.sectionTitle}>
          <span>FAQ</span>
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about Biust Insight.</p>
        </div>
        <div className={styles.faqGrid}>
          {faqItems.map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
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
        <Features />
        <Pricing />
        <FAQ />
      </main>
    </Layout>
  );
}