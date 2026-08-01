import { z } from "zod";
import { phoneCountryCodeSchema } from "@/lib/phone";

export const customerRegisterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  name: z.string().trim().default(""),
  phoneCountry: phoneCountryCodeSchema,
  phoneNumber: z.string().trim().min(1, "Contact number is required."),
});

export const customerLoginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});
