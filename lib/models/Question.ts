import mongoose, { Schema, Document } from "mongoose";

export interface IQuestion extends Document {
  question: string;
  answer: string | null;
  answered: boolean;
  askedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  answer: { type: String, default: null },
  answered: { type: Boolean, default: false },
  askedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", QuestionSchema);