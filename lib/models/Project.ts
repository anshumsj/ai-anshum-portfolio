import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  tags: string[];
  github?: string | null;
  live?: string | null;
  highlight: boolean;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  github: { type: String, default: null },
  live: { type: String, default: null },
  highlight: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
