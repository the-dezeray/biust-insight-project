import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "User Friendly Interface",
    Svg: require("@site/static/img/design-sprint.svg").default,
    description: (
      <>
    Built to allow users to easily navigate a vast array of documents, and material irrespective of their computer literacy.
      </>
    ),
  },
  {
    title: "Maintained by fellows",
    Svg: require("@site/static/img/pair-programming.svg").default,
    description: (
      <>
        Your contributions aid and assits your fellow collegues and others who are to come in a distant future.
      </>
    ),
  },
  {
    title: "Multilingual Support",
    Svg: require("@site/static/img/multilingual.svg").default,
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