"use client";

import { SkillGroup } from "@/types";

export default function Skills({ initialSkills = [] }: { initialSkills?: SkillGroup[] }) {
  return (
    <section
      id="skills"
      className="py-28 px-8 border-t border-[var(--border)]"
      style={{
        background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.05) 0%, transparent 60%)",
      }}
    >
      <div className="content-wrap">
        <p className="section-label">Skills</p>
        <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight leading-tight mb-14">
          What I work with
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {initialSkills.map((group) => (
            <div
              key={group.category}
              className="glass p-6 cursor-default transition-all duration-200 border border-[var(--border)]"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = group.accent;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border)]">
                <span className="text-base">{group.icon}</span>
                <p
                  className="font-mono text-[11px] font-medium tracking-widest uppercase"
                  style={{ color: group.accent }}
                >
                  {group.category}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.items.map((skill: string) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}