import { z } from "zod";

export const orderInputSchema = z.object({
  customerName: z.string().min(1, "Customer name is required."),
  customerPhone: z.string().default(""),
  cakeName: z.string().min(1, "Cake name is required."),
  size: z.string().default(""),
  price: z.number().nonnegative().default(0),
  quantity: z.number().int().positive().default(1),
  fulfillment: z.string().default(""),
  eventDate: z.string().min(1, "Pickup/delivery date is required."),
  channel: z.enum(["whatsapp", "wechat", "handwritten", "other"]).default("other"),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]).default("pending"),
  notes: z.string().default(""),
  sourceImageUrl: z
    .string()
    .default("")
    .refine((value) => value === "" || value.startsWith("data:image/") || z.string().url().safeParse(value).success, {
      message: "Source image must be a valid image data URL or URL.",
    }),
  rawExtractedText: z.string().default(""),
  customerEmail: z
    .string()
    .default("")
    .refine((value) => value === "" || z.string().email().safeParse(value).success, {
      message: "Customer email must be a valid email address.",
    }),
});

export type OrderInput = z.infer<typeof orderInputSchema>;

export const orderUpdateSchema = orderInputSchema.partial();
