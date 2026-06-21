"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "success" : "error");
  }

  return (
    <section
      id="contact"
      style={{
        padding: "112px 32px 80px",
        borderTop: "1px solid var(--border)",
        background:
          "radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.05) 0%, transparent 60%)",
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
        className="contact-grid"
      >
        {/* ── Left — Info ───────────────────── */}
        <div>
          <p className="section-label">Contact</p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Let&apos;s{" "}
            <span className="gradient-text">talk</span>
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "var(--text-muted)",
              lineHeight: 1.75,
              maxWidth: 380,
              marginBottom: 36,
            }}
          >
            Open to backend SDE roles and internships. If you&apos;re a
            recruiter or just want to chat about systems — reach out. I usually
            reply within 24h.
          </p>

          {/* Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Email", value: "your@email.com", href: "mailto:your@email.com" }, // ← update
              { label: "GitHub", value: "github.com/yourusername", href: "https://github.com/yourusername" }, // ← update
              { label: "LinkedIn", value: "linkedin.com/in/yourusername", href: "https://linkedin.com/in/yourusername" }, // ← update
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  textDecoration: "none",
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--cyan)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--cyan-dim)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-card)";
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "var(--cyan)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    minWidth: 56,
                  }}
                >
                  {link.label}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "var(--text-muted)",
                  }}
                >
                  {link.value} ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right — Form ──────────────────── */}
        <div
          className="glass"
          style={{ padding: 32 }}
        >
          {status === "success" ? (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "rgba(34,197,94,0.12)",
                  border: "1px solid rgba(34,197,94,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                ✓
              </div>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  color: "var(--green)",
                }}
              >
                Message sent
              </p>
              <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
                I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "var(--text-dim)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input"
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "var(--text-dim)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input"
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "var(--text-dim)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Hey Anshum, I'd like to..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input"
                  style={{ resize: "none" }}
                />
              </div>

              {status === "error" && (
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: "#f87171",
                    background: "rgba(248,113,113,0.08)",
                    border: "1px solid rgba(248,113,113,0.2)",
                    padding: "8px 12px",
                    borderRadius: 8,
                  }}
                >
                  Something went wrong. Try emailing directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "12px 24px",
                  fontSize: 14,
                  opacity: status === "loading" ? 0.6 : 1,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                }}
              >
                {status === "loading" ? "Sending..." : "Send message →"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          maxWidth: 1100,
          margin: "80px auto 0",
          paddingTop: 28,
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: "var(--text-dim)",
          }}
        >
          <span style={{ color: "var(--cyan)" }}>{">"}</span> anshum.dev
        </p>
        <p style={{ fontSize: 12, color: "var(--text-dim)" }}>
          Built with Next.js · MongoDB · Groq AI
        </p>
      </div>

      <style>{`
        .contact-grid {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 767px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }
      `}</style>
    </section>
  );
}