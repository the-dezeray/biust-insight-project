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
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Biust Insight Project`}
      description="An Archive of academic materials for collaborative learning"
    >
      <HomepageHeader />
      <main className={styles.mainContent}>
   

      </main>
    </Layout>
  );
}