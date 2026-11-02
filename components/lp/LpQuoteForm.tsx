"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

/**
 * Lightweight LP form — deliberately shorter than the full quote form.
 * Paid-traffic converts inversely with field count, so we ask for the
 * bare minimum needed to route the lead: name, phone, ZIP, and a
 * one-line "what do you need" note.
 *
 * Posts to /api/lp-quote which delivers via Gmail SMTP through
 * lib/mailer. (We used to post client-side directly to Formsubmit.co,
 * but Formsubmit's AJAX endpoint had multi-hour outages that silently
 * swallowed paid leads — Gmail SMTP through our own route removes the
 * third-party single point of failure.)
 *
 * Every LP submission is a Google Ads paid-search lead by definition,
 * so the outbound email carries a discreet [Google Ads · Campaign]
 * subject prefix and an Attribution footer built server-side from the
 * gclid + UTMs forwarded here.
 */

type FormState = "idle" | "submitting" | "success" | "error";

function campaignFromPathname(pathname: string): string {
  if (pathname.startsWith("/lp/seamless-gutters")) return "Seamless Gutters";
  if (pathname.startsWith("/lp/french-drains")) return "Drainage";
  return "Landing Page";
}

function readAdsAttribution() {
  if (typeof window === "undefined") {
    return {
      campaign_label: "Landing Page",
      landing_url: "",
      referrer: "",
      gclid: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_term: "",
      utm_content: "",
    };
  }
  const url = new URL(window.location.href);
  const q = url.searchParams;
  return {
    campaign_label: campaignFromPathname(url.pathname),
    landing_url: window.location.href,
    referrer: document.referrer,
    gclid: q.get("gclid") ?? "",
    utm_source: q.get("utm_source") ?? "",
    utm_medium: q.get("utm_medium") ?? "",
    utm_campaign: q.get("utm_campaign") ?? "",
    utm_term: q.get("utm_term") ?? "",
    utm_content: q.get("utm_content") ?? "",
  };
}

export function LpQuoteForm({ className }: { className?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;
    setState("submitting");
    setError(null);

    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string).trim();
    const phone = (fd.get("phone") as string).trim();
    const zip = (fd.get("zip") as string).trim();
    const notes = ((fd.get("notes") as string) ?? "").trim();
    const attribution = readAdsAttribution();

    // Client-side pre-check — surface specific messages instead of the
    // generic "something went sideways" for cheap-to-detect issues.
    const localError = firstLpClientError({ name, phone, zip });
    if (localError) {
      setState("error");
      setError(localError);
      return;
    }

    try {
      const res = await fetch("/api/lp-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          zip,
          notes,
          source: "google-ads-lp",
          ...attribution,
        }),
      });
      if (res.status === 422) {
        const b = (await res.json().catch(() => ({}))) as {
          issues?: { fieldErrors?: Record<string, string[]> };
        };
        const firstField = Object.entries(b.issues?.fieldErrors ?? {})[0];
        const msg = firstField?.[1]?.[0] ?? "Check that your info looks right and try again.";
        setState("error");
        setError(msg);
        return;
      }
      if (!res.ok) {
        const b = await res.json().catch(() => ({}));
        throw new Error(b?.error || "submit_failed");
      }
      setState("success");

      // GA4 + GTM conversion event — feeds Google Ads Max Conversions
      if (typeof window !== "undefined") {
        const w = window as Window & {
          gtag?: (...args: unknown[]) => void;
          dataLayer?: unknown[];
        };
        w.gtag?.("event", "generate_lead", {
          currency: "USD",
          value: 1,
          source: "google-ads-lp",
          campaign_label: attribution.campaign_label,
        });
        w.dataLayer?.push({
          event: "lp_form_submit",
          source: "google-ads-lp",
          campaign_label: attribution.campaign_label,
        });
      }
    } catch {
      setState("error");
      setError("Something went sideways. Call us at the number above or try again.");
    }
  }

  if (state === "success") {
    return (
      <div className={cn("rounded-[4px] border border-rain-500/40 bg-rain-500/10 p-5 text-center", className)}>
        <CheckCircle2 className="mx-auto size-8 text-rain-400" />
        <p className="mt-3 font-display text-xl font-semibold text-bone-50">You&apos;re on the list.</p>
        <p className="mt-2 text-[14px] leading-[1.55] text-bone-300">
          A Rain Tamer crew lead will call you within one business day to schedule the walk-through.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("grid gap-3", className)} noValidate>
      {/* Call-first CTA above the form. Many paid-search visitors prefer
          to call rather than fill a form, and the lift from putting the
          phone number here (above the fold of the form) is measurable.
          Remove or demote only after A/B data shows otherwise. */}
      <a
        href={`tel:${SITE.phoneTel}`}
        className="flex items-center justify-center gap-2 rounded-[4px] border border-rain-500 bg-rain-500/10 px-4 py-3 text-center text-[14px] font-semibold text-rain-400 transition-colors hover:bg-rain-500 hover:text-ink-1000"
      >
        <Phone className="size-4" />
        <span>Fastest response — call {SITE.phone}</span>
      </a>
      <div className="my-1 flex items-center gap-3">
        <div className="h-px flex-1 bg-bone-50/10" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">or fill in below</span>
        <div className="h-px flex-1 bg-bone-50/10" />
      </div>
      <Field name="name" label="Full name" required autoComplete="name" placeholder="Jane Homeowner" />
      <Field
        name="phone"
        label="Phone"
        required
        type="tel"
        autoComplete="tel"
        placeholder="(405) 555-0142"
        inputMode="tel"
      />
      <Field
        name="zip"
        label="ZIP code"
        required
        autoComplete="postal-code"
        placeholder="73013"
        inputMode="numeric"
        maxLength={10}
      />
      <div>
        <label htmlFor="notes" className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-400">
          What do you need? <span className="text-bone-500">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          maxLength={400}
          placeholder="e.g. two-story house, needs new gutters + guards"
          className="mt-1.5 w-full resize-none rounded-[3px] border border-bone-50/20 bg-ink-950 px-3 py-2.5 text-[14px] text-bone-50 placeholder:text-bone-500 focus:border-rain-500 focus:outline-none focus:ring-1 focus:ring-rain-500"
        />
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-1 inline-flex h-14 items-center justify-center gap-2 rounded-[3px] bg-rain-500 px-6 text-base font-semibold text-ink-1000 shadow-[0_0_28px_rgba(31,102,255,0.4)] transition-colors hover:bg-rain-400 disabled:opacity-70"
      >
        {state === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Get my free estimate
            <ArrowRight className="size-4" />
          </>
        )}
      </button>
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">
        No spam · No obligation · Reply within one business day
      </p>
      {error && (
        <div className="rounded-[4px] border border-red-400/40 bg-red-400/5 p-4 text-center">
          <p className="text-[13px] text-red-300">{error}</p>
          <a
            href={`tel:${SITE.phoneTel}`}
            className="mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-[3px] bg-rain-500 px-5 text-base font-semibold text-ink-1000 hover:bg-rain-400"
          >
            <Phone className="size-4" />
            Call {SITE.phone}
          </a>
        </div>
      )}
    </form>
  );
}

function firstLpClientError({
  name,
  phone,
  zip,
}: {
  name: string;
  phone: string;
  zip: string;
}): string | null {
  if (name.length < 2) return "Please enter your full name.";
  if (!/^[\d\s().+-]{10,}$/.test(phone)) return "Enter a real phone number with area code.";
  if (!/^\d{5}(-?\d{4})?$/.test(zip)) return "ZIP code looks off — 5 digits (or ZIP+4).";
  return null;
}

function Field({
  name,
  label,
  ...rest
}: {
  name: string;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-400">
        {label}
        {rest.required && <span className="ml-1 text-rain-400">*</span>}
      </label>
      <input
        id={name}
        name={name}
        {...rest}
        className="mt-1.5 w-full rounded-[3px] border border-bone-50/20 bg-ink-950 px-3 py-3 text-[15px] text-bone-50 placeholder:text-bone-500 focus:border-rain-500 focus:outline-none focus:ring-1 focus:ring-rain-500"
      />
    </div>
  );
}
