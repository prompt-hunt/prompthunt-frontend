import React from "react";

import { BlockchainSection } from "@components/landing/blockchain-section";
import { DonationsSection } from "@components/landing/donations-section";
import { FeaturesSection } from "@components/landing/features-section";
import { Hero } from "@components/landing/hero";
import { IntroducationSecion } from "@components/landing/introduction-section";
import { TechnologiesSecion } from "@components/landing/technologies-section";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <IntroducationSecion />
      <FeaturesSection />
      <DonationsSection />
      <BlockchainSection />
      <TechnologiesSecion />
    </>
  );
};

export default Home;
