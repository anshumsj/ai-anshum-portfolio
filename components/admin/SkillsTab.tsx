"use client";

import { useState, useEffect } from "react";
import { SkillGroup } from "@/types";

export default function SkillsTab() {
  const [skills, setSkills] = useState<SkillGroup[]>([]);
  const [newSkillCategory, setNewSkillCategory] = useState("");
  const [newSkillItem, setNewSkillItem] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  async function fetchSkills() {
    const res = await fetch("/api/owner/skills");
    if (res.ok) {
      const data = await res.json();
      setSkills(data.skills);
    }
  }

  async function handleAddSkill() {
    if (!newSkillCategory || !newSkillItem) return;

    const group = skills.find(s => s.category === newSkillCategory);
    if (!group) return;

    const updatedItems = [...group.items, newSkillItem];

    const res = await fetch("/api/owner/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: newSkillCategory, items: updatedItems }),
    });

    if (res.ok) {
      setNewSkillItem("");
      fetchSkills();
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="glass p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Skill</h2>
        <div className="flex flex-col gap-4">
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
        <h2 className="text-2xl font-bold mb-4">Current Skills</h2>
        <div className="flex flex-col gap-4">
          {skills.map((group) => (
            <div key={group.category} className="glass p-4">
              <h4 className="mb-2 font-semibold" style={{ color: group.accent }}>{group.category}</h4>
              <div className="flex flex-wrap gap-2">
                {group.items.map(item => (
                  <span key={item} className="tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
