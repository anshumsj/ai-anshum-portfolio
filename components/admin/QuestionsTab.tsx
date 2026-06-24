"use client";

import { useState, useEffect } from "react";
import { Question } from "@/types";

export default function QuestionsTab() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await fetch("/api/questions");
    if (res.ok) {
      const data = await res.json();
      setQuestions(data.questions);
    }
  }

  async function submitAnswer(id: string) {
    if (!answers[id]) return;
    const res = await fetch("/api/questions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setQuestions((prev) => prev.filter((q) => q._id !== id));
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Pending Questions ({questions.length})</h2>
      {questions.length === 0 ? (
        <p className="text-[var(--text-muted)]">You're all caught up!</p>
      ) : (
        questions.map((q) => (
          <div key={q._id} className="glass p-6">
            <p className="text-lg font-medium mb-4">"{q.question}"</p>
            <textarea
              className="input w-full mb-4 resize-y"
              rows={4}
              placeholder="Draft your answer here..."
              value={answers[q._id] || ""}
              onChange={(e) => setAnswers({ ...answers, [q._id]: e.target.value })}
            />
            <div className="flex gap-3 items-center">
              <button onClick={() => submitAnswer(q._id)} className="btn-primary">
                Save Answer
              </button>
              <button onClick={() => deleteQuestion(q._id)} className="btn-secondary text-red-400 border-red-400 hover:bg-red-400/10">
                Delete
              </button>
              {saved[q._id] && <span className="text-green-500 text-[13px]">Saved ✓</span>}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
