import { useQuery } from "wagmi";

import { usePromptHunt } from "@hooks/use-prompt-hunt";
import { fetchFromIpfs } from "@utils/ipfs";

import { Prompt, PromptMetadata } from "./types";

interface UsePromptsOptions {
  enabled?: boolean;
}

export const usePrompts = (options?: UsePromptsOptions) => {
  const promptHunt = usePromptHunt();

  return useQuery(
    ["prompts"],
    async () => {
      if (!promptHunt) return [];

      /* Get prompts */
      const prompts: Omit<Prompt, "metadata">[] = [];
      const eventFilter = promptHunt.filters.PromptCreated();
      const events = await promptHunt.queryFilter(eventFilter);

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

      return promptsWithMetadata;
    },
    {
      enabled: options?.enabled,
    },
  );
};
