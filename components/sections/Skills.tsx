const skills = [
  {
    category: "Backend",
    items: ["Node.js", "Express", "REST APIs", "JWT Auth", "Mongoose"],
  },
  {
    category: "Database",
    items: ["MongoDB", "Redis", "MongoDB Atlas", "Indexing"],
  },
  {
    category: "DevOps",
    items: ["Docker", "Docker Compose", "Railway", "Render", "Vercel"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS"],
  },
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "C++"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Postman", "VS Code"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">

        <p className="text-xs font-mono text-teal-700 mb-3 uppercase tracking-widest">
          Skills
        </p>
        <h2 className="text-3xl font-semibold mb-12 tracking-tight">
          What I work with
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((group) => (
            <div
              key={group.category}
              className="border border-gray-200 rounded-xl p-5 bg-white"
            >
              <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono bg-gray-50 border border-gray-200 text-gray-700 px-2.5 py-1 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}