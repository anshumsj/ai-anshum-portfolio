"use client";

import { useEffect, useState } from "react";

const roles = [
  "Backend Developer",
  "Systems Builder",
  "API Architect",
  "DSA Enthusiast",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const target = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "80px 32px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 64,
          alignItems: "center",
          width: "100%",
        }}
        className="hero-grid"
      >
        {/* ── Left ─────────────────────────────── */}
        <div className="animate-fade-up">
          {/* Status badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(34,197,94,0.25)",
              background: "rgba(34,197,94,0.06)",
              borderRadius: 100,
              padding: "5px 14px",
              marginBottom: 28,
            }}
          >
            <span
              className="pulse-dot"
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--green)",
                display: "block",
              }}
            />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "var(--green)",
                letterSpacing: "0.06em",
              }}
            >
              open to opportunities
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 68px)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 16,
            }}
          >
            Anshum
            <br />
            <span className="gradient-text">Awasthi</span>
          </h1>

          {/* Typewriter */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              color: "var(--cyan)",
              marginBottom: 20,
              minHeight: 24,
            }}
          >
            {displayed}
            <span className="cursor-blink" style={{ marginLeft: 1, color: "var(--cyan)" }}>|</span>
          </div>

          {/* Description */}
          <p
            style={{
              fontSize: 16,
              color: "var(--text-muted)",
              lineHeight: 1.7,
              maxWidth: 420,
              marginBottom: 36,
            }}
          >
            Building backend systems that scale — and an AI that answers for me
            when I&apos;m not around.{" "}
            <span style={{ color: "var(--text-dim)", fontFamily: "monospace", fontSize: 13 }}>
              B.Tech CSE · IIIT Bhagalpur
            </span>
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#ai-anshum" className="btn-secondary">
              Ask AI Anshum ✦
            </a>
          </div>

          {/* Socials row */}
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 40,
              paddingTop: 28,
              borderTop: "1px solid var(--border)",
            }}
          >
            {[
              { label: "GitHub", href: "https://github.com/anshumsj" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/anshum-awasthi-366754201/" },
              { label: "LeetCode", href: "https://leetcode.com/u/anshum12/" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "var(--text-dim)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* ── Right — Chat preview card ─────────── */}
        <div
          className="glass glow-cyan animate-fade-up animate-delay-2"
          style={{ padding: 24, position: "relative", overflow: "hidden" }}
        >
          {/* Decorative glow blob */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Card header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              paddingBottom: 16,
              marginBottom: 16,
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "monospace",
              }}
            >
              AI
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                AI Anshum
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: "var(--text-dim)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                trained on his actual experience
              </p>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <span
                className="pulse-dot"
                style={{
                  display: "block",
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--green)",
                }}
              />
            </div>
          </div>

          {/* Chat bubbles */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px 12px 2px 12px",
                  padding: "9px 14px",
                  fontSize: 13,
                  color: "var(--text)",
                  maxWidth: "80%",
                }}
              >
                What&apos;s your biggest strength?
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-start", gap: 8 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              />
              <div
                style={{
                  background: "var(--cyan-dim)",
                  border: "1px solid var(--border-hi)",
                  borderRadius: "12px 12px 12px 2px",
                  padding: "9px 14px",
                  fontSize: 13,
                  color: "var(--text)",
                  maxWidth: "80%",
                  lineHeight: 1.5,
                }}
              >
                I ship backend systems that don&apos;t fall apart — clean architecture,
                solid APIs, and understanding the why behind every design decision.
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px 12px 2px 12px",
                  padding: "9px 14px",
                  fontSize: 13,
                  color: "var(--text)",
                  maxWidth: "80%",
                }}
              >
                Are you open to internships?
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-start", gap: 8 }}>
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              />
              <div
                style={{
                  background: "var(--cyan-dim)",
                  border: "1px solid var(--border-hi)",
                  borderRadius: "12px 12px 12px 2px",
                  padding: "9px 14px",
                  fontSize: 13,
                  color: "var(--text)",
                  maxWidth: "80%",
                  lineHeight: 1.5,
                }}
              >
                Absolutely — reach out via the contact form and let&apos;s talk.
              </div>
            </div>
          </div>

          {/* Disabled input preview */}
          <div
            style={{
              display: "flex",
              gap: 8,
              background: "var(--bg-subtle)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "8px 12px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: 12,
                color: "var(--text-dim)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Ask me anything about Anshum...
            </span>
            <div
              style={{
                background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                borderRadius: 6,
                padding: "4px 10px",
                fontSize: 11,
                color: "#fff",
                fontWeight: 600,
              }}
            >
              Ask
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}