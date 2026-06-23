import mongoose from "mongoose";
import { connectDB } from "./mongodb";
import Question from "./models/Question";
import Project from "./models/Project";
import SkillGroup from "./models/Skill";

const seedQuestions = [
  {
    question: "Tell me about yourself",
    answer:
      "I'm Anshum, a passionate full-stack developer who loves building elegant, performant web applications. I specialize in React, Next.js, Node.js, and modern web technologies. I enjoy solving complex problems and turning ideas into polished digital experiences.",
    answered: true,
  },
  {
    question: "What are your skills?",
    answer:
      "My core skills include: Frontend — React, Next.js, TypeScript, Tailwind CSS; Backend — Node.js, Express, MongoDB, REST APIs; Tools — Git, Docker, Vercel, Figma. I'm always learning and exploring new technologies.",
    answered: true,
  },
  {
    question: "What projects have you built?",
    answer:
      "I've built several projects including AI-powered apps, full-stack web platforms, and this portfolio itself — which features an AI chatbot powered by Groq! Check out my projects section for more details.",
    answered: true,
  },
  {
    question: "How can I contact you?",
    answer:
      "You can reach me via the contact form on this site, or email me directly. I'm also active on GitHub and LinkedIn — links are in the footer!",
    answered: true,
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "Yes! I'm open to freelance projects and full-time opportunities. Feel free to reach out through the contact form and let's discuss your project.",
    answered: true,
  },
  {
    question: "What is your educational background?",
    answer:
      "I have a strong foundation in computer science and software engineering. My learning has been a mix of formal education and self-driven projects, hackathons, and open-source contributions.",
    answered: true,
  },
  {
    question: "What technologies does this portfolio use?",
    answer:
      "This portfolio is built with Next.js 15, TypeScript, MongoDB for data storage, Groq API for AI responses, and Nodemailer for the contact form. It's deployed on Vercel.",
    answered: true,
  },
];

const seedProjects = [
  {
    title: "Multi-Tenant Workspace Management System",
    description:
      "A backend system supporting multiple isolated workspaces, each with projects, tasks, and role-based access. Built with a focus on clean architecture and consistent API design.",
    tags: ["Node.js", "Express", "MongoDB", "JWT", "Docker"],
    github: "https://github.com/anshumsj/workspace-management", // Using Anshum's username
    live: null,
    highlight: true,
  },
  {
    title: "AI Portfolio — this site",
    description:
      "A Next.js portfolio with a self-evolving AI chatbot. Unanswered questions are saved to a knowledge base and answered through an admin dashboard — making the AI smarter over time.",
    tags: ["Next.js", "MongoDB", "Groq AI", "Tailwind"],
    github: "https://github.com/anshumsj/ai-portfolio",
    live: null,
    highlight: true, // We make top 3 highlighted
  },
  {
    title: "Blog Backend API",
    description:
      "RESTful API for a blogging platform with auth, post management, and comment threading. First production-style backend project.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/anshumsj/blog-backend",
    live: null,
    highlight: true,
  },
];

const seedSkills = [
  {
    category: "Backend",
    icon: "⚙️",
    accent: "var(--cyan)",
    items: ["Node.js", "Express", "REST APIs", "JWT Auth", "Mongoose"],
  },
  {
    category: "Database",
    icon: "🗄️",
    accent: "var(--violet)",
    items: ["MongoDB", "Redis", "MongoDB Atlas", "Indexing"],
  },
  {
    category: "DevOps",
    icon: "🐳",
    accent: "var(--cyan)",
    items: ["Docker", "Docker Compose", "Railway", "Render", "Vercel"],
  },
  {
    category: "Frontend",
    icon: "🎨",
    accent: "var(--violet)",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Languages",
    icon: "💻",
    accent: "var(--cyan)",
    items: ["JavaScript", "TypeScript", "Python", "C++"],
  },
  {
    category: "Tools",
    icon: "🛠",
    accent: "var(--violet)",
    items: ["Git", "GitHub", "Postman", "VS Code"],
  },
];

async function seed() {
  console.log("🌱 Connecting to MongoDB...");
  await connectDB();

  console.log("🗑️  Clearing existing data...");
  await Question.deleteMany({});
  await Project.deleteMany({});
  await SkillGroup.deleteMany({});

  console.log("📥 Inserting seed data...");
  const insertedQs = await Question.insertMany(seedQuestions);
  const insertedPs = await Project.insertMany(seedProjects);
  const insertedSs = await SkillGroup.insertMany(seedSkills);

  console.log(`✅ Successfully seeded ${insertedQs.length} questions, ${insertedPs.length} projects, and ${insertedSs.length} skill groups!`);
  await mongoose.disconnect();
  console.log("🔌 Disconnected from MongoDB.");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
