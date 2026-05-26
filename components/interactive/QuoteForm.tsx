"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, TextArea, Select, Label, FieldError } from "@/components/ui/Input";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

const SERVICES = [
  { id: "gutters", label: "Seamless Gutters", num: "01" },
  { id: "french-drain", label: "French Drains", num: "02" },
  { id: "guards", label: "Gutter Guards", num: "03" },
  { id: "cleaning", label: "Gutter Cleaning", num: "04" },
  { id: "commercial", label: "Commercial", num: "05" },
] as const;

type StepId = 0 | 1 | 2;

export function QuoteForm({
  defaultProfile,
  defaultColor,
}: {
  defaultProfile?: string;
  defaultColor?: string;
}) {
  const [step, setStep] = useState<StepId>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    setValue,
    watch,
  } = useForm<QuoteFormValues>({
    mode: "onTouched",
    defaultValues: {
      services: [],
      address: "",
      homeSize: undefined as unknown as QuoteFormValues["homeSize"],
      urgency: "this-month",
      name: "",
      email: "",
      phone: "",
      contactPreference: "call",
      notes: "",
      selectedProfile: defaultProfile,
      selectedColor: defaultColor,
    },
  });

  useEffect(() => {
    if (defaultProfile) setValue("selectedProfile", defaultProfile);
    if (defaultColor) setValue("selectedColor", defaultColor);
  }, [defaultProfile, defaultColor, setValue]);

  const selectedServices = watch("services");

  function toggleService(id: (typeof SERVICES)[number]["id"]) {
    const current = selectedServices ?? [];
    const next = current.includes(id) ? current.filter((s) => s !== id) : [...current, id];
    setValue("services", next, { shouldValidate: true });
  }

  async function nextStep() {
    let ok = true;
    if (step === 0) {
      ok = await trigger(["services"]);
    } else if (step === 1) {
      ok = await trigger(["address", "homeSize", "urgency"]);
    }
    if (ok) setStep((s) => Math.min(2, s + 1) as StepId);
  }

  function prevStep() {
    setStep((s) => Math.max(0, s - 1) as StepId);
  }

  async function onSubmit(values: QuoteFormValues) {
    setSubmitting(true);
    const parsed = quoteFormSchema.safeParse(values);
    if (!parsed.success) {
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Bad response");
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) return <SuccessState />;

  const stepTitle =
    step === 0
      ? "What can we quote?"
      : step === 1
      ? "Tell us about the property."
      : "Where do we send it?";

  return (
    <div className="border border-bone-50/10 bg-ink-950">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bone-50/10 px-6 py-5 lg:px-10">
        <Eyebrow>Free Estimate · Step {step + 1} of 3</Eyebrow>
        <StepDots active={step} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-6 py-10 lg:px-10 lg:py-14">
          <h2 className="font-display text-3xl font-medium tracking-[-0.025em] text-bone-50 sm:text-4xl">
            {stepTitle}
          </h2>

          <div className="mt-12">
            {step === 0 && (
              <div>
                <Label>Services</Label>
                <div className="mt-3 border-t border-bone-50/15">
                  {SERVICES.map((s) => {
                    const active = (selectedServices ?? []).includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleService(s.id)}
                        aria-pressed={active}
                        className={cn(
                          "flex w-full items-center justify-between border-b border-bone-50/10 py-5 text-left transition-colors hover:bg-bone-50/[0.015]",
                        )}
                      >
                        <div className="flex items-center gap-6">
                          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500">
                            {s.num}
                          </span>
                          <span className="font-display text-xl font-medium tracking-[-0.02em] text-bone-50 sm:text-2xl">
                            {s.label}
                          </span>
                        </div>
                        <span
                          className={cn(
                            "flex size-7 items-center justify-center rounded-[3px] border transition-colors",
                            active
                              ? "border-rain-500 bg-rain-500 text-ink-1000"
                              : "border-bone-50/20 text-bone-500",
                          )}
                        >
                          {active && <Check className="size-4" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <FieldError>{errors.services?.message}</FieldError>

                {(defaultProfile || defaultColor) && (
                  <div className="mt-8 border border-bone-50/10 bg-ink-900 px-5 py-4">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-rain-400">
                      Pre-filled from configurator
                    </p>
                    <p className="mt-2 text-[14px] text-bone-200">
                      {defaultProfile && <span className="font-medium">{defaultProfile}</span>}
                      {defaultProfile && defaultColor && <span className="text-bone-500"> · </span>}
                      {defaultColor && <span className="font-medium">{defaultColor}</span>}
                    </p>
                  </div>
                )}
              </div>
            )}

            {step === 1 && (
              <div className="grid gap-7">
                <div>
                  <Label htmlFor="address" required>Property address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St, Edmond, OK"
                    autoComplete="street-address"
                    {...register("address")}
                  />
                  <FieldError>{errors.address?.message}</FieldError>
                </div>
                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="homeSize" required>Home size</Label>
                    <Controller
                      control={control}
                      name="homeSize"
                      render={({ field }) => (
                        <Select id="homeSize" {...field} value={field.value ?? ""}>
                          <option value="" disabled>Select range</option>
                          <option value="under-1500">Under 1,500 sq ft</option>
                          <option value="1500-2500">1,500 – 2,500 sq ft</option>
                          <option value="2500-4000">2,500 – 4,000 sq ft</option>
                          <option value="over-4000">Over 4,000 sq ft</option>
                        </Select>
                      )}
                    />
                    <FieldError>{errors.homeSize?.message}</FieldError>
                  </div>
                  <div>
                    <Label htmlFor="urgency" required>Timeline</Label>
                    <Controller
                      control={control}
                      name="urgency"
                      render={({ field }) => (
                        <Select id="urgency" {...field}>
                          <option value="asap">As soon as possible</option>
                          <option value="this-month">This month</option>
                          <option value="next-90">Next 90 days</option>
                          <option value="planning">Just planning ahead</option>
                        </Select>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-7">
                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name" required>Name</Label>
                    <Input id="name" autoComplete="name" {...register("name")} />
                    <FieldError>{errors.name?.message}</FieldError>
                  </div>
                  <div>
                    <Label htmlFor="phone" required>Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(405) 555-0100"
                      {...register("phone")}
                    />
                    <FieldError>{errors.phone?.message}</FieldError>
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" required>Email</Label>
                  <Input id="email" type="email" autoComplete="email" {...register("email")} />
                  <FieldError>{errors.email?.message}</FieldError>
                </div>
                <div>
                  <Label htmlFor="contactPreference">Preferred contact</Label>
                  <Controller
                    control={control}
                    name="contactPreference"
                    render={({ field }) => (
                      <Select id="contactPreference" {...field}>
                        <option value="call">Call</option>
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Anything else we should know?</Label>
                  <TextArea
                    id="notes"
                    placeholder="Stories of the home, problem areas, deadlines, etc."
                    {...register("notes")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-bone-50/10 px-6 py-5 lg:px-10">
          {step > 0 ? (
            <button
              type="button"
              onClick={prevStep}
              className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-bone-500 hover:text-bone-50"
            >
              <ArrowLeft className="size-4" /> Back
            </button>
          ) : <span />}
          {step < 2 ? (
            <Button type="button" onClick={nextStep} size="lg">
              Continue <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Button type="submit" size="lg">
              {submitting ? "Sending..." : "Send my request"}
              <Check className="size-4" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function StepDots({ active }: { active: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "h-px transition-all",
            i === active ? "w-10 bg-rain-500" : "w-5 bg-bone-50/15",
          )}
        />
      ))}
    </div>
  );
}

function SuccessState() {
  return (
    <div className="border border-bone-50/10 bg-ink-950 p-12 text-center sm:p-16">
      <div className="mx-auto flex size-14 items-center justify-center rounded-[3px] bg-rain-500 text-ink-1000">
        <Check className="size-7" />
      </div>
      <h3 className="mt-8 font-display text-3xl font-medium tracking-[-0.025em] text-bone-50 sm:text-4xl">
        Estimate request received.
      </h3>
      <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.6] text-bone-300">
        We&apos;ll reach out within one business day to schedule a walk-through. If you need us sooner, call us directly.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button href="tel:+14057268106">Call (405) 726-8106</Button>
        <Button href="/" variant="outline">Back home</Button>
      </div>
    </div>
  );
}
