export interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string | null;
  live?: string | null;
  highlight: boolean;
  createdAt?: string;
}

export interface SkillGroup {
  _id: string;
  category: string;
  icon: string;
  accent: string;
  items: string[];
}

export interface Question {
  _id: string;
  question: string;
  answer?: string | null;
  answered?: boolean;
  askedAt: string;
}
