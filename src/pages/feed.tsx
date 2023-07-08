import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";

import { Input } from "@components/basic/input";
import { PromptsCatalog } from "@components/prompt/prompts-catalog";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const [queryValue, setQueryValue] = useState("");
  const [query, setQuery] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setQuery(queryValue);
    }, 500);
  }, [queryValue]);

  return (
    <div>
      <div className="mx-auto flex max-w-[40rem] flex-col gap-5 py-14">
        <h1 className="max-w-[20rem] text-5xl font-bold leading-[3.4rem]">
          Explore the best prompts
        </h1>
        <p>
          PromptHunt is an open library of AI prompts. Explore prompts created
          by the community and leverage the power of AI to achieve your tasks.
        </p>
        <Input
          placeholder="Search"
          block
          className="mt-6"
          leftIcon={<MagnifyingGlassIcon className="h-5 w-5" />}
          size="lg"
          value={queryValue}
          onValueChange={setQueryValue}
        />
      </div>

      <div className="mt-20">
        <h4 className="mb-6 text-3xl font-bold">Top Prompts</h4>
        <PromptsCatalog className="flex-1" query={query} />
      </div>
    </div>
  );
};

export default Home;
