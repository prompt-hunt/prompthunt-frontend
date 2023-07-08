import Link from "next/link";

import { Button } from "@components/basic/button";

export const Hero = () => {
  return (
    <section className="relative flex flex-col items-center gap-6 py-36 text-center">
      <h1 className="max-w-[42rem] text-4xl font-bold md:text-5xl">
        The <span className="text-primary">open</span> and{" "}
        <span className="text-primary">collaborative</span> archive of AI
        prompts
      </h1>
      <p className="max-w-[20rem] text-xl text-base-content-neutral sm:max-w-[38rem]">
        On PromptHunt anyone can share their best prompts for AI models and
        search for prompts to achieve the tasks they need.
      </p>
      <Link href="/feed">
        <Button size="lg">Find prompts</Button>
      </Link>
    </section>
  );
};
