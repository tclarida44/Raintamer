import { NextResponse } from "next/server";
import { quoteFormSchema } from "@/lib/validation";

/**
 * Quote form submission endpoint.
 *
 * TODO(launch): wire this up to a real destination. Options, in order of preference:
 *  1. Webhook into the company's CRM (HubSpot/Pipedrive/Jobber).
 *  2. Resend/Postmark transactional email to the operations inbox.
 *  3. Slack incoming webhook for instant ops notification.
 *
 * For now we just log to the server console and acknowledge so the UX can be
 * built and tested end-to-end.
 */
export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = quoteFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // eslint-disable-next-line no-console
  console.log("[quote] new request", {
    services: parsed.data.services,
    address: parsed.data.address,
    name: parsed.data.name,
    email: parsed.data.email,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
