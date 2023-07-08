import { PromptWithExamples } from "@lib/prompts/types";

import { PromptExampleCard } from "./prompt-example-card";

interface PromptExamplesListProps {
  prompt: PromptWithExamples;
  className?: string;
}

export const PromptExamplesList = ({
  className,
  prompt,
}: PromptExamplesListProps) => {
  return (
    <div className={className}>
      <h4 className="mb-6 text-2xl font-semibold">What others have done</h4>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-autofill">
        {prompt.examples?.map((example, index) => (
          <PromptExampleCard
            key={JSON.stringify(example.exampleInput) + index}
            prompt={prompt}
            example={example}
          />
        ))}
      </div>
    </div>
  );
};
