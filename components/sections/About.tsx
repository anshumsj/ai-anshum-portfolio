const timeline = [
  { year: "2023", event: "Started B.Tech CSE at IIIT Bhagalpur" },
  { year: "2023", event: "Learned C++ and DSA fundamentals" },
  { year: "2024", event: "Built first backend projects with Node.js + Express" },
  { year: "2024", event: "Shipped Multi-Tenant Workspace Management System" },
  { year: "2025", event: "Building AI-powered portfolio + placement prep" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* Left */}
        <div>
          <p className="text-xs font-mono text-teal-700 mb-3 uppercase tracking-widest">
            About
          </p>
          <h2 className="text-3xl font-semibold mb-6 tracking-tight">
            The person behind the code
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            I&apos;m Anshum — a final-year Computer Science student at IIIT
            Bhagalpur, focused on backend systems. I care about code that
            actually holds up: clean architecture, predictable APIs, and
            knowing why every line is there.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            My primary stack is Node.js, Express, and MongoDB. I&apos;ve been
            deepening that with Redis, Docker, and system design concepts as
            placement season approaches.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Outside of code: competitive DSA on LeetCode, occasional ML
            experiments, and thinking about distributed systems more than is
            probably healthy.
          </p>
        </div>

        {/* Right — timeline */}
        <div>
          <p className="text-xs font-mono text-gray-400 mb-6 uppercase tracking-widest">
            Timeline
          </p>
          <div className="relative border-l border-gray-200 pl-6 space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="relative">
                <span className="absolute -left-[25px] top-1 w-2 h-2 rounded-full bg-teal-500" />
                <p className="text-xs font-mono text-teal-700 mb-1">
                  {item.year}
                </p>
                <p className="text-sm text-gray-700">{item.event}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}