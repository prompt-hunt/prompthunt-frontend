import { ContractReceipt } from "ethers";
import { useMutation } from "wagmi";

import { usePromptHunt } from "@hooks/use-prompt-hunt";
import { uploadToIPFS } from "@utils/ipfs";

export interface CreatePromptData {
  promptId: number;
  exampleInput: Record<string, string>;
  exampleOutput: string;
}

interface UseAddPromptExampleOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useAddPromptExample = (options?: UseAddPromptExampleOptions) => {
  const promptHunt = usePromptHunt(true);
  const mutation = useMutation(
    async ({ promptId, exampleInput, exampleOutput }: CreatePromptData) => {
      if (!promptHunt) return;

      // Upload to IPFS
      const exampleData = {
        exampleInput,
        exampleOutput,
      };
      const dataUri = await uploadToIPFS(exampleData);
      if (!dataUri) return;

      const tx = await promptHunt.addPromptExample(promptId, dataUri);
      const receipt = await tx.wait();
      return receipt;
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
