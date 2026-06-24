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
      className="pt-28 px-8 pb-20 border-t border-[var(--border)]"
      style={{
        background: "radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.05) 0%, transparent 60%)",
      }}
    >
      <div className="content-wrap grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* ── Left — Info ───────────────────── */}
        <div>
          <p className="section-label">Contact</p>
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight leading-tight mb-5">
            Let&apos;s{" "}
            <span className="gradient-text">talk</span>
          </h2>
          <p className="text-[15px] text-[var(--text-muted)] leading-relaxed max-w-[380px] mb-9">
            Open to backend SDE roles and internships. If you&apos;re a recruiter or just want to chat about systems — reach out. I usually reply within 24h.
          </p>

          {/* Links */}
          <div className="flex flex-col gap-3.5">
          {[
              { label: "Email",    value: "anshumawasthiloveindia@gmail.com", href: "mailto:anshumawasthiloveindia@gmail.com" },
              { label: "GitHub",   value: "github.com/anshumsj",              href: "https://github.com/anshumsj" },
              { label: "LinkedIn", value: "linkedin.com/in/anshum-awasthi",   href: "https://www.linkedin.com/in/anshum-awasthi-366754201/" },
              { label: "LeetCode", value: "leetcode.com/anshum12",            href: "https://leetcode.com/u/anshum12/" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center gap-3 no-underline px-4 py-3 rounded-[10px] border border-[var(--border)] bg-[var(--bg-card)] transition-colors duration-200 hover:border-[var(--cyan)] hover:bg-[var(--cyan-dim)] group"
              >
                <span className="font-mono text-[10px] text-[var(--cyan)] tracking-widest uppercase min-w-[56px]">
                  {link.label}
                </span>
                <span className="text-[13px] font-mono text-[var(--text-muted)] group-hover:text-[var(--text)]">
                  {link.value} ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right — Form ──────────────────── */}
        <div className="glass p-8">
          {status === "success" ? (
            <div className="text-center py-12 px-6 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.3)] flex items-center justify-center text-[22px] text-green-500">
                ✓
              </div>
              <p className="font-mono text-[13px] text-[var(--green)]">
                Message sent
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block font-mono text-[11px] text-[var(--text-dim)] tracking-widest uppercase mb-2">
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
                <label className="block font-mono text-[11px] text-[var(--text-dim)] tracking-widest uppercase mb-2">
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
                <label className="block font-mono text-[11px] text-[var(--text-dim)] tracking-widest uppercase mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Hey Anshum, I'd like to..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="input resize-none"
                />
              </div>

              {status === "error" && (
                <p className="font-mono text-[12px] text-red-400 bg-red-400/10 border border-red-400/20 px-3 py-2 rounded-lg">
                  Something went wrong. Try emailing directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className={`btn-primary w-full justify-center px-6 py-3 text-sm ${status === "loading" ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {status === "loading" ? "Sending..." : "Send message →"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="content-wrap mt-20 pt-7 border-t border-[var(--border)] flex justify-between items-center flex-wrap gap-3">
        <p className="font-mono text-[12px] text-[var(--text-dim)]">
          <span className="text-[var(--cyan)]">{">"}</span> anshum.dev
        </p>
        <div className="flex gap-5 items-center">
          {[
            { label: "GitHub",   href: "https://github.com/anshumsj" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/anshum-awasthi-366754201/" },
            { label: "LeetCode", href: "https://leetcode.com/u/anshum12/" },
            { label: "Email",    href: "mailto:anshumawasthiloveindia@gmail.com" },
            { label: "Admin",    href: "/admin" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-[var(--text-dim)] no-underline transition-colors duration-200 hover:text-[var(--cyan)]"
            >
              {s.label} ↗
            </a>
          ))}
        </div>
        <p className="text-[12px] text-[var(--text-dim)]">
          Built with Next.js · MongoDB · Groq AI
        </p>
      </div>
    </section>
  );
}