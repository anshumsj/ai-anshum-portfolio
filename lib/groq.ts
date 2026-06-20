import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const geminiModel = {
  async generateContent(prompt: string) {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
    });

    return {
      response: {
        text: () => completion.choices[0].message.content,
      },
    };
  },
};