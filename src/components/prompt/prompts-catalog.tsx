import cx from "classnames";

import { Spinner } from "@components/basic/spinner";
import { PromptCard } from "@components/prompt/prompt-card";
import { usePrompts } from "@lib/prompts/use-prompts";

const PromptsCatalogInner = () => {
  const { data: prompts, isLoading } = usePrompts();

  if (isLoading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (prompts?.length === 0)
    return (
      <div className="my-14 flex justify-center">
        <p>No prompts yet</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-autofill">
      {prompts?.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} linkToPage />
      ))}
    </div>
  );
};

export const PromptsCatalog = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <PromptsCatalogInner />
    </div>
  );
};
