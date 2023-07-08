import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UseExecuteStableDiffusionPromptParams {
  onSuccess?: (result: string) => void;
}

export const useExecuteStableDiffusionPrompt = (
  options?: UseExecuteStableDiffusionPromptParams,
) => {
  return useMutation(
    async ({ prompt }: { prompt: string }) => {
      const res = await axios.post("/api/stable-diffusion", {
        prompt,
      });
      return res.data.result;
    },
    {
      onSuccess: options?.onSuccess,
    },
  );
};
