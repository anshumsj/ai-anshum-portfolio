import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISkillGroup extends Document {
  category: string;
  icon: string;
  accent: string;
  items: string[];
}

const SkillGroupSchema = new Schema<ISkillGroup>({
  category: { type: String, required: true, unique: true },
  icon: { type: String, required: true },
  accent: { type: String, required: true },
  items: { type: [String], default: [] },
});

const SkillGroup: Model<ISkillGroup> =
  mongoose.models.SkillGroup || mongoose.model<ISkillGroup>("SkillGroup", SkillGroupSchema);

export default SkillGroup;
