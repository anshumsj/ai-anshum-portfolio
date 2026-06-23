"use client";

import { useState } from "react";

export default function Projects({ initialProjects = [] }: { initialProjects?: any[] }) {
  const featuredProjects = initialProjects.filter((p) => p.highlight).slice(0, 3);
  const otherProjects = initialProjects.filter((p) => !p.highlight);

  return (
    <section
      id="projects"
      style={{
        padding: "112px 32px",
        borderTop: "1px solid var(--border)",
        background:
          "radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.04) 0%, transparent 60%)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p className="section-label">Projects</p>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 56,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Things I&apos;ve built
          </h2>
          <a
            href="https://github.com/anshumsj"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ fontSize: 12, padding: "7px 16px" }}
          >
            All on GitHub ↗
          </a>
        </div>

        {/* Featured Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
            marginBottom: 64,
          }}
          className="projects-grid"
        >
          {featuredProjects.map((project) => (
            <div
              key={project._id || project.title}
              className="glass"
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 20,
                borderColor: "rgba(6,182,212,0.3)",
                boxShadow: "0 0 32px rgba(6,182,212,0.08)",
                transition: "border-color 0.2s, transform 0.2s",
                position: "relative",
                overflow: "hidden",
              }}
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
                style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Top section */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: "var(--cyan)",
                      border: "1px solid rgba(6,182,212,0.35)",
                      background: "var(--cyan-dim)",
                      padding: "2px 9px",
                      borderRadius: 100,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    featured
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "var(--text)",
                    lineHeight: 1.4,
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "var(--text-muted)",
                    lineHeight: 1.65,
                  }}
                >
                  {project.description}
                </p>
              </div>

              {/* Bottom section */}
              <div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    marginBottom: 16,
                  }}
                >
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    paddingTop: 14,
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12,
                        color: "var(--text-dim)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--text)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--text-dim)")
                      }
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 12,
                        color: "var(--cyan)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--text)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--cyan)")
                      }
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
            <h3
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "var(--text-dim)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              Other Projects to look for
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {otherProjects.map((project) => (
                <div
                  key={project._id || project.title}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 24px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                  }}
                >
                  <h4 style={{ fontSize: 14, fontWeight: 500, color: "var(--text)" }}>
                    {project.title}
                  </h4>
                  <div style={{ display: "flex", gap: 16 }}>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 12,
                          color: "var(--text-dim)",
                          textDecoration: "none",
                        }}
                      >
                        GitHub ↗
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 12,
                          color: "var(--cyan)",
                          textDecoration: "none",
                        }}
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

      <style>{`
        .projects-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .projects-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}