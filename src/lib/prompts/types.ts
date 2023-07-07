export interface Prompt {
  id: number;
  owner: `0x${string}`;
  upvotes: number;
  dataUri: string;
  metadata: PromptMetadata;
}

export interface PromptMetadata {
  title: string;
  image: string;
  prompt: string;
  model: string;
  exampleInput: Record<string, string>;
  exampleOutput: string;
}
