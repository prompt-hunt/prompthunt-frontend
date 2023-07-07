import { useRouter } from "next/router";

import { Spinner } from "@components/basic/spinner";
import { Prompt } from "@lib/prompts/types";
import { usePrompt } from "@lib/prompts/use-prompt";

const PromptInfo = ({ prompt }: { prompt: Prompt }) => {
  console.log("Prompt: ", prompt);

  return (
    <div className="flex flex-col gap-14 md:flex-row lg:gap-20">
      {prompt.metadata.title}
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
