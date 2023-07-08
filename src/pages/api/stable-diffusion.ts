import { Leap } from "@leap-ai/sdk";
import { NextApiRequest, NextApiResponse } from "next";

const apiKey = process.env.LEAP_API_KEY || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    // You can find your API in the Leap dashboard in the bottom left corner
    const leap = new Leap(apiKey);

    // This can be any string
    const prompt = req.body.prompt;

    const { data } = await leap.generate.generateImage({ prompt });

    return res.json({ result: data?.images[0].uri });
  } else {
    return res.status(403).json({ message: "Not allowed" });
  }
}
