import React from "react";

import { usePrompts } from "@lib/prompts/use-prompts";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data: prompts } = usePrompts();

  console.log("prompts", prompts);

  return <div>Home</div>;
};

export default Home;
