import { useQuery } from "@tanstack/react-query";
import { useChainId } from "wagmi";

import { DEPLOYMENT_BLOCK } from "@constants/addresses";
import { usePromptHunt } from "@hooks/use-prompt-hunt";
import { fetchFromIpfs } from "@utils/ipfs";

import { PromptExample, PromptMetadata, PromptWithExamples } from "./types";

interface UsePromptParams {
  promptId: number;
}

export const usePrompt = (params: UsePromptParams) => {
  const chainId = useChainId();
  const { promptId } = params;
  const promptHunt = usePromptHunt();

  return useQuery<PromptWithExamples | undefined>(
    ["prompt", promptId, chainId],
    async () => {
      if (!promptHunt) return;

      const prompt = await promptHunt.prompts(promptId);
      const { owner, dataUri } = prompt;
      const metadata = await fetchFromIpfs<PromptMetadata>(prompt.dataUri);

      /* Get prompt examples */
      const dataUris: string[] = [];
      const eventFilter = promptHunt.filters.PromptExampleAdded(promptId);
      const events = await promptHunt.queryFilter(
        eventFilter,
        DEPLOYMENT_BLOCK[chainId],
      );

      for (const event of events) {
        if (!event.args) continue;
        dataUris.push(event.args.dataUri);
      }

      /* Get Examples metadata */
      const examples = await Promise.all(
        dataUris.map((dataUri) => fetchFromIpfs<PromptExample>(dataUri)),
      );
      const promptExamples: PromptExample[] = [
        {
          exampleInput: metadata.exampleInput,
          exampleOutput: metadata.exampleOutput,
        },
        ...examples,
      ];

      return {
        id: promptId,
        owner: owner as `0x${string}`,
        dataUri,
        upvotes: prompt.upvotes.toNumber(),
        metadata,
        examples: promptExamples,
      };
    },
  );
};
