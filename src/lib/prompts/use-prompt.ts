import { useQuery } from "wagmi";

import { usePromptHunt } from "@hooks/use-prompt-hunt";
import { fetchFromIpfs } from "@utils/ipfs";

import { Prompt, PromptMetadata } from "./types";

interface UsePromptParams {
  promptId: number;
}

export const usePrompt = (params: UsePromptParams) => {
  const { promptId } = params;
  const promptHunt = usePromptHunt();

  return useQuery<Prompt | undefined>(["prompt", promptId], async () => {
    if (!promptHunt) return;

    const prompt = await promptHunt.prompts(promptId);
    const { owner, dataUri } = prompt;
    const metadata = await fetchFromIpfs<PromptMetadata>(prompt.dataUri);

    return {
      id: promptId,
      owner: owner as `0x${string}`,
      dataUri,
      upvotes: prompt.upvotes.toNumber(),
      metadata: metadata,
    };
  });
};
