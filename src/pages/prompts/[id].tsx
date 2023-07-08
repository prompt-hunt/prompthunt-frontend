import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

import { Address } from "@components/address";
import { AddressAvatar } from "@components/address-avatar";
import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { Spinner } from "@components/basic/spinner";
import UpvoteIcon from "@icons/upvote.svg";
import { Prompt } from "@lib/prompts/types";
import { usePrompt } from "@lib/prompts/use-prompt";
import { copyToClipboard } from "@utils/copy-to-clipboard";

const extractParameters = (str: string) => {
  const regex = /<([^>]+)>/g;
  const matches = str.match(regex);

  if (matches) {
    const parameters = matches.map((match) => match.slice(1, -1));
    return parameters;
  }

  return [];
};

const capitalizeFirstCharacter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const PromptInfo = ({ prompt }: { prompt: Prompt }) => {
  const [copied, setCopied] = useState(false);

  const onCopyPrompt = () => {
    copyToClipboard(prompt.metadata.prompt);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const promptParameters = extractParameters(prompt.metadata.prompt);

  return (
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
        <h4 className="mt-8 text-2xl font-semibold">{prompt.metadata.title}</h4>
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
            <button
              onClick={onCopyPrompt}
              className="hover rounded-btn flex w-12 flex-col items-center justify-center border border-base-content p-2 hover:bg-base-content/20"
            >
              {copied ? (
                <CheckIcon className="h-6 w-6" />
              ) : (
                <DocumentDuplicateIcon className="h-6 w-6" />
              )}
            </button>
            <button className="hover rounded-btn flex w-12 flex-col items-center border border-base-content p-2 hover:bg-base-content/20">
              <UpvoteIcon className="h-4 w-4" />
              <span className="font-bold">{prompt.upvotes}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <h4 className="mb-6 text-2xl font-semibold">Try the prompt</h4>
        <div className="flex w-full flex-col gap-2">
          {promptParameters.map((parameter) => (
            <div key={parameter} className="flex items-center gap-2">
              <span className="w-[6rem] font-bold">
                {capitalizeFirstCharacter(parameter)}
              </span>
              <Input size="sm" className="flex-1" />
            </div>
          ))}
        </div>
        <Button className="mt-4" block>
          Submit
        </Button>
        <div className="rounded-box mt-4 bg-base-200 p-4">
          <span className="font-bold">Result:</span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            nostrum quas deserunt a numquam ad ab quo? Excepturi, beatae ab?
          </p>
        </div>
      </div>
    </div>
  );
};

const PromptPageInner = ({ id }: { id: number }) => {
  const { data: prompt } = usePrompt({
    promptId: id,
  });

  if (!prompt) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return <PromptInfo prompt={prompt} />;
};

const PromptPage = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  if (!id) return null;

  return <PromptPageInner id={id} />;
};

export default PromptPage;
