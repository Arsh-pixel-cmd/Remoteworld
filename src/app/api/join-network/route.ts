import { NextResponse } from "next/server";
import { Resend } from "resend";

// Helper function to escape HTML and prevent XSS injection in email clients
function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// In-memory sliding window rate limiter (5 requests per 10 minutes per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean stale records periodically to avoid memory growth
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

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    // Extract client IP for rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "anonymous";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { orgName, facilityType, location, contactName, email, designation, phone, message, _rw_hp } = body;

    // Honeypot detection: If hidden field is filled, silently discard bot submission
    if (_rw_hp) {
      return NextResponse.json({ success: true, message: "Request received" });
    }

    // Required fields validation
    if (!orgName || !facilityType || !location || !contactName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields. Please fill out all necessary information." },
        { status: 400 }
      );
    }

    // Email format validation
    if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Length boundary validation to prevent payload DoS
    if (
      orgName.length > 150 ||
      contactName.length > 150 ||
      location.length > 150 ||
      (designation && designation.length > 150) ||
      phone.length > 50 ||
      (message && message.length > 3000)
    ) {
      return NextResponse.json(
        { error: "Submitted content exceeds permitted length limits." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY is not configured in environment variables.");
      return NextResponse.json(
        { error: "Email dispatch service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || "RemoteWard <onboarding@resend.dev>";
    const toEmail = process.env.FORM_RECIPIENT_EMAIL;

    if (!toEmail) {
      console.warn("FORM_RECIPIENT_EMAIL is not configured in environment variables.");
      return NextResponse.json(
        { error: "Email dispatch service is currently unavailable. Please try again later." },
        { status: 503 }
      );
    }

    // Sanitize user inputs before HTML interpolation
    const safeOrgName = escapeHtml(String(orgName).trim());
    const safeFacilityType = escapeHtml(String(facilityType).trim());
    const safeLocation = escapeHtml(String(location).trim());
    const safeContactName = escapeHtml(String(contactName).trim());
    const safeEmail = escapeHtml(String(email).trim());
    const safeDesignation = designation ? escapeHtml(String(designation).trim()) : "Not Specified";
    const safePhone = escapeHtml(String(phone).trim());
    const safeMessage = message ? escapeHtml(String(message).trim()) : "";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New Partnership Request: ${safeOrgName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="color: #03A1AC; margin: 0 0 8px 0; font-size: 24px;">New Partner Application</h2>
            <p style="color: #64748b; margin: 0; font-size: 14px;">A new healthcare facility has requested to join the RemoteWard network.</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 12px; font-weight: 600; color: #334155; border: 1px solid #e2e8f0; width: 38%;">Organization Name</td>
              <td style="padding: 12px; color: #0f172a; border: 1px solid #e2e8f0;">${safeOrgName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: 600; color: #334155; border: 1px solid #e2e8f0;">Facility Type</td>
              <td style="padding: 12px; color: #0f172a; border: 1px solid #e2e8f0;">${safeFacilityType}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 12px; font-weight: 600; color: #334155; border: 1px solid #e2e8f0;">Location</td>
              <td style="padding: 12px; color: #0f172a; border: 1px solid #e2e8f0;">${safeLocation}</td>
            </tr>
            <tr>
              <td style="padding: 12px; font-weight: 600; color: #334155; border: 1px solid #e2e8f0;">Contact Person</td>
              <td style="padding: 12px; color: #0f172a; border: 1px solid #e2e8f0;">${safeContactName}</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 12px; font-weight: 600; color: #334155; border: 1px solid #e2e8f0;">Designation</td>
              <td style="padding: 12px; color: #0f172a; border: 1px solid #e2e8f0;">${safeDesignation}</td>
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
          </table>

          ${
            safeMessage
              ? `
            <div style="margin-top: 20px; padding: 16px; background-color: #f1f5f9; border-left: 4px solid #03A1AC; border-radius: 6px;">
              <h4 style="margin: 0 0 8px 0; color: #1e293b; font-size: 14px;">Additional Requirements / Notes:</h4>
              <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${safeMessage}</p>
            </div>
          `
              : ""
          }
          
          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
            Sent automatically via RemoteWard Partner Portal • Client IP: ${escapeHtml(clientIp)}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API returned an error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send partnership email" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error in /api/join-network:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
