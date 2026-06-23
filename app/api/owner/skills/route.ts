import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SkillGroup from "@/lib/models/Skill";

export async function GET() {
  try {
    await connectDB();
    const skills = await SkillGroup.find({});
    return NextResponse.json({ skills });
  } catch (error) {
    console.error("Fetch Skills API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminPassword = req.headers.get("x-admin-password");
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { category, items } = await req.json();

    if (!category || !items) {
      return NextResponse.json({ error: "Category and items are required" }, { status: 400 });
    }

    // Attempt to update the existing category, if any
    const updatedSkillGroup = await SkillGroup.findOneAndUpdate(
      { category },
      { items },
      { new: true }
    );

    if (!updatedSkillGroup) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ skillGroup: updatedSkillGroup });
  } catch (error) {
    console.error("Update Skills API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
