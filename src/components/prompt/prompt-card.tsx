import Image from "next/image";
import Link from "next/link";

import { Address } from "@components/address";
import { AddressAvatar } from "@components/address-avatar";
import UpvoteIcon from "@icons/upvote.svg";

import type { Prompt } from "@lib/prompts/types";

interface PromptCardProps {
  prompt: Prompt;
  linkToPage?: boolean;
}

export const PromptCard = ({ prompt }: PromptCardProps) => {
  return (
    <Link
      href={`/prompts/${prompt.id}`}
      className="rounded-box flex flex-col overflow-hidden bg-base-200"
    >
      <div className="relative h-44">
        <Image
          src={prompt.metadata.image}
          fill
          alt="Prompt"
          priority
          className="object-cover"
        />
      </div>

      <div className="flex justify-between gap-2 p-4">
        <div>
          <h4 className="block text-lg font-semibold">
            {prompt.metadata.title}
          </h4>
          <div className="mt-1 flex items-center gap-2">
            <AddressAvatar address={prompt.owner} />
            <Address address={prompt.owner} />
          </div>
        </div>

        <div>
          <button className="hover rounded-btn flex w-12 flex-col items-center border border-base-content p-2 hover:bg-base-content/20">
            <UpvoteIcon className="h-4 w-4" />
            <span className="font-bold">{prompt.upvotes}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
