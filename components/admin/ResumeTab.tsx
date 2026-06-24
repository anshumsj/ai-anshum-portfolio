"use client";

import { useState } from "react";

export default function ResumeTab() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");

  async function handleResumeUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!resumeFile) return;

    setUploadStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", resumeFile);

    const res = await fetch("/api/owner/resume", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setUploadStatus("Uploaded successfully to AWS S3!");
      setResumeFile(null);
    } else {
      setUploadStatus("Upload failed.");
    }
  }

  return (
    <div className="glass p-8">
      <h2 className="text-2xl font-bold mb-2">Update Resume</h2>
      <p className="text-[var(--text-muted)] mb-6">
        Upload a new PDF. It will be pushed to AWS S3 and live instantly on your site.
      </p>
      <form onSubmit={handleResumeUpload} className="flex gap-4 items-center">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          className="input"
        />
        <button type="submit" disabled={!resumeFile} className="btn-primary whitespace-nowrap">
          Upload PDF
        </button>
      </form>
      {uploadStatus && <p className="mt-4 text-[var(--cyan)]">{uploadStatus}</p>}
    </div>
  );
}
