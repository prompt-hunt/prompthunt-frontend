import cx from "classnames";
import Image from "next/image";
import Link from "next/link";

import { Address } from "@components/address";
import { AddressAvatar } from "@components/address-avatar";
import UpvoteIcon from "@icons/upvote.svg";
import { useHasUpvotedPrompt } from "@lib/prompts/use-has-upvoted-prompt";
import { useUpvotePrompt } from "@lib/prompts/use-upvote-prompt";

import type { Prompt } from "@lib/prompts/types";

interface PromptCardProps {
  prompt: Prompt;
  linkToPage?: boolean;
  onUpvote?: () => void;
}

export const PromptCard = ({ prompt, onUpvote }: PromptCardProps) => {
  const { data: hasUpvoted, refetch } = useHasUpvotedPrompt({
    promptId: prompt.id,
  });
  const { mutate: upvotePrompt } = useUpvotePrompt({
    onSuccess() {
      refetch();
      onUpvote?.();
    },
  });

  const handleUpvotePrompt = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    upvotePrompt({
      promptId: prompt.id,
    });
  };

  return (
    <Link
      href={`/prompts/${prompt.id}`}
      className="rounded-box relative flex flex-col overflow-hidden bg-base-200"
    >
      <div className="rounded-btn absolute left-3 top-3 z-10 bg-neutral px-2 py-0.5 text-sm text-neutral-content">
        {prompt.metadata.model}
      </div>

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
          <button
            onClick={handleUpvotePrompt}
            className={cx(
              "hover rounded-btn flex w-12 flex-col items-center border border-base-content p-2 hover:bg-base-content/20",
              hasUpvoted ? "bg-base-content/20 text-primary" : "bg-transparent",
            )}
            disabled={hasUpvoted}
          >
            <UpvoteIcon className="h-4 w-4" />
            <span className="font-bold">{prompt.upvotes}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
