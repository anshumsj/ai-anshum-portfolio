import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    await sendMail({
      subject: `[Portfolio] Resume Downloaded!`,
      text: `Good news Anshum! Someone just downloaded your resume.\n\nEmail: ${email}`,
    });

    const fileUrl = process.env.AWS_S3_BUCKET_NAME 
      ? `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/resume.pdf`
      : "/resume.pdf";

    return NextResponse.json({ success: true, url: fileUrl });
  } catch (error) {
    console.error("Resume API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
