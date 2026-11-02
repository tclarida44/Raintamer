import { NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadEmail } from "@/lib/mailer";

/**
 * Homepage / contact-page quote-form endpoint. Delivers via Gmail SMTP
 * (replaces Formsubmit — see lib/mailer.ts). Organic contact-form leads
 * stay untagged; Google Ads leads (identifiable by gclid or utm_source
 * on the visit that reached this form) get a discreet [Google Ads]
 * subject prefix + Attribution footer.
 */

export const runtime = "nodejs";

const quotePayloadSchema = z.object({
  name: z.string().min(2, "Name is required."),
  phone: z.string().regex(/^[\d\s().+-]{10,}$/, "Enter a real phone number."),
  email: z.string().email("That email doesn't look right.").optional().or(z.literal("")),
  contactPreference: z.enum(["call", "text", "email"]),
  details: z.string().max(1000).optional(),
  // Attribution (all optional — organic leads won't send these)
  gclid: z.string().max(256).optional(),
  utm_source: z.string().max(120).optional(),
  utm_medium: z.string().max(120).optional(),
  utm_campaign: z.string().max(120).optional(),
  utm_term: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
  landing_url: z.string().max(2048).optional(),
});

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = quotePayloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }
  const data = parsed.data;

  const isGoogleAdsLead = !!(data.gclid || data.utm_source === "google");
  const campaignLabel = data.utm_campaign || (isGoogleAdsLead ? "Brand Defense" : "");

  const subject = isGoogleAdsLead
    ? `[Google Ads${campaignLabel ? ` · ${campaignLabel}` : ""}] Lead: ${data.name} · ${data.contactPreference}`
    : `Lead: ${data.name} · ${data.contactPreference}`;

  const attributionFooter = isGoogleAdsLead
    ? [
        ``,
        `— Attribution —`,
        `Source:              Google Ads (paid search)`,
        campaignLabel ? `Campaign:            ${campaignLabel}` : null,
        data.landing_url ? `Landing page:        ${data.landing_url}` : null,
        data.gclid ? `gclid:               ${data.gclid}` : null,
        data.utm_source ? `utm_source:          ${data.utm_source}` : null,
        data.utm_medium ? `utm_medium:          ${data.utm_medium}` : null,
        data.utm_campaign ? `utm_campaign:        ${data.utm_campaign}` : null,
      ]
        .filter((line) => line !== null)
        .join("\n")
    : "";

  const body = [
    `New Rain Tamer lead`,
    ``,
    `Name:                ${data.name}`,
    `Phone:               ${data.phone}`,
    `Preferred contact:   ${data.contactPreference.toUpperCase()}`,
    data.email ? `Email:               ${data.email}` : null,
    data.details ? `` : null,
    data.details ? `Details:` : null,
    data.details ? data.details : null,
    attributionFooter || null,
    ``,
    `Submitted:           ${new Date().toISOString()}`,
  ]
    .filter((line) => line !== null && line !== "")
    .join("\n");

  const result = await sendLeadEmail({ subject, body });
  return NextResponse.json({ ok: true, delivered: result.delivered });
}
