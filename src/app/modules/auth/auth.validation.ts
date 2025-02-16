import { z } from "zod";

const userRegisterValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: "Name is required." }),
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
