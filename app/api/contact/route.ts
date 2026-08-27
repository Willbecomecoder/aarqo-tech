import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, details, website_hp } = body;

    // 1. Invisible Honeypot Spam Protection Check
    if (website_hp) {
      return NextResponse.json({ success: true, message: "Message sent!" });
    }

    // 2. Server-side Validation
    if (!name || !email || !details) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Email, Project Details)." },
        { status: 400 }
      );
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const targetEmail = "aarqotech@gmail.com";
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: "AarqoTech Leads <onboarding@resend.dev>",
        to: [targetEmail],
        replyTo: email,
        subject: `New AarqoTech Website Lead – ${name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #030712; color: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #1e293b;">
            <h2 style="color: #00F0FF; margin-top: 0; margin-bottom: 20px; font-size: 20px; letter-spacing: 1px;">NEW CLIENT INQUIRY</h2>
            
            <p style="margin-bottom: 12px;"><strong style="color: #94a3b8;">Name:</strong><br/><span style="font-size: 16px; font-weight: bold; color: #ffffff;">${name}</span></p>
            
            <p style="margin-bottom: 12px;"><strong style="color: #94a3b8;">Email:</strong><br/><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></p>
            
            <p style="margin-bottom: 12px;"><strong style="color: #94a3b8;">Service Required:</strong><br/><span style="color: #a855f7; font-weight: bold;">${service || "AI Solutions"}</span></p>

            ${company ? `<p style="margin-bottom: 12px;"><strong style="color: #94a3b8;">Company / Business:</strong><br/><span>${company}</span></p>` : ""}
            
            ${budget ? `<p style="margin-bottom: 12px;"><strong style="color: #94a3b8;">Budget:</strong><br/><span>${budget}</span></p>` : ""}
            
            <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
            
            <h3 style="color: #ec4899; margin-bottom: 12px; font-size: 16px;">Project Details:</h3>
            <div style="background-color: #0b0f19; padding: 20px; border-radius: 12px; border: 1px solid #1e293b; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #e2e8f0;">${details}</div>
          </div>
        `,
      });
    } else {
      console.log(`[RESEND EMAIL LEAD] Sent to ${targetEmail}`, {
        name,
        email,
        company,
        service,
        budget,
        details,
      });
    }

    return NextResponse.json({
      success: true,
      message: "MESSAGE SENT SUCCESSFULLY! ✓",
    });
  } catch (error) {
    console.error("Error sending Resend email:", error);
    return NextResponse.json(
      { error: "SOMETHING WENT WRONG. PLEASE TRY AGAIN." },
      { status: 500 }
    );
  }
}
