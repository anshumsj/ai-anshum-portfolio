import { NextRequest, NextResponse } from "next/server";
import { geminiModel } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const adminPassword = req.headers.get("x-admin-password");
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { readmeText } = await req.json();

    if (!readmeText) {
      return NextResponse.json({ error: "README text is required" }, { status: 400 });
    }

    const prompt = `
      You are an expert AI that extracts project details from README files for a developer's portfolio.
      Given the following README text, extract the following information and return it strictly as a JSON object with no markdown formatting or extra text.

      JSON structure required:
      {
        "title": "String (the project name)",
        "description": "String (a short 1-2 sentence description of what the project is)",
        "tags": ["String", "String"] (list of technologies/tools used, e.g., ["React", "Node.js"]),
        "github": "String (URL to the github repo if found, otherwise null)",
        "live": "String (URL to the live deployment if found, otherwise null)"
      }

      README Text:
      """
      ${readmeText.substring(0, 4000)}
      """
    `;

    const res = await geminiModel.generateContent(prompt);
    let text = await res.response.text();
    if (!text) {
        return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
    }
    
    // Clean up potential markdown formatting (e.g., ```json ... ```)
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let projectData;
    try {
      projectData = JSON.parse(text);
    } catch (parseErr) {
      console.error("Failed to parse Groq response as JSON:", text);
      return NextResponse.json({ error: "AI failed to return valid JSON" }, { status: 500 });
    }

    return NextResponse.json({ project: projectData });
  } catch (error) {
    console.error("Parse README API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
