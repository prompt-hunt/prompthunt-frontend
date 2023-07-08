import { useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { Prompt } from "@lib/prompts/types";
import { useAddPromptExample } from "@lib/prompts/use-add-prompt-example";
import { capitalizeFirstCharacter } from "@utils/capitalize-first-character";
import { extractParameters } from "@utils/extract-parameters";

interface TestPromptFormProps {
  prompt: Prompt;
  onExecute?: () => void;
}

export const TestPromptForm = ({ prompt, onExecute }: TestPromptFormProps) => {
  const promptParameters = extractParameters(prompt.metadata.prompt);
  const { mutate: addPromptExample, isLoading } = useAddPromptExample({
    onSuccess() {
      onExecute?.();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const promptWithParameters = promptParameters.reduce((acc, parameter) => {
      return acc.replace(`<${parameter}>`, data[parameter]);
    }, prompt.metadata.prompt);

    console.log("Prompt: ", promptWithParameters);

    // TODO: execute prompt

    addPromptExample({
      promptId: prompt.id,
      exampleInput: data,
      // TODO: get output from response
      exampleOutput: "Day 1: Breakfast: Eggs",
    });
  });

  return (
    <form className="flex w-full flex-col gap-2" onSubmit={onSubmit}>
      {promptParameters.map((parameter) => (
        <div key={parameter} className="flex items-center gap-2">
          <span className="w-[6rem] font-bold">
            {capitalizeFirstCharacter(parameter)}
          </span>

          <Input
            size="sm"
            className="flex-1"
            block
            {...register(parameter, { required: "Is required" })}
            error={errors[parameter]?.message?.toString()}
          />
        </div>
      ))}
      <Button className="mt-4" block type="submit" loading={isLoading}>
        Run
      </Button>
    </form>
  );
};
