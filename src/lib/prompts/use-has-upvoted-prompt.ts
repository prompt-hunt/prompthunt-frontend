import { useAccount, useQuery } from "wagmi";

import { usePromptHunt } from "@hooks/use-prompt-hunt";

interface UsePromptParams {
  promptId: number;
}

export const useHasUpvotedPrompt = (params: UsePromptParams) => {
  const { address } = useAccount();

  const { promptId } = params;
  const promptHunt = usePromptHunt();

  return useQuery(["has-upvoted-prompt", promptId, address], async () => {
    if (!promptHunt) return;

    /* Get prompt examples */
    const eventFilter = promptHunt.filters.PromptUpvoted(promptId, address);
    const events = await promptHunt.queryFilter(eventFilter);

    if (events.length > 0) return true;

    return false;
  });
};
