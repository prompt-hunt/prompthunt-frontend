import cx from "classnames";
import { useState } from "react";

import { Spinner } from "@components/basic/spinner";
import { PromptCard } from "@components/prompt/prompt-card";
import { PROMPT_CATEGORIES, PROMPT_MODELS } from "@constants/prompts";
import { usePrompts } from "@lib/prompts/use-prompts";

interface CategoryButtonProps {
  category: string;
  isActive: boolean;
  onClick?: () => void;
}

const CategoryButton = ({
  isActive,
  category,
  onClick,
}: CategoryButtonProps) => {
  return (
    <button
      className={cx(
        "rounded-full border border-base-content sm:px-4 sm:py-2 px-3 py-1",
        isActive ? "bg-base-content text-base-100" : "text-base-content",
      )}
      onClick={onClick}
    >
      {category}
    </button>
  );
};

const PromptsCatalogInner = ({
  category,
  model,
}: {
  category: string;
  model: string;
}) => {
  const { data: prompts, isLoading } = usePrompts({
    category,
    model,
  });

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
  const [activeCategory, setActiveCategory] = useState("");
  const [activeModel, setActiveModel] = useState("");

  return (
    <div className={className}>
      <div className="mb-8 flex flex-wrap items-center gap-2">
        <CategoryButton
          category={"All"}
          onClick={() => {
            setActiveCategory("");
            setActiveModel("");
          }}
          isActive={activeCategory === "" && activeModel === ""}
        />
        <div className="mx-3 h-8 w-px bg-base-content sm:h-10" />

        {PROMPT_MODELS.map((model) => (
          <CategoryButton
            key={model}
            category={model}
            onClick={() => {
              setActiveModel(model);
              setActiveCategory("");
            }}
            isActive={activeModel === model}
          />
        ))}
        <div className="mx-3 h-8 w-px bg-base-content sm:h-10" />
        {PROMPT_CATEGORIES.map((category) => (
          <CategoryButton
            key={category}
            category={category}
            onClick={() => {
              setActiveCategory(category);
              setActiveModel("");
            }}
            isActive={activeCategory === category}
          />
        ))}
      </div>
      <PromptsCatalogInner category={activeCategory} model={activeModel} />
    </div>
  );
};
