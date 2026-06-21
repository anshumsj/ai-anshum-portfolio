const timeline = [
  { year: "2023", event: "Started B.Tech CSE at IIIT Bhagalpur" },
  { year: "2023", event: "Learned C++ and DSA fundamentals" },
  { year: "2024", event: "Built first backend projects with Node.js + Express" },
  { year: "2024", event: "Shipped Multi-Tenant Workspace Management System" },
  { year: "2025", event: "Building AI-powered portfolio + placement prep" },
  // Add more milestones here
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: "112px 32px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "start",
        }}
        className="about-grid"
      >
        {/* ── Left ─────────────────────────── */}
        <div>
          <p className="section-label">About</p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 24,
            }}
          >
            The person
            <br />
            <span className="gradient-text">behind the code</span>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.75 }}>
              I&apos;m Anshum — a final-year Computer Science student at IIIT
              Bhagalpur, focused on backend systems. I care about code that
              actually holds up: clean architecture, predictable APIs, and
              knowing why every line is there.
            </p>
            <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.75 }}>
              My primary stack is Node.js, Express, and MongoDB. I&apos;ve been
              deepening that with Redis, Docker, and system design concepts as
              placement season approaches.
            </p>
            <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.75 }}>
              Outside of code: competitive DSA on LeetCode, occasional ML
              experiments, and thinking about distributed systems more than is
              probably healthy.
            </p>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: 32,
              marginTop: 36,
              paddingTop: 28,
              borderTop: "1px solid var(--border)",
            }}
          >
            {[
              { value: "2+", label: "Years coding" },
              { value: "5+", label: "Projects shipped" },
              { value: "300+", label: "LeetCode solved" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--text-dim)",
                    fontFamily: "'JetBrains Mono', monospace",
                    marginTop: 2,
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — Timeline ──────────────── */}
        <div>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "var(--text-dim)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Timeline
          </p>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 1,
                background: "linear-gradient(to bottom, var(--cyan), var(--violet), transparent)",
                opacity: 0.3,
              }}
            />

            <div style={{ paddingLeft: 28, display: "flex", flexDirection: "column", gap: 28 }}>
              {timeline.map((item, i) => (
                <div key={i} style={{ position: "relative" }}>
                  {/* Dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: -32,
                      top: 4,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                      boxShadow: "0 0 8px rgba(6,182,212,0.5)",
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "var(--cyan)",
                      marginBottom: 4,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.year}
                  </p>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5 }}>
                    {item.event}
                  </p>
                </div>
              ))}

              {/* Placeholder for future entries */}
              <div style={{ position: "relative", opacity: 0.35 }}>
                <div
                  style={{
                    position: "absolute",
                    left: -32,
                    top: 4,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    border: "1px dashed var(--cyan)",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "var(--text-dim)",
                    marginBottom: 4,
                  }}
                >
                  2025 →
                </p>
                <p style={{ fontSize: 14, color: "var(--text-dim)", fontStyle: "italic" }}>
                  Next chapter loading...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 767px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  );
}