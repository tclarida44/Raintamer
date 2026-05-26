import { z } from "zod";

const phoneRegex = /^[\d\s().+-]{10,}$/;

export const quoteServicesSchema = z.object({
  services: z
    .array(z.enum(["gutters", "french-drain", "guards", "cleaning", "commercial"]))
    .min(1, "Pick at least one service so we know what to quote."),
});

export const quotePropertySchema = z.object({
  address: z.string().min(5, "We need an address to send a crew."),
  homeSize: z.enum(["under-1500", "1500-2500", "2500-4000", "over-4000"], {
    errorMap: () => ({ message: "Pick a home size range." }),
  }),
  urgency: z.enum(["asap", "this-month", "next-90", "planning"]),
});

export const quoteContactSchema = z.object({
  name: z.string().min(2, "Name is required."),
  email: z.string().email("That email doesn't look right."),
  phone: z.string().regex(phoneRegex, "Enter a real phone number."),
  contactPreference: z.enum(["call", "text", "email"]),
  notes: z.string().max(2000).optional(),
});

export const quoteFormSchema = quoteServicesSchema
  .merge(quotePropertySchema)
  .merge(quoteContactSchema)
  .extend({
    selectedProfile: z.string().optional(),
    selectedColor: z.string().optional(),
  });

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
