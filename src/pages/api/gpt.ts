import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.OPENAI_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const configuration = new Configuration({
      apiKey,
    });
    const openai = new OpenAIApi(configuration);

    console.log("Api key: ", apiKey);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      temperature: 0.9,
      max_tokens: 2048,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    const response = completion.data.choices[0].text;
    // const cleanedResponse = response?.replace("\n\n", "");

    return res.json({ result: response });
  } else {
    return res.status(403).json({ message: "Not allowed" });
  }
}
