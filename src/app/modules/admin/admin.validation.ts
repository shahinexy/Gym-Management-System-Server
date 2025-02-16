import { z } from "zod";

const DemoValidationSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, "Title cannot be empty"),
  price: z.number().positive("Price must be a positive number"),
  category: z.enum([
    "Fiction",
    "Science",
    "SelfDevelopment",
    "Poetry",
    "Religious",
  ]),
  inStock: z.boolean(),
});

export default DemoValidationSchema;
