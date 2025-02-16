import { z } from "zod";

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string(),
  lastName: z.string(),
});

const createTrainerValidationSchema = z.object({
  body: z.object({
    name: createUserNameValidationSchema,
    age: z.number({ invalid_type_error: "Age is required" }),
    gender: z.enum(["male", "female"]),
    image: z.string().optional(),
    email: z
      .string()
      .email({ message: "Invalid email address." })
      .min(1, { message: "Email is required." }),
    password: z.string().min(1, { message: "Password is required." }),
    role: z.enum(["admin", "trainer", "trainee"]).default("trainee"),
    isBlocked: z.boolean().default(false),
  }),
});

export const TrainerValidationSchemas ={
  createTrainerValidationSchema
};
