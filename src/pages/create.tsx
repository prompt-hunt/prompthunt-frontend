import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@components/basic/dropdown";
import { Input } from "@components/basic/input";
import { Label } from "@components/basic/label";
import { TextArea } from "@components/basic/textarea/textarea";
import { PROMPT_CATEGORIES, PROMPT_MODELS } from "@constants/prompts";
import { useCreatePrompt } from "@lib/prompts/use-create-prompt";
import { useExecutePrompt } from "@lib/prompts/use-execute-prompt";
import { capitalizeFirstCharacter } from "@utils/capitalize-first-character";
import { extractParameters } from "@utils/extract-parameters";

import type { NextPage } from "next";

interface CreatePromptFields {
  title: string;
  prompt: string;
  // other keys
  parameters: {
    [key: string]: string;
  };
}

const CreatePage: NextPage = () => {
  const router = useRouter();
  const [category, setCategory] = useState(PROMPT_CATEGORIES[0]);
  const [result, setResult] = useState("");
  const [activeModel, setActiveModel] = useState(PROMPT_MODELS[0]);

  const { mutate: createPrompt, isLoading } = useCreatePrompt({
    onSuccess(receipt) {
      const promptId = receipt?.events?.find((e) => e.event === "PromptCreated")
        ?.args?.id;
      router.push(`/prompts/${promptId}`);
    },
  });

  const { mutate: executePrompt, isLoading: isLoadingExecute } =
    useExecutePrompt({
      onSuccess(result) {
        setResult(result);
      },
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<CreatePromptFields>({
    defaultValues: {
      parameters: {},
    },
  });

  const prompt = watch("prompt") || "";
  const promptParameters = extractParameters(prompt);

  const onSubmit = handleSubmit(async (data) => {
    const promptWithParameters = Object.entries(data.parameters || {}).reduce(
      (acc, entry) => {
        return acc.replace(`<${entry[0]}>`, entry[1]);
      },
      data.prompt,
    );

    executePrompt({
      prompt: promptWithParameters,
      type: activeModel,
    });
  });

  const onShare = () => {
    const values = getValues();
    const { title, prompt, parameters } = values;
    createPrompt({
      title,
      model: activeModel,
      prompt,
      category: category,
      // If stable diffusion use the result of the prompt
      image:
        activeModel === "GPT"
          ? "https://firebasestorage.googleapis.com/v0/b/promptbase.appspot.com/o/DALLE_IMAGES%2FCrpcqah7YdgU133cBw6H%2Fresized%2F1687293200789_800x800.webp?alt=media&token=c5f63804-7181-4039-bf15-1a24bf98afea"
          : result,
      exampleInput: parameters,
      // Use result of the prompt
      exampleOutput: result,
    });
  };

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Create your prompt</h1>
          <Dropdown className="inline-flex">
            <DropdownTrigger className="rounded-btn flex items-center gap-3 bg-base-300 px-4 py-1.5 font-medium hover:bg-base-300">
              {activeModel}
              <ChevronDownIcon className="h-4 w-4" />
            </DropdownTrigger>
            <DropdownContent className="mt-2 min-w-[200px]">
              {PROMPT_MODELS.map((model) => (
                <DropdownItem
                  key={model}
                  onClick={() => setActiveModel(model)}
                  className="px-2 py-1"
                >
                  {model}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
        </div>

        <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
          <div>
            <Label className="text-lg">Title of the prompt</Label>
            <Input
              block
              {...register("title", { required: "Title is required" })}
              error={errors.title?.message}
            />
          </div>
          <div>
            <Label className="text-lg">Category</Label>
            <Dropdown className="w-full">
              <DropdownTrigger
                type="button"
                className="rounded-btn flex w-full items-center justify-between gap-3 bg-base-300 px-4 py-2 font-medium hover:bg-base-300"
              >
                <span>{category}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </DropdownTrigger>
              <DropdownContent className="mt-2 min-w-0">
                {PROMPT_CATEGORIES.map((category) => (
                  <DropdownItem
                    type="button"
                    key={category}
                    onClick={() => setCategory(category)}
                  >
                    {category}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
          <div>
            <Label className="text-lg">Prompt</Label>
            <p className="mb-1">Enter your parameters in between &lt; &gt;</p>
            <TextArea
              rows={3}
              {...register("prompt", {
                required: "Prompt is required",
              })}
              error={errors.prompt?.message}
              block
            />
          </div>
          {promptParameters.map((parameter) => (
            <div key={parameter} className="flex items-center gap-2">
              <span className="w-[6rem] font-bold">
                {capitalizeFirstCharacter(parameter)}
              </span>

              <Input
                size="sm"
                className="flex-1"
                block
                {...register(`parameters.${parameter}`, {
                  required: "Is required",
                })}
                error={errors.parameters?.[parameter]?.message?.toString()}
              />
            </div>
          ))}
          <Button
            className="mt-4"
            block
            type="submit"
            loading={isLoadingExecute}
            disabled={isLoadingExecute}
          >
            Submit
          </Button>
        </form>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        {result.startsWith("http") ? (
          <div className="relative h-96 w-full">
            <Image
              src={result}
              fill
              alt="Generated image"
              className="rounded-box overflow-hidden object-cover"
              // width={100}
              // height={100}
            />
          </div>
        ) : (
          <div className="rounded-box flex-1 bg-base-200 p-4">
            <p>{result}</p>
          </div>
        )}
        <div className="flex justify-end">
          <Button onClick={onShare} loading={isLoading} disabled={isLoading}>
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
