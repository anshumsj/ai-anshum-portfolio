"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setStatus(res.ok ? "success" : "error");
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        <div>
          <p className="text-xs font-mono text-teal-700 mb-3 uppercase tracking-widest">
            Contact
          </p>
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">
            Let&apos;s talk
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Open to backend SDE roles and internships. If you&apos;re a
            recruiter or just want to chat about systems, reach out.
          </p>
          <div className="space-y-2">
            <a
              href="mailto:your@email.com"
              className="block text-sm font-mono text-teal-700 hover:underline"
            >
              your@email.com ↗
            </a>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-mono text-gray-600 hover:text-gray-900 transition"
            >
              github.com/yourusername ↗
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-mono text-gray-600 hover:text-gray-900 transition"
            >
              linkedin.com/in/yourusername ↗
            </a>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 bg-white">
          {status === "success" ? (
            <div className="text-center py-8">
              <p className="text-sm font-mono text-teal-700 mb-2">✓ Message sent</p>
              <p className="text-sm text-gray-600">
                I&apos;ll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-teal-400 transition resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-xs font-mono text-red-500">
                  Something went wrong. Try emailing directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}