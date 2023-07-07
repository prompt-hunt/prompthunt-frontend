import { ContractReceipt } from "ethers";
import { useMutation } from "wagmi";

import { usePromptHunt } from "@hooks/use-prompt-hunt";

export interface CreatePromptData {
  promptId: number;
}

interface UseUpvotePromptOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useUpvotePrompt = (options?: UseUpvotePromptOptions) => {
  const promptHunt = usePromptHunt(true);
  const mutation = useMutation(
    async ({ promptId }: CreatePromptData) => {
      if (!promptHunt) return;

      const tx = await promptHunt.upvotePrompt(promptId);
      const receipt = await tx.wait();
      return receipt;
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
