"use client";

import { useState, useEffect } from "react";

interface Question {
  _id: string;
  question: string;
  askedAt: string;
}

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  highlight: boolean;
}

interface SkillGroup {
  _id: string;
  category: string;
  icon: string;
  accent: string;
  items: string[];
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<"qa" | "resume" | "projects" | "skills">("qa");
  const [error, setError] = useState("");

  // Data states
  const [questions, setQuestions] = useState<Question[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<SkillGroup[]>([]);

  // Form states
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const [readmeText, setReadmeText] = useState("");
  const [parsingReadme, setParsingReadme] = useState(false);
  const [parsedProject, setParsedProject] = useState<Partial<Project> | null>(null);
  const [selectedHighlightReplace, setSelectedHighlightReplace] = useState<string>("");

  const [newSkillCategory, setNewSkillCategory] = useState("");
  const [newSkillItem, setNewSkillItem] = useState("");

  async function handleLogin() {
    const res = await fetch("/api/questions", {
      headers: { "x-admin-password": password },
    });

    if (res.ok) {
      setAuthed(true);
      fetchData();
    } else {
      setError("Invalid password");
    }
  }

  async function fetchData() {
    // Fetch Questions
    const resQ = await fetch("/api/questions", { headers: { "x-admin-password": password } });
    if (resQ.ok) {
      const data = await resQ.json();
      setQuestions(data.questions);
    }
    // Fetch Projects
    const resP = await fetch("/api/owner/projects", { headers: { "x-admin-password": password } });
    if (resP.ok) {
      const data = await resP.json();
      setProjects(data.projects);
    }
    // Fetch Skills
    const resS = await fetch("/api/owner/skills", { headers: { "x-admin-password": password } });
    if (resS.ok) {
      const data = await resS.json();
      setSkills(data.skills);
    }
  }

  // --- Q&A Logic ---
  async function submitAnswer(id: string) {
    if (!answers[id]) return;
    const res = await fetch("/api/questions", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id, answer: answers[id] }),
    });

    if (res.ok) {
      setSaved((prev) => ({ ...prev, [id]: true }));
      setQuestions((prev) => prev.filter((q) => q._id !== id));
      setTimeout(() => setSaved((prev) => ({ ...prev, [id]: false })), 2000);
    }
  }

  async function deleteQuestion(id: string) {
    const res = await fetch("/api/questions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    }
  }

  // --- Resume Logic ---
  async function handleResumeUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!resumeFile) return;

    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", resumeFile);

    const res = await fetch("/api/owner/resume", {
      method: "POST",
      headers: { "x-admin-password": password },
      body: formData,
    });

    if (res.ok) {
      setUploadStatus("Uploaded successfully to AWS S3!");
      setResumeFile(null);
    } else {
      setUploadStatus("Upload failed.");
    }
  }

  // --- Projects Logic ---
  async function handleParseReadme() {
    if (!readmeText) return;
    setParsingReadme(true);

    const res = await fetch("/api/owner/parse-readme", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ readmeText }),
    });

    if (res.ok) {
      const data = await res.json();
      setParsedProject({ ...data.project, highlight: false });
    } else {
      alert("Failed to parse README");
    }
    setParsingReadme(false);
  }

  async function handleSaveProject() {
    if (!parsedProject) return;

    const body = {
      ...parsedProject,
      replaceProjectId: parsedProject.highlight ? selectedHighlightReplace : null,
    };

    const res = await fetch("/api/owner/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setParsedProject(null);
      setReadmeText("");
      fetchData(); // Refresh list
    }
  }

  async function deleteProject(id: string) {
    const res = await fetch("/api/owner/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchData();
  }

  // --- Skills Logic ---
  async function handleAddSkill() {
    if (!newSkillCategory || !newSkillItem) return;

    const group = skills.find(s => s.category === newSkillCategory);
    if (!group) return;

    const updatedItems = [...group.items, newSkillItem];

    const res = await fetch("/api/owner/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ category: newSkillCategory, items: updatedItems }),
    });

    if (res.ok) {
      setNewSkillItem("");
      fetchData();
    }
  }

  if (!authed) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
        <div className="glass" style={{ padding: 40, width: 400, display: "flex", flexDirection: "column", gap: 16 }}>
          <h2>Owner Login</h2>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          {error && <p style={{ color: "#f87171", fontSize: 13 }}>{error}</p>}
          <button onClick={handleLogin} className="btn-primary" style={{ justifyContent: "center" }}>
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 24px" }}>
      <h1 style={{ fontSize: 32, marginBottom: 32 }}>Owner Dashboard</h1>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 16 }}>
        {["qa", "resume", "projects", "skills"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            style={{
              padding: "8px 16px",
              background: activeTab === tab ? "var(--cyan-dim)" : "transparent",
              border: `1px solid ${activeTab === tab ? "var(--cyan)" : "transparent"}`,
              color: activeTab === tab ? "var(--text)" : "var(--text-muted)",
              borderRadius: 8,
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {tab === "qa" ? "Q&A Inbox" : tab}
          </button>
        ))}
      </div>

      {/* Q&A Tab */}
      {activeTab === "qa" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h2>Pending Questions ({questions.length})</h2>
          {questions.length === 0 ? (
            <p style={{ color: "var(--text-muted)" }}>You're all caught up!</p>
          ) : (
            questions.map((q) => (
              <div key={q._id} className="glass" style={{ padding: 24 }}>
                <p style={{ fontSize: 18, fontWeight: 500, marginBottom: 16 }}>"{q.question}"</p>
                <textarea
                  className="input"
                  rows={4}
                  placeholder="Draft your answer here..."
                  value={answers[q._id] || ""}
                  onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })}
                  style={{ width: "100%", marginBottom: 16, resize: "vertical" }}
                />
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <button onClick={() => submitAnswer(q._id)} className="btn-primary">
                    Save Answer
                  </button>
                  <button onClick={() => deleteQuestion(q._id)} className="btn-secondary" style={{ color: "#f87171" }}>
                    Delete
                  </button>
                  {saved[q._id] && <span style={{ color: "var(--green)", fontSize: 13 }}>Saved ✓</span>}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Resume Tab */}
      {activeTab === "resume" && (
        <div className="glass" style={{ padding: 32 }}>
          <h2>Update Resume</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>
            Upload a new PDF. It will be pushed to AWS S3 and live instantly on your site.
          </p>
          <form onSubmit={handleResumeUpload} style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              className="input"
            />
            <button type="submit" disabled={!resumeFile} className="btn-primary">
              Upload PDF
            </button>
          </form>
          {uploadStatus && <p style={{ marginTop: 16, color: "var(--cyan)" }}>{uploadStatus}</p>}
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div>
            <h2>Add Project via README</h2>
            <p style={{ color: "var(--text-muted)", marginBottom: 16, fontSize: 13 }}>
              Paste a GitHub README below. AI will automatically extract the title, description, and tech stack.
            </p>
            <textarea
              className="input"
              rows={10}
              placeholder="Paste README markdown here..."
              value={readmeText}
              onChange={(e) => setReadmeText(e.target.value)}
              style={{ width: "100%", marginBottom: 16 }}
            />
            <button onClick={handleParseReadme} disabled={parsingReadme || !readmeText} className="btn-primary">
              {parsingReadme ? "Parsing with Groq..." : "Extract Project Details ✦"}
            </button>

            {parsedProject && (
              <div className="glass" style={{ padding: 24, marginTop: 32 }}>
                <h3>Review & Save</h3>
                <input
                  className="input"
                  style={{ width: "100%", margin: "12px 0" }}
                  value={parsedProject.title || ""}
                  onChange={(e) => setParsedProject({ ...parsedProject, title: e.target.value })}
                />
                <textarea
                  className="input"
                  style={{ width: "100%", margin: "0 0 12px 0", height: 80 }}
                  value={parsedProject.description || ""}
                  onChange={(e) => setParsedProject({ ...parsedProject, description: e.target.value })}
                />
                <input
                  className="input"
                  placeholder="Tags (comma separated)"
                  style={{ width: "100%", margin: "0 0 12px 0" }}
                  value={(parsedProject.tags || []).join(", ")}
                  onChange={(e) => setParsedProject({ ...parsedProject, tags: e.target.value.split(",").map(t => t.trim()) })}
                />
                
                <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
                  <input
                    type="checkbox"
                    checked={parsedProject.highlight || false}
                    onChange={(e) => setParsedProject({ ...parsedProject, highlight: e.target.checked })}
                  />
                  Feature this project (Top 3)
                </label>

                {parsedProject.highlight && (
                  <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>
                      Select an existing featured project to replace:
                    </p>
                    <select
                      className="input"
                      style={{ width: "100%" }}
                      value={selectedHighlightReplace}
                      onChange={(e) => setSelectedHighlightReplace(e.target.value)}
                    >
                      <option value="">-- Select Project to Demote --</option>
                      {projects.filter(p => p.highlight).map(p => (
                        <option key={p._id} value={p._id}>{p.title}</option>
                      ))}
                    </select>
                  </div>
                )}

                <button onClick={handleSaveProject} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  Save Project
                </button>
              </div>
            )}
          </div>

          <div>
            <h2>Current Projects</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
              {projects.map((p) => (
                <div key={p._id} className="glass" style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4 style={{ margin: 0 }}>{p.title} {p.highlight && <span style={{ color: "var(--cyan)", fontSize: 12 }}>★</span>}</h4>
                  </div>
                  <button onClick={() => deleteProject(p._id)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer" }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skills Tab */}
      {activeTab === "skills" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          <div className="glass" style={{ padding: 24 }}>
            <h2>Add New Skill</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
              <select
                className="input"
                value={newSkillCategory}
                onChange={(e) => setNewSkillCategory(e.target.value)}
              >
                <option value="">-- Select Category --</option>
                {skills.map(s => (
                  <option key={s.category} value={s.category}>{s.category}</option>
                ))}
              </select>
              <input
                className="input"
                placeholder="New Skill (e.g. Next.js)"
                value={newSkillItem}
                onChange={(e) => setNewSkillItem(e.target.value)}
              />
              <button onClick={handleAddSkill} disabled={!newSkillCategory || !newSkillItem} className="btn-primary">
                Add Skill
              </button>
            </div>
          </div>

          <div>
            <h2>Current Skills</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
              {skills.map((group) => (
                <div key={group.category} className="glass" style={{ padding: 16 }}>
                  <h4 style={{ margin: "0 0 8px 0", color: group.accent }}>{group.category}</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {group.items.map(item => (
                      <span key={item} className="tag">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
