"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        "Hi! I'm AI Anshum. Ask me anything about Anshum's skills, projects, or experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: data.answer || data.error || "Something went wrong. Try again.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="ai-anshum"
      className="py-28 px-8 border-t border-[var(--border)]"
      style={{
        background: "radial-gradient(ellipse at 50% 100%, rgba(6,182,212,0.05) 0%, transparent 60%)",
      }}
    >
      <div className="content-wrap">
        <p className="section-label">AI Anshum</p>
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold tracking-tight leading-tight mb-2.5">
              Ask me{" "}
              <span className="gradient-text">anything</span>
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Can&apos;t find what you&apos;re looking for? Just ask — unanswered questions
              get saved and Anshum will answer them soon.
            </p>
          </div>
        </div>

        <div className="chat-wrap border border-[var(--border-hi)] rounded-2xl bg-[var(--bg-card)] overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.07)]">
          {/* Header */}
          <div className="flex items-center gap-2.5 px-4.5 py-3.5 border-b border-[var(--border)] bg-[var(--bg-subtle)]">
            <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] flex items-center justify-center text-[11px] font-bold text-white font-mono shrink-0">
              AI
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[var(--text)]">
                AI Anshum
              </p>
              <p className="text-[10px] text-[var(--text-dim)] font-mono">
                powered by Groq · llama-3.3-70b
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="pulse-dot block w-1.5 h-1.5 rounded-full bg-[var(--green)]" />
              <span className="font-mono text-[10px] text-[var(--green)]">
                online
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[340px] overflow-y-auto px-4.5 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "ai" && (
                  <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] shrink-0 mt-0.5" />
                )}
                <div
                  className={`px-3.5 py-2.5 text-[13px] leading-[1.6] max-w-[80%] text-[var(--text)] ${
                    msg.role === "user"
                      ? "rounded-[12px_12px_2px_12px] bg-[var(--bg-subtle)] border border-[var(--border)]"
                      : "rounded-[12px_12px_12px_2px] bg-[var(--cyan-dim)] border border-[var(--border-hi)]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex gap-2 items-center">
                <div className="w-[26px] h-[26px] rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--violet)] shrink-0" />
                <div className="px-3.5 py-2.5 rounded-[12px_12px_12px_2px] bg-[var(--cyan-dim)] border border-[var(--border-hi)] flex gap-1.5 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="block w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-[bounce_1.2s_ease-in-out_infinite]"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div className="border-t border-[var(--border)] px-3.5 py-3 flex gap-2.5 bg-[var(--bg-subtle)]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about Anshum..."
              disabled={loading}
              className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3.5 py-2 text-[13px] text-[var(--text)] outline-none font-mono transition-colors focus:border-[var(--cyan)]"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className={`btn-primary px-4.5 py-2 text-[13px] ${loading || !input.trim() ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}