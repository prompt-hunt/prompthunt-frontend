import React from "react";

import { usePrompt } from "@lib/prompts/use-prompt";
import { usePrompts } from "@lib/prompts/use-prompts";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data: prompts } = usePrompts();
  const { data: prompt } = usePrompt({
    promptId: 1,
  });

  console.log("prompts", prompts);
  console.log("prompt", prompt);

  return <div>Home</div>;
};

export default Home;
