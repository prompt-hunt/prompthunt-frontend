import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UseExecuteGptPromptParams {
  onSuccess?: (result: string) => void;
}

export const useExecuteGptPrompt = (options?: UseExecuteGptPromptParams) => {
  return useMutation(
    async ({ prompt }: { prompt: string }) => {
      const res = await axios.post("/api/gpt", {
        prompt,
      });
      return res.data.result;
    },
    {
      onSuccess: options?.onSuccess,
    },
  );
};
