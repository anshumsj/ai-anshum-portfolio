const timeline = [
  { year: "2023", event: "Started B.Tech CSE at IIIT Bhagalpur" },
  { year: "2023", event: "Learned C++ and DSA fundamentals" },
  { year: "2024", event: "Built first backend projects with Node.js + Express" },
  { year: "2024", event: "Shipped Multi-Tenant Workspace Management System" },
  { year: "2025", event: "Building AI-powered portfolio + placement prep" },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-8 border-t border-[var(--border)]">
      <div className="content-wrap grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* ── Left ─────────────────────────── */}
        <div>
          <p className="section-label">About</p>
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight leading-tight mb-6">
            The person<br /><span className="gradient-text">behind the code</span>
          </h2>

          <div className="flex flex-col gap-4">
            <p className="text-[15px] text-[var(--text-muted)] leading-relaxed">
              I&apos;m Anshum — a final-year Computer Science student at IIIT Bhagalpur, focused on backend systems. I care about code that actually holds up: clean architecture, predictable APIs, and knowing why every line is there.
            </p>
            <p className="text-[15px] text-[var(--text-muted)] leading-relaxed">
              My primary stack is Node.js, Express, and MongoDB. I&apos;ve been deepening that with Redis, Docker, and system design concepts as placement season approaches.
            </p>
            <p className="text-[15px] text-[var(--text-muted)] leading-relaxed">
              Outside of code: competitive DSA on LeetCode, occasional ML experiments, and thinking about distributed systems more than is probably healthy.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 mt-9 pt-7 border-t border-[var(--border)]">
            {[
              { value: "2+", label: "Years coding" },
              { value: "5+", label: "Projects shipped" },
              { value: "300+", label: "LeetCode solved" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold tracking-tight bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] text-transparent bg-clip-text">
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--text-dim)] font-mono mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — Timeline ──────────────── */}
        <div>
          <p className="font-mono text-[11px] text-[var(--text-dim)] tracking-widest uppercase mb-7">
            Timeline
          </p>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--cyan)] via-[var(--violet)] to-transparent opacity-30" />
            <div className="pl-7 flex flex-col gap-7">
              {timeline.map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[32px] top-1 w-2 h-2 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                  <p className="font-mono text-[11px] text-[var(--cyan)] mb-1 tracking-wide">
                    {item.year}
                  </p>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    {item.event}
                  </p>
                </div>
              ))}
              <div className="relative opacity-35">
                <div className="absolute -left-[32px] top-1 w-2 h-2 rounded-full border border-dashed border-[var(--cyan)]" />
                <p className="font-mono text-[11px] text-[var(--text-dim)] mb-1">
                  2025 →
                </p>
                <p className="text-sm text-[var(--text-dim)] italic">
                  Next chapter loading...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}