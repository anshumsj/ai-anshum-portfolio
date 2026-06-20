import mongoose from "mongoose";
import { connectDB } from "./mongodb";
import Question from "./models/Question";

const seedData = [
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

async function seed() {
  console.log("🌱 Connecting to MongoDB...");
  await connectDB();

  console.log("🗑️  Clearing existing questions...");
  await Question.deleteMany({});

  console.log("📥 Inserting seed data...");
  const inserted = await Question.insertMany(seedData);

  console.log(`✅ Successfully seeded ${inserted.length} questions!`);
  await mongoose.disconnect();
  console.log("🔌 Disconnected from MongoDB.");
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
