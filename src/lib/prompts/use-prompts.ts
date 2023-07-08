import { useChainId, useQuery } from "wagmi";

import { DEPLOYMENT_BLOCK } from "@constants/addresses";
import { usePromptHunt } from "@hooks/use-prompt-hunt";
import { fetchFromIpfs } from "@utils/ipfs";

import { Prompt, PromptMetadata } from "./types";

interface UsePromptsParams {
  enabled?: boolean;
  category?: string;
  model?: string;
  query?: string;
}

export const usePrompts = (params?: UsePromptsParams) => {
  const chainId = useChainId();
  const { category, model, query } = params || {};
  const promptHunt = usePromptHunt();

  return useQuery(
    ["prompts", category, model, query, chainId],
    async () => {
      if (!promptHunt) return [];

      /* Get prompts */
      const prompts: Omit<Prompt, "metadata">[] = [];
      const eventFilter = promptHunt.filters.PromptCreated();
      const events = await promptHunt.queryFilter(
        eventFilter,
        DEPLOYMENT_BLOCK[chainId],
      );

      for (const event of events) {
        if (!event.args) continue;

        prompts.push({
          id: event.args.id.toNumber(),
          owner: event.args.owner as `0x${string}`,
          dataUri: event.args.dataUri,
          upvotes: 0,
        });
      }

      /* Get Prompt upvotes */
      const promptUpvotes = await Promise.all(
        prompts.map((prompt) => {
          return promptHunt
            .prompts(prompt.id)
            .then((prompt) => prompt.upvotes.toNumber());
        }),
      );

      for (let i = 0; i < prompts.length; i++) {
        prompts[i].upvotes = promptUpvotes[i];
      }

      /* Get Prompt metadata */
      const promptsMetadata = await Promise.all(
        prompts.map((prompt) => fetchFromIpfs<PromptMetadata>(prompt.dataUri)),
      );

      const promptsWithMetadata: Prompt[] = prompts.map((prompt, index) => ({
        ...prompt,
        metadata: promptsMetadata[index],
      }));

      /* Filter prompts by query */
      const filteredPromptsByQuery = query
        ? promptsWithMetadata.filter((prompt) =>
            prompt.metadata.title.toLowerCase().includes(query.toLowerCase()),
          )
        : promptsWithMetadata;

      /* Filter prompts by category */
      const filteredPromptsByCategory = category
        ? filteredPromptsByQuery.filter(
            (prompt) => prompt.metadata.category === category,
          )
        : filteredPromptsByQuery;

      /* Filter prompts by model */
      const filteredPrompts = model
        ? filteredPromptsByCategory.filter(
            (prompt) => prompt.metadata.model === model,
          )
        : filteredPromptsByCategory;

      /* Order by upvotes */
      return filteredPrompts.sort((a, b) => b.upvotes - a.upvotes);
    },
    {
      enabled: params?.enabled,
    },
  );
};
