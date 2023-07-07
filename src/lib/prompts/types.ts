export interface Prompt {
  id: number;
  owner: `0x${string}`;
  upvotes: number;
  dataUri: string;
  metadata: PromptMetadata;
}

export interface PromptMetadata {
  title: string;
  prompt: string;
  model: string;
  image: string;

  category: string;
}

export interface PromptWithExamples extends Prompt {
  examples: PromptExample[];
}

export interface PromptExample {
  exampleInput: Record<string, string>;
  exampleOutput: string;
}
