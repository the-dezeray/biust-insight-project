import React from 'react';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Header from "../components/Header/Header";
import Features from "../components/Features/Features";
import Pricing from "../components/Pricing/Pricing";
import Contributors from "../components/Contributors/Contributors";
import FloatingBackground from "../components/FloatingBackground/FloatingBackground";
import styles from "./index.module.css";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Biust Insight Project`}
      description="An Archive of academic materials for collaborative learning"
    >
      <FloatingBackground />
      <Header />
      <main className={styles.mainContent}>
        <Features />
        <Pricing />

        <Contributors />
      </main>
    </Layout>
  );
}
