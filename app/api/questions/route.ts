import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Question from "@/lib/models/Question";

import { isAuthed } from "@/lib/auth";

export async function GET(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  const questions = await Question.find({}).sort({ askedAt: -1 }).lean();
  return NextResponse.json({ questions });
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, answer } = await req.json();
  if (!id || !answer?.trim()) {
    return NextResponse.json({ error: "Missing id or answer" }, { status: 400 });
  }

  await connectDB();
  const updated = await Question.findByIdAndUpdate(
    id,
    { answer: answer.trim(), answered: true },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  return NextResponse.json({ question: updated });
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await connectDB();
  await Question.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
