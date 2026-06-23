import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import ChatWidget from "@/components/chat/ChatWidget";
import Contact from "@/components/sections/Contact";
import { connectDB } from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import SkillGroup from "@/lib/models/Skill";

export default async function Home() {
  await connectDB();
  
  // Fetch dynamic content
  const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
  const skills = await SkillGroup.find({}).lean();

  // Convert MongoDB IDs to strings to pass to client components
  const serializedProjects = JSON.parse(JSON.stringify(projects));
  const serializedSkills = JSON.parse(JSON.stringify(skills));

  return (
    <main>
      <Hero />
      <About />
      <Skills initialSkills={serializedSkills} />
      <Projects initialProjects={serializedProjects} />
      <ChatWidget />
      <Contact />
    </main>
  );
}