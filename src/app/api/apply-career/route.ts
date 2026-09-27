import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (rateLimitMap.size > 500) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "anonymous";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, phone, resume, whyJoin, _rw_hp } = body;

    // Honeypot spam check
    if (_rw_hp) {
      return NextResponse.json({ success: true, message: "Application received" });
    }

    // Required fields check
    if (!name || !email || !phone || !resume) {
      return NextResponse.json(
        { error: "Please fill out all required fields (Name, Email, Mobile Number, and Resume/CV)." },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (name.length > 150 || phone.length > 50 || resume.length > 2000 || (whyJoin && whyJoin.length > 3000)) {
      return NextResponse.json(
        { error: "Submitted content exceeds permitted length limits." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const safeName = escapeHtml(String(name).trim());
    const safeEmail = escapeHtml(String(email).trim());
    const safePhone = escapeHtml(String(phone).trim());
    const safeResume = escapeHtml(String(resume).trim());
    const safeWhyJoin = whyJoin ? escapeHtml(String(whyJoin).trim()) : "None provided";

    if (!apiKey) {
      console.warn("RESEND_API_KEY is not configured. Simulating successful submission in development.");
      return NextResponse.json({ success: true, message: "Application received (dev mode)" });
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || "RemoteWard Careers <onboarding@resend.dev>";
    const toEmail = process.env.CAREERS_RECIPIENT_EMAIL || process.env.PARTNERSHIP_RECIPIENT_EMAIL || "info@remoteward.com";

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Job Application: ${safeName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="color: #03A1AC; margin: 0 0 8px 0; font-size: 24px;">New Job Application</h2>
            <p style="color: #64748b; margin: 0; font-size: 14px;">A candidate has applied to join RemoteWard.</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 12px; font-weight: 600; color: #334155; border: 1px solid #e2e8f0; width: 38%;">Candidate Name</td>
              <td style="padding: 12px; color: #0f172a; border: 1px solid #e2e8f0;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: 600; color: #334155; border: 1px solid #e2e8f0;">Email Address</td>
              <td style="padding: 12px; color: #03A1AC; border: 1px solid #e2e8f0;">
                <a href="mailto:${safeEmail}" style="color: #03A1AC; text-decoration: none;">${safeEmail}</a>
              </td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 12px; font-weight: 600; color: #334155; border: 1px solid #e2e8f0;">Mobile Number</td>
              <td style="padding: 12px; color: #0f172a; border: 1px solid #e2e8f0;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: 600; color: #334155; border: 1px solid #e2e8f0;">Resume / CV Link</td>
              <td style="padding: 12px; color: #0f172a; border: 1px solid #e2e8f0;">
                <a href="${safeResume.startsWith("http") ? safeResume : `https://${safeResume}`}" target="_blank" rel="noopener noreferrer" style="color: #03A1AC; text-decoration: underline;">${safeResume}</a>
              </td>
            </tr>
          </table>

          ${
            whyJoin
              ? `
            <div style="margin-top: 20px; padding: 16px; background-color: #f1f5f9; border-left: 4px solid #03A1AC; border-radius: 6px;">
              <h4 style="margin: 0 0 8px 0; color: #1e293b; font-size: 14px;">Why they want to join RemoteWard:</h4>
              <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${safeWhyJoin}</p>
            </div>
          `
              : ""
          }
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to dispatch email. Please email info@remoteward.com directly." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Application submitted successfully" });
  } catch (err) {
    console.error("Application submission error:", err);
    return NextResponse.json({ error: "Internal server error. Please try again." }, { status: 500 });
  }
}
