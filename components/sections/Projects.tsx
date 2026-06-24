"use client";

import { Project } from "@/types";

export default function Projects({ initialProjects = [] }: { initialProjects?: Project[] }) {
  const featuredProjects = initialProjects.filter((p) => p.highlight).slice(0, 3);
  const otherProjects = initialProjects.filter((p) => !p.highlight);

  return (
    <section
      id="projects"
      className="py-28 px-8 border-t border-[var(--border)]"
      style={{
        background: "radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.04) 0%, transparent 60%)",
      }}
    >
      <div className="content-wrap">
        <p className="section-label">Projects</p>
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight leading-tight">
            Things I&apos;ve built
          </h2>
          <a
            href="https://github.com/anshumsj"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs px-4 py-2"
          >
            All on GitHub ↗
          </a>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-16">
          {featuredProjects.map((project) => (
            <div
              key={project._id || project.title}
              className="glass p-6 flex flex-col justify-between gap-5 relative overflow-hidden transition-all duration-200 border border-[rgba(6,182,212,0.3)] shadow-[0_0_32px_rgba(6,182,212,0.08)]"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(6,182,212,0.55)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(6,182,212,0.3)";
              }}
            >
              {/* Featured glow blob */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)" }}
              />

              {/* Top section */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] text-[var(--cyan)] border border-[rgba(6,182,212,0.35)] bg-[var(--cyan-dim)] px-2.5 py-0.5 rounded-full tracking-[0.06em] uppercase">
                    featured
                  </span>
                </div>

                <h3 className="text-[15px] font-semibold text-[var(--text)] leading-snug mb-2.5 tracking-tight">
                  {project.title}
                </h3>
                <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Bottom section */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-3.5 border-t border-[var(--border)]">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[var(--text-dim)] no-underline transition-colors hover:text-[var(--text)]"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-[var(--cyan)] no-underline transition-colors hover:text-[var(--text)]"
                    >
                      Live ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects List */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="font-mono text-xs text-[var(--text-dim)] tracking-widest uppercase mb-6">
              Other Projects to look for
            </h3>
            <div className="flex flex-col gap-3">
              {otherProjects.map((project) => (
                <div
                  key={project._id || project.title}
                  className="flex items-center justify-between px-6 py-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl"
                >
                  <h4 className="text-sm font-medium text-[var(--text)]">
                    {project.title}
                  </h4>
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[var(--text-dim)] no-underline hover:text-[var(--text)]"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[var(--cyan)] no-underline hover:text-[var(--text)]"
                      >
                        Live ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}