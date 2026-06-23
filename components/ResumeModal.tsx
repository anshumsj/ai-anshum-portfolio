"use client";

import { useState } from "react";

export default function ResumeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.json();
        setStatus("success");
        
        // Trigger download programmatically
        const a = document.createElement("a");
        a.href = data.url || "/resume.pdf";
        a.download = "Anshum_Awasthi_Resume.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Close modal after a short delay
        setTimeout(() => {
          setStatus("idle");
          setEmail("");
          onClose();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        className="glass"
        style={{
          width: "100%",
          maxWidth: 400,
          padding: 32,
          position: "relative",
          animation: "fade-up 0.3s ease-out forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          ✕
        </button>

        <h3
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 8,
            color: "var(--text)",
          }}
        >
          Download Resume
        </h3>
        
        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(34,197,94,0.12)",
                border: "1px solid rgba(34,197,94,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                margin: "0 auto 12px",
                color: "var(--green)"
              }}
            >
              ✓
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
              Downloading starting...
            </p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>
              Please enter your email to download the resume. I'll get a quick notification!
            </p>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  style={{ width: "100%" }}
                />
              </div>

              {status === "error" && (
                <p style={{ fontSize: 12, color: "#f87171" }}>
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "10px 20px",
                  opacity: status === "loading" ? 0.7 : 1,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                }}
              >
                {status === "loading" ? "Processing..." : "Download PDF"}
              </button>
            </form>
          </>
        )}
      </div>
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
