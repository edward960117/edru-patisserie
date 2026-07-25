import { z } from "zod";

const sizeSchema = z.object({
  size: z.enum(['6"', '8"', '10"']),
  price: z.number().positive(),
  available: z.boolean(),
});

export const cakeInputSchema = z.object({
  categoryId: z.number().int().positive(),
  name: z.string().min(2),
  nameCn: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  descriptionCn: z.string().min(10),
  ingredients: z.string().min(5),
  imageUrl: z.string().url().or(z.string().startsWith("data:image/")),
  leadTimeDays: z.number().int().min(1).max(30),
  active: z.boolean(),
  featured: z.boolean(),
  sizes: z.array(sizeSchema).length(3),
});

export type CakeInput = z.infer<typeof cakeInputSchema>;
