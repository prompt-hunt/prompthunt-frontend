import { useChainId, useContract, useProvider, useSigner } from "wagmi";

import { PromptHuntAbi } from "@abis/prompt-hunt";
import { PROMPT_HUNT_ADDRESS } from "@constants/addresses";

export const usePromptHunt = (withSigner = false) => {
  const chainId = useChainId();
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    address: PROMPT_HUNT_ADDRESS[chainId],
    abi: PromptHuntAbi,
    signerOrProvider: withSigner ? signer : provider,
  });
};
