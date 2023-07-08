import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";

import { Address } from "@components/address";
import { AddressAvatar } from "@components/address-avatar";
import { Spinner } from "@components/basic/spinner";
import { CopyButton } from "@components/copy-button";
import { PromptExamplesList } from "@components/prompt/prompt-examples-list";
import { TestPromptForm } from "@components/prompt/test-prompt-form";
import UpvoteIcon from "@icons/upvote.svg";
import { PromptWithExamples } from "@lib/prompts/types";
import { useHasUpvotedPrompt } from "@lib/prompts/use-has-upvoted-prompt";
import { usePrompt } from "@lib/prompts/use-prompt";
import { useUpvotePrompt } from "@lib/prompts/use-upvote-prompt";

interface PromptInfoProps {
  prompt: PromptWithExamples;
  onUpvote?: () => void;
  onExecute?: () => void;
}

const PromptInfo = ({ prompt, onUpvote, onExecute }: PromptInfoProps) => {
  const { data: hasUpvoted, refetch } = useHasUpvotedPrompt({
    promptId: prompt.id,
  });
  const { mutate: upvotePrompt, isLoading } = useUpvotePrompt({
    onSuccess() {
      refetch();
      onUpvote?.();
    },
  });

  const handleUpvotePrompt = async () => {
    upvotePrompt({
      promptId: prompt.id,
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-14 md:flex-row lg:gap-20">
        <div className="flex-1">
          <div className="rounded-box relative h-60 w-full overflow-hidden">
            <Image
              src={prompt.metadata.image}
              fill
              alt="Prompt"
              priority
              className="object-cover"
            />
          </div>
          <h4 className="mt-8 text-2xl font-semibold">
            {prompt.metadata.title}
          </h4>
          <div className="mt-4 flex gap-2">
            <div className="rounded-btn bg-neutral px-3 py-1 text-sm text-neutral-content">
              {prompt.metadata.model}
            </div>
            <div className="rounded-btn bg-neutral px-3 py-1 text-sm text-neutral-content">
              {prompt.metadata.category}
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <div className="mt-1 flex items-center gap-2">
              <AddressAvatar address={prompt.owner} />
              <Address address={prompt.owner} />
            </div>

            <div className="flex gap-2">
              <CopyButton text={prompt.metadata.prompt} />
              <button
                onClick={handleUpvotePrompt}
                className={cx(
                  "hover rounded-btn flex w-12 flex-col items-center border border-base-content p-2 hover:bg-base-content/20",
                  hasUpvoted
                    ? "bg-base-content/20 text-primary"
                    : "bg-transparent",
                )}
                disabled={hasUpvoted}
              >
                {isLoading ? (
                  <Spinner />
                ) : (
                  <span>
                    <UpvoteIcon className="h-4 w-4" />
                    <span className="font-bold">{prompt.upvotes}</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="mb-6 text-2xl font-semibold">Try the prompt</h4>
          <TestPromptForm prompt={prompt} onExecute={onExecute} />
          <div className="rounded-box mt-4 bg-base-200 p-4">
            <span className="font-bold">Result:</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur nostrum quas deserunt a numquam ad ab quo? Excepturi,
              beatae ab?
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <PromptExamplesList prompt={prompt} />
      </div>
    </div>
  );
};

const PromptPageInner = ({ id }: { id: number }) => {
  const { data: prompt, refetch } = usePrompt({
    promptId: id,
  });

  if (!prompt) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return <PromptInfo prompt={prompt} onUpvote={refetch} onExecute={refetch} />;
};

const PromptPage = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  if (!id) return null;

  return <PromptPageInner id={id} />;
};

export default PromptPage;
