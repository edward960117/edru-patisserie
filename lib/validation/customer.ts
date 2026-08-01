import { z } from "zod";
import { phoneCountryCodeSchema } from "@/lib/phone";

export const customerRegisterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  name: z.string().trim().default(""),
  // New payload shape
  phoneCountry: phoneCountryCodeSchema.optional(),
  phoneNumber: z.string().trim().optional(),
  // Legacy payload shape (kept for backward compatibility)
  phone: z.string().trim().optional(),
}).superRefine((value, ctx) => {
  const hasNew = Boolean(value.phoneCountry && value.phoneNumber);
  const hasLegacy = Boolean(value.phone);
  if (!hasNew && !hasLegacy) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["phoneNumber"],
      message: "Contact number is required.",
    });
  }
});

export const customerLoginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});
