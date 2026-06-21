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
      style={{
        padding: "112px 32px",
        borderTop: "1px solid var(--border)",
        background:
          "radial-gradient(ellipse at 50% 100%, rgba(6,182,212,0.05) 0%, transparent 60%)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p className="section-label">AI Anshum</p>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                marginBottom: 10,
              }}
            >
              Ask me{" "}
              <span className="gradient-text">anything</span>
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
              Can&apos;t find what you&apos;re looking for? Just ask — unanswered questions
              get saved and Anshum will answer them soon.
            </p>
          </div>
        </div>

        <div
          style={{
            maxWidth: 680,
            border: "1px solid var(--border-hi)",
            borderRadius: 16,
            background: "var(--bg-card)",
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(6,182,212,0.07)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 18px",
              borderBottom: "1px solid var(--border)",
              background: "var(--bg-subtle)",
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "monospace",
                flexShrink: 0,
              }}
            >
              AI
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                AI Anshum
              </p>
              <p
                style={{
                  fontSize: 10,
                  color: "var(--text-dim)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                powered by Groq · llama-3.3-70b
              </p>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
              <span
                className="pulse-dot"
                style={{
                  display: "block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--green)",
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: "var(--green)",
                }}
              >
                online
              </span>
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              height: 340,
              overflowY: "auto",
              padding: "16px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  gap: 8,
                  alignItems: "flex-start",
                }}
              >
                {msg.role === "ai" && (
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                )}
                <div
                  style={{
                    padding: "9px 14px",
                    borderRadius:
                      msg.role === "user"
                        ? "12px 12px 2px 12px"
                        : "12px 12px 12px 2px",
                    fontSize: 13,
                    lineHeight: 1.6,
                    maxWidth: "80%",
                    background:
                      msg.role === "user"
                        ? "var(--bg-subtle)"
                        : "var(--cyan-dim)",
                    border:
                      msg.role === "user"
                        ? "1px solid var(--border)"
                        : "1px solid var(--border-hi)",
                    color: "var(--text)",
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--cyan), var(--violet))",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    padding: "9px 14px",
                    borderRadius: "12px 12px 12px 2px",
                    background: "var(--cyan-dim)",
                    border: "1px solid var(--border-hi)",
                    display: "flex",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "var(--cyan)",
                        display: "block",
                        animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input bar */}
          <div
            style={{
              borderTop: "1px solid var(--border)",
              padding: "12px 14px",
              display: "flex",
              gap: 10,
              background: "var(--bg-subtle)",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about Anshum..."
              disabled={loading}
              style={{
                flex: 1,
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "9px 14px",
                fontSize: 13,
                color: "var(--text)",
                outline: "none",
                fontFamily: "'JetBrains Mono', monospace",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--cyan)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="btn-primary"
              style={{
                padding: "9px 18px",
                fontSize: 13,
                opacity: loading || !input.trim() ? 0.4 : 1,
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%            { transform: translateY(-5px); }
        }
      `}</style>
    </section>
  );
}