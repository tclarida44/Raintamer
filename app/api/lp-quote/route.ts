import { NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadEmail } from "@/lib/mailer";

/**
 * Landing-page submission endpoint. Delivers via Gmail SMTP through
 * lib/mailer (replaces the previous Formsubmit dependency after that
 * service suffered a multi-hour AJAX outage that silently swallowed
 * paid-search leads).
 *
 * Every LP submission is a Google Ads paid-search lead by definition,
 * so the outbound email carries a discreet [Google Ads · Campaign]
 * subject prefix and an Attribution footer that names the specific
 * LP + gclid + UTMs. The AT&T email-to-SMS gateway is CC'd so the
 * shop phone gets a text within seconds.
 */

export const runtime = "nodejs";

const lpQuoteSchema = z.object({
  name: z.string().min(2, "Name is required."),
  phone: z.string().regex(/^[\d\s().+-]{10,}$/, "Enter a real phone number."),
  zip: z.string().regex(/^\d{5}(-?\d{4})?$/, "ZIP looks off."),
  notes: z.string().max(400).optional(),
  source: z.string().max(64).default("google-ads-lp"),
  campaign_label: z.string().max(120).optional(),
  referrer: z.string().max(2048).optional(),
  landing_url: z.string().max(2048).optional(),
  gclid: z.string().max(256).optional(),
  utm_source: z.string().max(120).optional(),
  utm_medium: z.string().max(120).optional(),
  utm_campaign: z.string().max(120).optional(),
  utm_term: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = lpQuoteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }
  const data = parsed.data;
  const campaign = data.campaign_label || "Landing Page";

  const subject = `[Google Ads · ${campaign}] Lead — ${data.name} (${data.zip})`;

  const attributionLines = [
    `Source:              Google Ads (paid search)`,
    `Campaign:            ${campaign}`,
    data.landing_url ? `Landing page:        ${data.landing_url}` : null,
    data.gclid ? `gclid:               ${data.gclid}` : null,
    data.utm_campaign ? `utm_campaign:        ${data.utm_campaign}` : null,
    data.utm_source ? `utm_source:          ${data.utm_source}` : null,
    data.utm_medium ? `utm_medium:          ${data.utm_medium}` : null,
    data.utm_term ? `utm_term:            ${data.utm_term}` : null,
    data.utm_content ? `utm_content:         ${data.utm_content}` : null,
    data.referrer ? `Referrer:            ${data.referrer}` : null,
  ].filter(Boolean);

  const body = [
    `New Rain Tamer lead`,
    ``,
    `Name:                ${data.name}`,
    `Phone:               ${data.phone}`,
    `ZIP:                 ${data.zip}`,
    data.notes ? `` : null,
    data.notes ? `Notes:` : null,
    data.notes ? data.notes : null,
    ``,
    `— Attribution —`,
    ...attributionLines,
    ``,
    `Submitted:           ${new Date().toISOString()}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const result = await sendLeadEmail({ subject, body });
  return NextResponse.json({ ok: true, delivered: result.delivered });
}
