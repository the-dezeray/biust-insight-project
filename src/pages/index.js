import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";
import styles from "./index.module.css";
import heroImage from "../../static/img/header-img.png";

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className={styles.heroContent}>
        <Heading as="h1" className={styles.heroTitle}>
          Biust Insight Project
        </Heading>
        <p className={styles.heroSubtitle}>
          The project is based on developing a vast sustainable archive of documents and data. A comprehensive collection of matter ranging from student notes, tests, lab reports, and exams.
        </p>
        <Heading as="h2" className={styles.heroSubtitle}>Motives Behind The Project</Heading>
        <ul className={styles.heroList}>
          <li>A proof that the current library system is overcomplicated</li>
          <li>To flex on my fellow colleagues 🙃🙃</li>
          <li>To learn and discover technologies and challenges related to web development</li>
        </ul>
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatarPhoto}
            src="https://avatars.githubusercontent.com/u/146452474?s=400&u=a414e97d0508d3dde7173bf221f3e2c414b2e575&v=4"
            alt="Avatar"
          />
          <div className={styles.avatarIntro}>

            
            <div className={styles.heroSubtitle}><b>Maintained by </b><div></div>Desiree C</div>
            <small className={styles.avatarSubtitle}>Always Thinking About Code | Comp Sci Major |  Year 2</small>
          </div>
        </div>
        <div className={styles.buttons}>
          <Link
            className={clsx("button button--secondary button--lg", styles.exploreButton)}
            to="/docs/drives/Computer modules/comp-211"
          >
            Explore 
          </Link>
        </div>
      </div>
  
    </header>
  );
}

function AdditionalContent() {
  return (
    <section className={styles.additionalContent}>
      <div className={clsx(styles.contentBox, styles.fadeIn)}>
        <h2 className={styles.contentTitle}>Document Archive</h2>
        <p>Access a wide collection of past tests, exams, and lecture notes to support your studies.</p>
        <img src="/img/archive.png" alt="Archive" />
      </div>

      <div className={clsx(styles.contentBox, styles.fadeIn)}>
        <h2 className={styles.contentTitle}>School Events</h2>
        <p>Stay updated with the latest events happening on campus, from academic forums to social gatherings.</p>
        <img src="/img/events.png" alt="Events" />
      </div>

      <div className={clsx(styles.contentBox, styles.fadeIn)}>
        <h2 className={styles.contentTitle}>Lecture of the Month</h2>
        <p>Highlighting a lecture that made an impact—revisit key concepts and discussions.</p>
        <img src="/img/lecture.png" alt="Lecture" />
      </div>

      <div className={clsx(styles.contentBox, styles.fadeIn)}>
        <h2 className={styles.contentTitle}>Ongoing Projects</h2>
        <p>Discover student and faculty projects that are shaping the future of technology and research.</p>
        <img src="/img/projects.png" alt="Projects" />
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Biust Insight Project`}
      description="An Archive of material"
    >
      <HomepageHeader />
      <main className={styles.mainContent}>
        <AdditionalContent/>
        <HomepageFeatures />

      </main>
    </Layout>
  );
}
