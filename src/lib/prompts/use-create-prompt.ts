import { ContractReceipt } from "ethers";
import { useMutation } from "wagmi";

import { usePromptHunt } from "@hooks/use-prompt-hunt";
import { uploadToIPFS } from "@utils/ipfs";

export interface CreatePromptData {
  title: string;
  prompt: string;
  model: string;
  image: string;
  exampleInput: Record<string, string>;
  exampleOutput: string;
}

interface UseCreatePromptOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useCreatePrompt = (options?: UseCreatePromptOptions) => {
  const promptHunt = usePromptHunt(true);
  const mutation = useMutation(
    async ({
      title,
      prompt,
      model,
      image,
      exampleInput,
      exampleOutput,
    }: CreatePromptData) => {
      if (!promptHunt) return;

      const uri = await uploadToIPFS({
        title,
        prompt,
        model,
        image,
        exampleInput,
        exampleOutput,
      });
      if (!uri) return;

      const tx = await promptHunt.createPrompt(uri);
      const receipt = await tx.wait();
      return receipt;
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
