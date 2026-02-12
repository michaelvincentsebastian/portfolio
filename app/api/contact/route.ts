import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, subject, message } = await request.json();

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Send via Web3Forms (free tier, no API key required for basic usage)
    // Replace with your own Web3Forms access key or other email service
    const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY;

    if (!WEB3FORMS_KEY) {
      // Fallback: log the message and return success for development
      console.log("[Contact Form]", { email, subject, message });
      return NextResponse.json({
        success: true,
        message: "Message received (email service not configured)",
      });
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        from_name: email,
        subject: subject,
        message: `From: ${email}\n\n${message}`,
      }),
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ success: true, message: "Message sent successfully" });
    } else {
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 500 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
