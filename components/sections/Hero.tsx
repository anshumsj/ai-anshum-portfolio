export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 md:px-12 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto w-full">
        {/* Left column */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1 text-xs font-mono text-gray-600 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            open to opportunities
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
            Anshum Awasthi
          </h1>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
            Backend developer building systems that scale — and an AI that
            answers for me when I&apos;m not around.
          </p>

          <div className="flex gap-3">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
            >
              View Projects
            </a>

            <a
              href="#ai-anshum"
              className="px-5 py-2.5 rounded-lg border border-teal-600 text-teal-700 text-sm font-medium hover:bg-teal-50 transition"
            >
              Ask AI Anshum
            </a>
          </div>
        </div>

        {/* Right column - chat preview */}
        <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
          <div className="flex items-center gap-2 pb-3 mb-3 border-b border-gray-100">
            <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center text-xs font-medium text-teal-700">
              AI
            </div>

            <div>
              <p className="text-sm font-medium">AI Anshum</p>
              <p className="text-xs font-mono text-gray-400">
                trained on his actual experience
              </p>
            </div>
          </div>

          <div className="flex justify-end mb-2">
            <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm max-w-[80%]">
              What&apos;s your biggest weakness?
            </div>
          </div>

          <div className="flex justify-start mb-3">
            <div className="bg-teal-50 text-teal-900 rounded-lg px-3 py-2 text-sm max-w-[85%] leading-relaxed">
              I don&apos;t know that about Anshum yet — I&apos;ve saved your
              question. He&apos;ll answer it, and I&apos;ll remember it for next
              time.
            </div>
          </div>

          <input
            type="text"
            placeholder="Ask me anything about Anshum..."
            disabled
            className="w-full text-xs font-mono border border-gray-200 rounded-lg px-3 py-2 text-gray-400 cursor-not-allowed"
          />
        </div>
      </div>
    </section>
  );
}