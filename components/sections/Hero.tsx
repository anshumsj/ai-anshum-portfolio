"use client";
// Force HMR 


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
    <section className="min-h-screen flex items-center py-20 px-8">
      <div className="content-wrap grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
        {/* ── Left ─────────────────────────────── */}
        <div className="animate-fade-up">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.06)] rounded-full px-3.5 py-1.5 mb-7">
            <span className="pulse-dot block w-[7px] h-[7px] rounded-full bg-[var(--green)]" />
            <span className="font-mono text-[11px] text-[var(--green)] tracking-[0.06em]">
              open to opportunities
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[clamp(40px,6vw,68px)] font-bold leading-[1.05] tracking-tight mb-4">
            Anshum
            <br />
            <span className="gradient-text">Awasthi</span>
          </h1>

          {/* Typewriter */}
          <div className="font-mono text-[15px] text-[var(--cyan)] mb-5 min-h-[24px]">
            {displayed}
            <span className="cursor-blink ml-px text-[var(--cyan)]">|</span>
          </div>

          {/* Description */}
          <p className="text-base text-[var(--text-muted)] leading-[1.7] max-w-[420px] mb-9">
            Building backend systems that scale — and an AI that answers for me
            when I&apos;m not around.{" "}
            <span className="text-[var(--text-dim)] font-mono text-[13px]">
              B.Tech CSE · IIIT Bhagalpur
            </span>
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap">
            <a href="#projects" className="btn-primary">
              View Projects
            </a>
            <a href="#ai-anshum" className="btn-secondary">
              Ask AI Anshum ✦
            </a>
          </div>

          {/* Socials row */}
          <div className="flex gap-5 mt-10 pt-7 border-t border-[var(--border)]">
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
                className="font-mono text-[12px] text-[var(--text-dim)] no-underline transition-colors duration-200 hover:text-[var(--cyan)]"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        {/* ── Right — Chat preview card ─────────── */}
        <div className="glass glow-cyan animate-fade-up animate-delay-2 p-6 relative overflow-hidden">
          {/* Decorative glow blob */}
          <div
            className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)" }}
          />

          {/* Card header */}
          <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[var(--border)]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] flex items-center justify-center text-[11px] font-bold text-white font-mono">
              AI
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[var(--text)]">
                AI Anshum
              </p>
              <p className="text-[11px] text-[var(--text-dim)] font-mono">
                trained on his actual experience
              </p>
            </div>
            <div className="ml-auto">
              <span className="pulse-dot block w-[7px] h-[7px] rounded-full bg-[var(--green)]" />
            </div>
          </div>

          {/* Chat bubbles */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex justify-end">
              <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[12px_12px_2px_12px] px-3.5 py-2.5 text-[13px] text-[var(--text)] max-w-[80%]">
                What&apos;s your biggest strength?
              </div>
            </div>

            <div className="flex justify-start gap-2">
              <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] shrink-0 mt-0.5" />
              <div className="bg-[var(--cyan-dim)] border border-[var(--border-hi)] rounded-[12px_12px_12px_2px] px-3.5 py-2.5 text-[13px] text-[var(--text)] max-w-[80%] leading-relaxed">
                I ship backend systems that don&apos;t fall apart — clean architecture,
                solid APIs, and understanding the why behind every design decision.
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[12px_12px_2px_12px] px-3.5 py-2.5 text-[13px] text-[var(--text)] max-w-[80%]">
                Are you open to internships?
              </div>
            </div>

            <div className="flex justify-start gap-2">
              <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] shrink-0 mt-0.5" />
              <div className="bg-[var(--cyan-dim)] border border-[var(--border-hi)] rounded-[12px_12px_12px_2px] px-3.5 py-2.5 text-[13px] text-[var(--text)] max-w-[80%] leading-relaxed">
                Absolutely — reach out via the contact form and let&apos;s talk.
              </div>
            </div>
          </div>

          {/* Disabled input preview */}
          <div className="flex gap-2 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-lg px-3 py-2 items-center">
            <span className="flex-1 text-[12px] text-[var(--text-dim)] font-mono">
              Ask me anything about Anshum...
            </span>
            <div className="bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] rounded-md px-2.5 py-1 text-[11px] text-white font-semibold">
              Ask
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}