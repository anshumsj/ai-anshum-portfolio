import { sendMail } from "@/lib/mailer";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Question from "@/lib/models/Question";
import { geminiModel } from "@/lib/groq";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  if (!question || question.trim().length === 0) {
    return NextResponse.json({ error: "Empty question" }, { status: 400 });
  }

  await connectDB();

  const knowledgeBase = await Question.find({ answered: true }).lean();

  const context = knowledgeBase
    .map((q) => `Q: ${q.question}\nA: ${q.answer}`)
    .join("\n\n");

  const prompt = `You are AI Anshum — a chatbot that answers questions about Anshum Awasthi, a backend developer and final-year CSE student at IIIT Bhagalpur.

Answer questions based ONLY on the knowledge base below. Be conversational, first-person, and concise. Keep answers under 3 sentences.

If the answer is not in the knowledge base, respond with exactly this:
"I don't know that about Anshum yet — but I've saved your question. He'll answer it soon, and I'll remember it for next time."

Knowledge base:
${context}

Question: ${question}`;

  // Save question if not already in DB
  const existing = await Question.findOne({ question: question.trim() });
  if (!existing) {
    await Question.create({ question: question.trim() });

    // Notify via email
await sendMail({
  subject: "AI Anshum — new unanswered question",
  text: `A visitor asked:\n\n"${question}"\n\nLog in to /admin to answer it.`,
});
  }


  try {
    const result = await geminiModel.generateContent(prompt);
    const answer = result.response.text();
    return NextResponse.json({ answer });
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    console.error("AI API error:", error);

    if (error?.status === 429) {
      return NextResponse.json(
        {
          error:
            "AI is temporarily unavailable due to rate limits. Please try again in a few minutes.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}