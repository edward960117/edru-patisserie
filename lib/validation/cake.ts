import { z } from "zod";

const sizeSchema = z
  .object({
    size: z.enum(['6"', '8"', '10"']),
    price: z.number().nonnegative(),
    available: z.boolean(),
  })
  .superRefine((value, ctx) => {
    if (value.available && value.price <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Price for size ${value.size} must be greater than 0 when available.`,
        path: ["price"],
      });
    }
  });

export const cakeInputSchema = z
  .object({
    categoryId: z.number().int().positive("Please choose a category."),
    name: z.string().min(2),
    nameCn: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().min(1, "Description is required."),
    descriptionCn: z.string().min(1, "Chinese description is required."),
    ingredients: z.string().min(1, "Ingredients are required."),
    // Existing cakes store relative paths like "/cakes/foo.jpg"; new uploads come in as data URLs.
    imageUrl: z
      .string()
      .url()
      .or(z.string().startsWith("data:image/"))
      .or(z.string().startsWith("/")),
    leadTimeDays: z.number().int().min(1, "Lead time must be at least 1 day.").max(30),
    active: z.boolean(),
    featured: z.boolean(),
    sizes: z.array(sizeSchema).length(3),
  })
  .superRefine((value, ctx) => {
    const hasAvailableSize = value.sizes.some((size) => size.available && size.price > 0);
    if (!hasAvailableSize) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least one available size with price greater than 0 is required.",
        path: ["sizes"],
      });
    }
  });

export type CakeInput = z.infer<typeof cakeInputSchema>;
