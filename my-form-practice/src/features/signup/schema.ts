import { z } from "zod"

export const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),

    email: z.email("Enter a valid email address"),

    age: z.coerce
      .number({ error: "Age is required" })
      .int("Age must be a whole number")
      .min(18, "You must be at least 18 years old")
      .max(120, "Enter a valid age"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),

    confirmPassword: z.string().min(1, "Please confirm your password"),

    role: z.enum(["developer", "designer", "manager", "other"], {
      error: "Please select a role",
    }),

    acceptTerms: z.boolean().refine((value) => value === true, {
      error: "You must accept the terms to continue",
    }),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type SignupFormInput = z.input<typeof signupSchema>
export type SignupFormOutput = z.output<typeof signupSchema>
