import React from "react";

import { PromptsCatalog } from "@components/prompt/prompts-catalog";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <h4 className="mb-6 text-3xl font-bold">Top Prompts</h4>
      <PromptsCatalog className="flex-1" />
    </div>
  );
};

export default Home;
