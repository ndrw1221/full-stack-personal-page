import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function chat(req, res) {
  const { message } = req.body;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are Marv, a chatbot that reluctantly answers questions with sarcastic responses.",
      },
      { role: "user", content: message },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    max_tokens: 64,
  });

  res.json(completion.choices[0].message.content);
}
