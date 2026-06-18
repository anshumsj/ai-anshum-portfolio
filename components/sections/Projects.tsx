const projects = [
  {
    title: "Multi-Tenant Workspace Management System",
    description:
      "A backend system supporting multiple isolated workspaces, each with projects, tasks, and role-based access. Built with a focus on clean architecture and consistent API design.",
    tags: ["Node.js", "Express", "MongoDB", "JWT", "Docker"],
    github: "https://github.com/yourusername/workspace-management",
    live: null,
    highlight: true,
  },
  {
    title: "AI Portfolio — this site",
    description:
      "A Next.js portfolio with a self-evolving AI chatbot. Unanswered recruiter questions are saved to a knowledge base and answered through an admin dashboard — making the AI smarter over time.",
    tags: ["Next.js", "MongoDB", "OpenAI API", "Tailwind"],
    github: "https://github.com/yourusername/ai-portfolio",
    live: "https://yourdomain.vercel.app",
    highlight: false,
  },
  {
    title: "Blog Backend API",
    description:
      "RESTful API for a blogging platform with auth, post management, and comment threading. First production-style backend project.",
    tags: ["Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/yourusername/blog-backend",
    live: null,
    highlight: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        <p className="text-xs font-mono text-teal-700 mb-3 uppercase tracking-widest">
          Projects
        </p>
        <h2 className="text-3xl font-semibold mb-12 tracking-tight">
          Things I&apos;ve built
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`rounded-xl border bg-white p-6 flex flex-col justify-between gap-4 ${
                project.highlight
                  ? "border-teal-300 ring-1 ring-teal-100"
                  : "border-gray-200"
              }`}
            >
              <div>
                {project.highlight && (
                  <span className="inline-block text-xs font-mono bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-md mb-3">
                    featured
                  </span>
                )}
                <h3 className="text-sm font-semibold mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.github && (
                    
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-gray-600 hover:text-gray-900 transition underline underline-offset-2"
                      >
                        GitHub ↗
                    </a>
                  )}
                  {project.live && (
                    
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-teal-700 hover:text-teal-900 transition underline underline-offset-2"
                      >
                        Live ↗
                      </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}