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

const userRegisterValidationSchema = z.object({
  body: z.object({
    name: createUserNameValidationSchema,
    age: z.number({ invalid_type_error: "Age is required" }),
    gender: z.enum(["male", "female"]),
    email: z
      .string()
      .email({ message: "Invalid email address." })
      .min(1, { message: "Email is required." }),
    password: z.string().min(1, { message: "Password is required." }),
    role: z.enum(["admin", "trainer", "trainee"]).default("trainee"),
    isBlocked: z.boolean().default(false),
  }),
});

const userLoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ invalid_type_error: "Email is required" }),
    password: z.string({ invalid_type_error: "Password is required" }),
  }),
});

export const AuthValidations = {
  userRegisterValidationSchema,
  userLoginValidationSchema,
};
