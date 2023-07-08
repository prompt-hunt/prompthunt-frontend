import Link from "next/link";

import { Button } from "@components/basic/button";

export const DonationsSection = () => {
  return (
    <section className="rounded-box flex flex-col items-center gap-6 bg-accent px-5 py-20">
      <h3 className="max-w-[30rem] text-center text-3xl font-bold">
        Donate to support the best prompt creators
      </h3>
      <p className="max-w-[28rem] text-center text-lg text-base-content-neutral">
        Our funding mechanism supports the prompt creators that are more
        appreciated and valuable to the community.
      </p>
      <Link href="/donate">
        <Button size="lg">Donate now</Button>
      </Link>
    </section>
  );
};
