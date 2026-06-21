"use client";

const skills = [
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

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: "112px 32px",
        borderTop: "1px solid var(--border)",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.05) 0%, transparent 60%)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p className="section-label">Skills</p>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: 56,
          }}
        >
          What I work with
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
          className="skills-grid"
        >
          {skills.map((group) => (
            <div
              key={group.category}
              className="glass"
              style={{
                padding: "22px 24px",
                cursor: "default",
                transition: "border-color 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = group.accent;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                  paddingBottom: 14,
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: 16 }}>{group.icon}</span>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: group.accent,
                  }}
                >
                  {group.category}
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {group.items.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}