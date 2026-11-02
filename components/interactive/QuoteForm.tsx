"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

/**
 * Simple 4-field quote form. Deliberately short so nobody bounces at
 * step 3 of a wizard. Fields:
 *   - Full name
 *   - Phone
 *   - Email
 *   - Preferred contact method (call / text / email)
 *
 * Posts to /api/quote which delivers via Gmail SMTP through lib/mailer.
 * (Previously posted client-side directly to Formsubmit.co, but that
 * service had multi-hour AJAX outages that silently swallowed leads.)
 *
 * Google Ads attribution: on mount, we stash any incoming gclid/UTM
 * params in sessionStorage so they survive intra-site navigation
 * (Brand Defense ad clicks the home page, then user browses to
 * /contact before submitting — still credited to Google Ads). Server
 * decides whether to tag the email based on presence of gclid/utm.
 */

type FormState = "idle" | "submitting" | "success" | "error";

type AdsAttribution = {
  gclid: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  landing_url: string;
};

const STASH_KEY = "rt_ads_attribution_v1";

function stashIncomingAttribution() {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const q = url.searchParams;
    const gclid = q.get("gclid");
    // Only stash if there's actually paid-search signal on this URL.
    // A page load without gclid/utm shouldn't overwrite a previous stash.
    if (!gclid && !q.get("utm_source")) return;
    const attribution: AdsAttribution = {
      gclid: gclid ?? "",
      utm_source: q.get("utm_source") ?? "",
      utm_medium: q.get("utm_medium") ?? "",
      utm_campaign: q.get("utm_campaign") ?? "",
      utm_term: q.get("utm_term") ?? "",
      utm_content: q.get("utm_content") ?? "",
      landing_url: window.location.href,
    };
    sessionStorage.setItem(STASH_KEY, JSON.stringify(attribution));
  } catch {
    // sessionStorage can throw in private mode / when blocked. Silent.
  }
}

function readStashedAttribution(): AdsAttribution | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STASH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdsAttribution;
  } catch {
    return null;
  }
}

export function QuoteForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  // Stash gclid/UTM on mount so it survives navigation to /contact
  useEffect(() => {
    stashIncomingAttribution();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;
    setState("submitting");
    setError(null);

    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string).trim();
    const phone = (fd.get("phone") as string).trim();
    const email = ((fd.get("email") as string) ?? "").trim();
    const details = ((fd.get("details") as string) ?? "").trim();
    const contactPreference = fd.get("contactPreference") as "call" | "text" | "email";

    const attribution = readStashedAttribution();
    const isGoogleAdsLead = !!(attribution?.gclid || attribution?.utm_source === "google");

    // Client-side pre-check: reject obviously-bad values before the API
    // call so we can show a specific, actionable message instead of the
    // generic "something went sideways" error the catch-all was showing
    // for validation 422s. Same rules as the server schema.
    const localError = firstClientError({ name, phone, email });
    if (localError) {
      setState("error");
      setError(localError);
      return;
    }

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          contactPreference,
          details,
          gclid: attribution?.gclid ?? "",
          utm_source: attribution?.utm_source ?? "",
          utm_medium: attribution?.utm_medium ?? "",
          utm_campaign: attribution?.utm_campaign ?? "",
          utm_term: attribution?.utm_term ?? "",
          utm_content: attribution?.utm_content ?? "",
          landing_url: attribution?.landing_url ?? "",
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

      if (typeof window !== "undefined") {
        const w = window as Window & {
          gtag?: (...args: unknown[]) => void;
          dataLayer?: unknown[];
        };
        w.gtag?.("event", "generate_lead", {
          currency: "USD",
          value: 1,
          source: isGoogleAdsLead ? "google-ads" : "quote-form",
        });
        w.dataLayer?.push({
          event: "quote_form_submit",
          source: isGoogleAdsLead ? "google-ads" : "organic",
        });
      }
    } catch {
      setState("error");
      setError("Something went sideways. Please call us or try again in a moment.");
    }
  }

  if (state === "success") {
    return (
      <div className="rounded-[4px] border border-rain-500/40 bg-rain-500/10 p-6 text-center">
        <CheckCircle2 className="mx-auto size-9 text-rain-400" />
        <p className="mt-3 font-display text-2xl font-semibold text-bone-50">You&apos;re on the list.</p>
        <p className="mt-2 text-[15px] leading-[1.6] text-bone-300">
          A Rain Tamer crew lead will reach out within one business day the way you asked.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      {/* Call-first CTA above the form. Measurable lift vs. burying the
          phone number below the submit button. Remove only after A/B
          data shows otherwise. */}
      <a
        href={`tel:${SITE.phoneTel}`}
        className="flex items-center justify-center gap-2 rounded-[4px] border border-rain-500 bg-rain-500/10 px-4 py-3 text-center text-[15px] font-semibold text-rain-400 transition-colors hover:bg-rain-500 hover:text-ink-1000"
      >
        <Phone className="size-4" />
        <span>Fastest response — call {SITE.phone}</span>
      </a>
      <div className="-my-2 flex items-center gap-3">
        <div className="h-px flex-1 bg-bone-50/10" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-500">or fill in below</span>
        <div className="h-px flex-1 bg-bone-50/10" />
      </div>
      <Field
        name="name"
        label="Full name"
        required
        autoComplete="name"
        placeholder="Jane Homeowner"
      />
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
        name="email"
        label="Email"
        optional
        type="email"
        autoComplete="email"
        placeholder="jane@example.com (optional)"
        inputMode="email"
      />

      <fieldset>
        <legend className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-400">
          Preferred contact <span className="ml-1 text-rain-400">*</span>
        </legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <RadioPill name="contactPreference" value="call" label="Call" defaultChecked />
          <RadioPill name="contactPreference" value="text" label="Text" />
          <RadioPill name="contactPreference" value="email" label="Email" />
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="details"
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-400"
        >
          Details <span className="ml-1 text-bone-500">(optional)</span>
        </label>
        <textarea
          id="details"
          name="details"
          rows={3}
          maxLength={1000}
          placeholder="Anything we should know? e.g. two-story house, needs gutters + guards, best time to reach you..."
          className="mt-1.5 w-full resize-none rounded-[3px] border border-bone-50/20 bg-ink-950 px-3 py-3 text-[15px] text-bone-50 placeholder:text-bone-500 focus:border-rain-500 focus:outline-none focus:ring-1 focus:ring-rain-500"
        />
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="mt-2 inline-flex h-14 items-center justify-center gap-2 rounded-[3px] bg-rain-500 px-6 text-base font-semibold text-ink-1000 shadow-[0_0_28px_rgba(31,102,255,0.4)] transition-colors hover:bg-rain-400 disabled:opacity-70"
      >
        {state === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send my request
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

function Field({
  name,
  label,
  optional,
  ...rest
}: {
  name: string;
  label: string;
  optional?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-400"
      >
        {label}
        {rest.required && <span className="ml-1 text-rain-400">*</span>}
        {optional && <span className="ml-1 text-bone-500">(optional)</span>}
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

function firstClientError({
  name,
  phone,
  email,
}: {
  name: string;
  phone: string;
  email: string;
}): string | null {
  if (name.length < 2) return "Please enter your full name.";
  if (!/^[\d\s().+-]{10,}$/.test(phone)) return "Enter a real phone number with area code.";
  // Email is optional; only validate if the user typed something
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "That email doesn't look right — leave it blank if you'd rather not share it.";
  }
  return null;
}

function RadioPill({
  name,
  value,
  label,
  defaultChecked,
}: {
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label
      className={cn(
        "cursor-pointer",
        "relative flex items-center justify-center rounded-[3px] border border-bone-50/20 bg-ink-950 px-3 py-2.5 text-[14px] font-medium text-bone-200",
        "transition-colors hover:border-bone-50/40",
        "has-[:checked]:border-rain-500 has-[:checked]:bg-rain-500 has-[:checked]:text-ink-1000",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      {label}
    </label>
  );
}
