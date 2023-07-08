import Image from "next/image";

import { Address } from "@components/address";
import { AddressAvatar } from "@components/address-avatar";
import { CopyButton } from "@components/copy-button";
import { capitalizeFirstCharacter } from "@utils/capitalize-first-character";

import type { Prompt, PromptExample } from "@lib/prompts/types";

interface PromptExampleCardProps {
  prompt: Prompt;
  example: PromptExample;
  linkToPage?: boolean;
}

export const PromptExampleCard = ({
  example,
  prompt,
}: PromptExampleCardProps) => {
  return (
    <div className="rounded-box relative flex flex-col overflow-hidden bg-base-200">
      <div className="relative h-44">
        {prompt.metadata.model === "Stable Diffusion" ? (
          <Image
            src={example.exampleOutput}
            fill
            alt="Prompt"
            priority
            className="object-cover"
          />
        ) : (
          <div className="h-full bg-base-300 p-4">
            {example.exampleOutput.slice(0, 300)}
          </div>
        )}
      </div>

      <div className="flex justify-between gap-2 p-4">
        <div>
          <h4 className="block text-lg font-semibold">
            {Object.entries(example.exampleInput).map((entry, index) => (
              <span key={entry[0]}>
                {capitalizeFirstCharacter(entry[0])}: {entry[1]}
                {index !== Object.entries(example.exampleInput).length - 1 &&
                  ", "}
              </span>
            ))}
          </h4>
          <div className="mt-1 flex items-center gap-2">
            <AddressAvatar address={prompt.owner} />
            <Address address={prompt.owner} />
          </div>
        </div>

        <div>
          <CopyButton text={example.exampleOutput} />
        </div>
      </div>
    </div>
  );
};
