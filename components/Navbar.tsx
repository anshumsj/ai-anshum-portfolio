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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${scrolled ? 'bg-[rgba(9,9,15,0.85)] border-b border-[rgba(255,255,255,0.08)]' : 'bg-[rgba(9,9,15,0.4)] border-b border-transparent'}`}
      >
        <div className="content-wrap-padded h-14 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-sm font-medium text-[var(--text)] no-underline tracking-tight"
          >
            <span className="text-[var(--cyan)]">{">"}</span> anshum.dev
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[13px] text-[var(--text-muted)] no-underline transition-colors hover:text-[var(--text)]"
              >
                {l.label}
              </a>
            ))}

            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="btn-primary text-xs px-4 py-1.5"
            >
              Resume ↗
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="flex md:hidden flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block w-[22px] h-[1.5px] bg-[var(--text-muted)] rounded-sm transition-all duration-200 ${
                  open && i === 0 ? "translate-y-[6.5px] rotate-45"
                  : open && i === 2 ? "-translate-y-[6.5px] -rotate-45"
                  : ""
                } ${open && i === 1 ? "opacity-0" : "opacity-100"}`}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-[var(--bg-card)] border-t border-[var(--border)] pt-4 px-8 pb-5 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-[var(--text-muted)] no-underline"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                setIsResumeModalOpen(true);
              }}
              className="text-[13px] text-[var(--cyan)] font-mono text-left bg-transparent border-none p-0 cursor-pointer"
            >
              Resume ↗
            </button>
          </div>
        )}
      </nav>

      <ResumeModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </>
  );
}