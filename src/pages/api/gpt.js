const { Configuration, OpenAIApi } = require("openai");
const apiKey = "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";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const configuration = new Configuration({
      apiKey,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      temperature: 0.9,
      max_tokens: 2048,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    // Process a POST request

    const response = completion.data.choices[0].text;
    const cleanedResponse = response.replace("\n\n", "");

    return res.json({ result: cleanedResponse });
  } else {
    // Handle any other HTTP method
  }
}
