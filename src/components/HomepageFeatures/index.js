import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
<<<<<<< HEAD
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
=======
    title: "User Friendly Interface",
    Svg: require("@site/static/img/design-sprint.svg").default,
>>>>>>> fa8d8fc (feat : welcome page redesign)
    description: (
      <>
    Built to allow users to easily navigate a vast array of documents, and material irrespective of their computer literacy.
      </>
    ),
  },
  {
<<<<<<< HEAD
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
=======
    title: "Maintained by fellows",
    Svg: require("@site/static/img/pair-programming.svg").default,
>>>>>>> fa8d8fc (feat : welcome page redesign)
    description: (
      <>
        Your contributions aid and assits your fellow collegues and others who are to come in a distant future.
      </>
    ),
  },
  {
<<<<<<< HEAD
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
=======
    title: "Multilingual Support",
    Svg: require("@site/static/img/multilingual.svg").default,
>>>>>>> fa8d8fc (feat : welcome page redesign)
    description: (
      <>
        The archive is constantly growing in size and as contribtuions are  made a blank section today a maze another day.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}