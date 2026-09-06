import { NextResponse } from "next/server";

export interface LeadPayload {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  useCase?: string;
  preferredCallTime?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED_FIELDS: (keyof LeadPayload)[] = ["name", "businessName", "phone", "email"];

/**
 * Demo-request intake endpoint.
 *
 * This does NOT talk to the FastAPI / VAPI backend that runs the actual
 * voice agent and appointments — see BACKEND.md. It only captures leads
 * from this marketing site. Once the backend exposes a leads endpoint,
 * replace the `// TODO forward to backend` block below with a POST to
 * `${process.env.NEXT_PUBLIC_API_URL}/leads`.
 */
export async function POST(request: Request) {
  let body: Partial<LeadPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const missing = REQUIRED_FIELDS.filter((field) => !body[field] || !String(body[field]).trim());
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(String(body.email))) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  const lead: LeadPayload = {
    name: String(body.name).trim(),
    businessName: String(body.businessName).trim(),
    phone: String(body.phone).trim(),
    email: String(body.email).trim(),
    useCase: body.useCase ? String(body.useCase).trim() : undefined,
    preferredCallTime: body.preferredCallTime ? String(body.preferredCallTime).trim() : undefined,
  };

  // For now, leads are logged server-side. Swap this for persistence
  // (a database call, a CRM webhook, or a forward to the FastAPI backend)
  // once one is wired up — see BACKEND.md.
  console.log("[leads] new demo request:", { ...lead, receivedAt: new Date().toISOString() });

  // TODO forward to backend once NEXT_PUBLIC_API_URL exposes a /leads route:
  // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(lead),
  // });

  return NextResponse.json({ ok: true }, { status: 201 });
}
