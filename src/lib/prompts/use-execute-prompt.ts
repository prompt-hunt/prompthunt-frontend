import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UseExecuteGptPromptParams {
  onSuccess?: (result: string) => void;
}

export const useExecutePrompt = (options?: UseExecuteGptPromptParams) => {
  return useMutation(
    async ({ prompt, type }: { prompt: string; type: string }) => {
      const url = type === "GPT" ? "/api/gpt" : "/api/stable-diffusion";
      const res = await axios.post(url, {
        prompt,
      });
      return res.data.result;
    },
    {
      onSuccess: options?.onSuccess,
    },
  );
};
