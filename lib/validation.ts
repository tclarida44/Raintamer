import { z } from "zod";

const phoneRegex = /^[\d\s().+-]{10,}$/;

/**
 * Simplified single-step quote form. Client asked for the shortest
 * possible form to boost conversion — just enough info to get in touch
 * and route the lead correctly:
 *   - name             (required)
 *   - phone            (required)
 *   - email            (optional — some homeowners only want a call/text)
 *   - preferred contact method (call / text / email)
 *   - details          (optional — free-text notes about the job)
 */
export const quoteFormSchema = z.object({
  name: z.string().min(2, "Name is required."),
  phone: z.string().regex(phoneRegex, "Enter a real phone number."),
  email: z
    .string()
    .email("That email doesn't look right.")
    .optional()
    .or(z.literal("")),
  contactPreference: z.enum(["call", "text", "email"], {
    errorMap: () => ({ message: "Pick how you'd like to be contacted." }),
  }),
  details: z.string().max(1000).optional(),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
