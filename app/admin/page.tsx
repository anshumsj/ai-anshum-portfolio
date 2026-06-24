"use client";

import { useState, useEffect } from "react";
import QuestionsTab from "@/components/admin/QuestionsTab";
import ResumeTab from "@/components/admin/ResumeTab";
import ProjectsTab from "@/components/admin/ProjectsTab";
import SkillsTab from "@/components/admin/SkillsTab";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<"qa" | "resume" | "projects" | "skills">("qa");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we are already authenticated by trying to fetch questions
    fetch("/api/questions")
      .then(res => {
        if (res.ok) setAuthed(true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleLogin() {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setAuthed(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthed(false);
    setPassword("");
  }

  if (loading) return null;

  if (!authed) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="glass p-10 w-[400px] flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Owner Login</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          {error && <p className="text-red-400 text-[13px]">{error}</p>}
          <button onClick={handleLogin} className="btn-primary justify-center">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Owner Dashboard</h1>
        <button onClick={handleLogout} className="btn-secondary text-sm px-4 py-2">Logout</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-8 border-b border-[var(--border)] pb-4 overflow-x-auto">
        {(["qa", "resume", "projects", "skills"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg cursor-pointer capitalize whitespace-nowrap transition-colors ${
              activeTab === tab
                ? "bg-[var(--cyan-dim)] border border-[var(--cyan)] text-[var(--text)]"
                : "bg-transparent border border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
            }`}
          >
            {tab === "qa" ? "Q&A Inbox" : tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "qa" && <QuestionsTab />}
      {activeTab === "resume" && <ResumeTab />}
      {activeTab === "projects" && <ProjectsTab />}
      {activeTab === "skills" && <SkillsTab />}
    </div>
  );
}
