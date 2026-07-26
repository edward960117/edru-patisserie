import { z } from "zod";

export const categoryInputSchema = z.object({
  slug: z.string().min(2, "Slug is required."),
  name: z.string().min(2, "English name is required."),
  nameCn: z.string().min(1, "Chinese name is required."),
  emoji: z.string().min(1, "Emoji is required."),
  description: z.string().min(2, "Description is required."),
});

export type CategoryInput = z.infer<typeof categoryInputSchema>;