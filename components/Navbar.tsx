"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ResumeModal from "./ResumeModal";

const links = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "AI Anshum",  href: "#ai-anshum" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.3s, border-color 0.3s",
          background: scrolled
            ? "rgba(9,9,15,0.85)"
            : "rgba(9,9,15,0.4)",
          backdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 32px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--text)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ color: "var(--cyan)" }}>{">"}</span> anshum.dev
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}
               className="hidden-mobile">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontSize: 13,
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {l.label}
              </a>
            ))}

            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="btn-primary"
              style={{ padding: "7px 16px", fontSize: 12 }}
            >
              Resume ↗
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="show-mobile"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 4,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 1.5,
                  background: "var(--text-muted)",
                  borderRadius: 2,
                  transition: "transform 0.2s, opacity 0.2s",
                  transform:
                    open && i === 0 ? "translateY(6.5px) rotate(45deg)"
                    : open && i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                    : "none",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            style={{
              background: "var(--bg-card)",
              borderTop: "1px solid var(--border)",
              padding: "16px 32px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  fontSize: 14,
                  color: "var(--text-muted)",
                  textDecoration: "none",
                }}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                setIsResumeModalOpen(true);
              }}
              style={{
                fontSize: 13,
                color: "var(--cyan)",
                fontFamily: "'JetBrains Mono', monospace",
                textDecoration: "none",
                background: "none",
                border: "none",
                padding: 0,
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              Resume ↗
            </button>
          </div>
        )}

        <style>{`
          @media (min-width: 768px) {
            .hidden-mobile { display: flex !important; }
            .show-mobile   { display: none !important; }
          }
          @media (max-width: 767px) {
            .hidden-mobile { display: none !important; }
            .show-mobile   { display: flex !important; }
          }
        `}</style>
      </nav>

      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </>
  );
}