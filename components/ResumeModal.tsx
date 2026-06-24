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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-5"
      onClick={onClose}
    >
      <div
        className="glass w-full max-w-[400px] p-8 relative animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent border-none text-[var(--text-muted)] cursor-pointer text-lg"
        >
          ✕
        </button>

        <h3 className="text-xl font-semibold mb-2 text-[var(--text)]">
          Download Resume
        </h3>
        
        {status === "success" ? (
          <div className="text-center py-5">
            <div className="w-10 h-10 rounded-full bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.3)] flex items-center justify-center text-lg mx-auto mb-3 text-[var(--green)]">
              ✓
            </div>
            <p className="text-[var(--text-muted)] text-sm">
              Downloading starting...
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Please enter your email to download the resume. I'll get a quick notification!
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input w-full"
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className={`btn-primary w-full justify-center py-2.5 ${status === "loading" ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
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
