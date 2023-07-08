const { Configuration, OpenAIApi } = require("openai");
const apiKey = "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";

const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

async function name() {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "write 5 ideas for a nft project",
    temperature: 0.9,
    max_tokens: 2048,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });
  console.log(completion.data.choices[0].text);
}

name();
