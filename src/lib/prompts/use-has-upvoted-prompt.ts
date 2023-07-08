import { useAccount, useChainId, useQuery } from "wagmi";

import { DEPLOYMENT_BLOCK } from "@constants/addresses";
import { usePromptHunt } from "@hooks/use-prompt-hunt";

interface UsePromptParams {
  promptId: number;
}

export const useHasUpvotedPrompt = (params: UsePromptParams) => {
  const chainId = useChainId();
  const { address } = useAccount();

  const { promptId } = params;
  const promptHunt = usePromptHunt();

  return useQuery(
    ["has-upvoted-prompt", promptId, address, chainId],
    async () => {
      if (!promptHunt) return false;

      /* Get prompt examples */
      const eventFilter = promptHunt.filters.PromptUpvoted(promptId, address);
      const events = await promptHunt.queryFilter(
        eventFilter,
        DEPLOYMENT_BLOCK[chainId],
      );

      if (events.length > 0) return true;

      return false;
    },
  );
};
