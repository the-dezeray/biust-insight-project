import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import Heading from "@theme/Heading";
import styles from "./index.module.css";
import "../css/custom.css";
import heroImage from "../../static/img/header-img.png";

function HomepageHeader() {
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className="hero__pretext">
        
        </div>
        <Heading as="h1" className="hero__title">
         Biust Insight Project
        </Heading>
        <p className="hero__subtitle">
          The project is based on developing an a vast sustainable archive of documents and data. A comprehensive collection  of matter ranging from student notes ,tests , lab reports and exams.  
        </p>

        <Heading as="h2" className=" hero__subtitle"> Motives Behind The Project</Heading>
        <p className="hero__subtitle">
<ul>
  <li>A proof  that the  current libary system is  overcomplicated  </li>
  <li>To flex on my fellow collegues 🙃🙃</li>
  <li>To learn and dicover techonologies and challanges related to web development </li>
</ul>

        </p>
   <Heading as="h3" className=" hero__subtitle"> About Me</Heading>
        <p className="hero__subtitle">
<ul>
  <li>The Name Is Desiree </li>
  <li>Computer Science Undergraduate </li>
  <li>I Eat Code And Breathe Software</li>

</ul>

        </p>

        <div className={styles.buttons}>
      
  <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
            style={{ alignSelf: "right" }}
          >
            Explore
          </Link>
        </div>
      </div>
      <div className="banner__img">
        <img src={heroImage} alt="at something" />
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Organize your documentation"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}