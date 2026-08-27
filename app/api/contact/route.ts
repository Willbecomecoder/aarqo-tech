import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, details } = body;

    // 1. Validation
    if (!name || !email || !details) {
      return NextResponse.json(
        { error: "Name, email, and project details are required." },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    const targetEmail = "aarqotech@gmail.com";

    // 2. Server-side Email Sending via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: "Shivani Portfolio <onboarding@resend.dev>",
        to: [targetEmail],
        subject: `New AI Project Enquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #030712; color: #ffffff; padding: 24px; border-radius: 12px;">
            <h2 style="color: #00F0FF; margin-bottom: 16px;">New Portfolio Lead Received!</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company/Business:</strong> ${company || "Not provided"}</p>
            <p><strong>Service Requested:</strong> ${service || "General Inquiry"}</p>
            <p><strong>Submission Time:</strong> ${timestamp}</p>
            <hr style="border-color: #1f2937; margin: 20px 0;" />
            <h3 style="color: #EC4899;">Project Details:</h3>
            <p style="background-color: #0f172a; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6;">${details}</p>
          </div>
        `,
      });
    } else {
      console.log(`[CONTACT FORM ENQUIRY] Target: ${targetEmail}`, {
        name,
        email,
        company,
        service,
        details,
        timestamp,
      });
    }

    return NextResponse.json({
      success: true,
      message:
        "Thank you! Your message has been sent successfully. Shivani will get back to you soon.",
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again or contact directly." },
      { status: 500 }
    );
  }
}
