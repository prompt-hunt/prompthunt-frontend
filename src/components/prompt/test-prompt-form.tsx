import { useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { Prompt } from "@lib/prompts/types";
import { capitalizeFirstCharacter } from "@utils/capitalize-first-character";
import { extractParameters } from "@utils/extract-parameters";

interface TestPromptFormProps {
  prompt: Prompt;
}

export const TestPromptForm = ({ prompt }: TestPromptFormProps) => {
  const promptParameters = extractParameters(prompt.metadata.prompt);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const promptWithParameters = promptParameters.reduce((acc, parameter) => {
      return acc.replace(`<${parameter}>`, data[parameter]);
    }, prompt.metadata.prompt);

    console.log("promptWithParameters", promptWithParameters);
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
      <Button className="mt-4" block type="submit">
        Submit
      </Button>
    </form>
  );
};
