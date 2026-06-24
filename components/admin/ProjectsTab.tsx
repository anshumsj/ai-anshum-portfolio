"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types";

export default function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [readmeText, setReadmeText] = useState("");
  const [parsingReadme, setParsingReadme] = useState(false);
  const [parsedProject, setParsedProject] = useState<Partial<Project> | null>(null);
  const [selectedHighlightReplace, setSelectedHighlightReplace] = useState<string>("");

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const res = await fetch("/api/owner/projects");
    if (res.ok) {
      const data = await res.json();
      setProjects(data.projects);
    }
  }

  async function handleParseReadme() {
    if (!readmeText) return;
    setParsingReadme(true);

    const res = await fetch("/api/owner/parse-readme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setParsedProject(null);
      setReadmeText("");
      fetchProjects();
    }
  }

  async function deleteProject(id: string) {
    const res = await fetch("/api/owner/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchProjects();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Add Project via README</h2>
        <p className="text-[13px] text-[var(--text-muted)] mb-4">
          Paste a GitHub README below. AI will automatically extract the title, description, and tech stack.
        </p>
        <textarea
          className="input w-full mb-4"
          rows={10}
          placeholder="Paste README markdown here..."
          value={readmeText}
          onChange={(e) => setReadmeText(e.target.value)}
        />
        <button onClick={handleParseReadme} disabled={parsingReadme || !readmeText} className="btn-primary">
          {parsingReadme ? "Parsing with Groq..." : "Extract Project Details ✦"}
        </button>

        {parsedProject && (
          <div className="glass p-6 mt-8">
            <h3 className="text-xl font-bold mb-4">Review & Save</h3>
            <input
              className="input w-full mb-3"
              value={parsedProject.title || ""}
              onChange={(e) => setParsedProject({ ...parsedProject, title: e.target.value })}
            />
            <textarea
              className="input w-full mb-3 h-20"
              value={parsedProject.description || ""}
              onChange={(e) => setParsedProject({ ...parsedProject, description: e.target.value })}
            />
            <input
              className="input w-full mb-3"
              placeholder="Tags (comma separated)"
              value={(parsedProject.tags || []).join(", ")}
              onChange={(e) => setParsedProject({ ...parsedProject, tags: e.target.value.split(",").map(t => t.trim()) })}
            />
            
            <label className="flex gap-2 items-center mb-3">
              <input
                type="checkbox"
                checked={parsedProject.highlight || false}
                onChange={(e) => setParsedProject({ ...parsedProject, highlight: e.target.checked })}
              />
              Feature this project (Top 3)
            </label>

            {parsedProject.highlight && (
              <div className="mb-4">
                <p className="text-[12px] text-[var(--text-muted)] mb-1">
                  Select an existing featured project to replace:
                </p>
                <select
                  className="input w-full"
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

            <button onClick={handleSaveProject} className="btn-primary w-full justify-center">
              Save Project
            </button>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Current Projects</h2>
        <div className="flex flex-col gap-3">
          {projects.map((p) => (
            <div key={p._id} className="glass p-4 flex justify-between items-center">
              <div>
                <h4 className="font-medium m-0">{p.title} {p.highlight && <span className="text-[var(--cyan)] text-xs ml-1">★</span>}</h4>
              </div>
              <button onClick={() => deleteProject(p._id)} className="text-red-400 hover:text-red-300 bg-transparent border-none cursor-pointer">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
