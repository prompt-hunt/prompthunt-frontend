const { Configuration, OpenAIApi } = require("openai");
const apiKey = "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";

export default async function handler(req, res) {
  console.log("CIao");

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
    return res.status(403).json({ message: "Not allowed" });
  }
}
