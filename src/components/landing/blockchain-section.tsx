import { Button } from "@components/basic/button";
import { Container } from "@components/layout/container";

export const BlockchainSection = () => {
  return (
    <section>
      <Container className="flex flex-col items-center gap-8 py-32">
        <h3 className="max-w-[34rem] text-center text-3xl font-bold">
          Built on decentralized tech to be open and composable
        </h3>
        <p className="max-w-[36rem] text-center text-lg text-base-content-neutral">
          Our prompts database is built with blockchain and decentralized
          storage to make it available for everyone to build on top. Build your
          own algorithm to search for the best prompts for your specific use
          case.
        </p>
        <a
          href={"https://github.com/prompt-hunt/prompthunt-contracts/"}
          target="_blank"
          rel="noreferrer"
        >
          <Button size="lg">Check the code</Button>
        </a>
      </Container>
    </section>
  );
};
