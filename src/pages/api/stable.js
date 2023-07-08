const { Leap } = require("@leap-ai/sdk");

export default async function handler(req, res) {
  console.log("CIao");

  if (req.method === "POST") {
    // You can find your API in the Leap dashboard in the bottom left corner
    const leap = new Leap("af52f50d-5c99-4c5a-b3eb-c05d387977b9");

    // This can be any string
    const prompt = req.body.prompt;

    const { data, error } = await leap.generate.generateImage({ prompt });

    console.log("Data -->>", data);

    const images = data.images;

    return res.json({ result: images[0].uri });
  } else {
    return res.status(403).json({ message: "Not allowed" });
  }
}
