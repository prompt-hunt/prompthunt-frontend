import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";

import { Input } from "@components/basic/input";
import { PromptsCatalog } from "@components/prompt/prompts-catalog";

import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      <div className="mx-auto flex max-w-[40rem] flex-col gap-5 py-14">
        <h1 className="max-w-[20rem] text-5xl font-bold leading-[3.4rem]">
          Explore the best prompts
        </h1>
        <p>
          Luctus felis sit lectus tristique diam ornare bibendum. Arcu auctor
          suspendisse luctus amet bibendum pellentesque lorem. Malesuada
          lobortis tristique tortor,
        </p>
        <Input
          placeholder="Search"
          block
          className="mt-6"
          leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
          size="lg"
        />
      </div>

      <div className="mt-20">
        <h4 className="mb-6 text-3xl font-bold">Top Prompts</h4>
        <PromptsCatalog className="flex-1" />
      </div>
    </div>
  );
};

export default Home;
