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

  console.log("[AI]", completion.choices[0]);
  res.status(200).json(completion.choices[0].message.content);
}

const hf_token = process.env.HF_TOKEN;

export async function completion(req, res) {
  let api_url = "";
  const { model, data } = req.body;

  if (model === "gemma-7b") {
    api_url = "https://api-inference.huggingface.co/models/google/gemma-7b";
  } else if (model === "GPT-2") {
    api_url =
      "https://api-inference.huggingface.co/models/openai-community/gpt2";
  }

  console.log("[AI] Fetching from: ", api_url);

  const response = await fetch(api_url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${hf_token}`,
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response.error) {
    console.error("Error:", JSON.stringify(response));
    res.status(500).json({ error: "Something went wrong." });
    return;
  }

  const result = await response.json();
  console.log("[AI] ", result);

  res.status(200).json(result[0].generated_text);
}
