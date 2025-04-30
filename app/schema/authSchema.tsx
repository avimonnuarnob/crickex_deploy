import { z } from "zod";

export const loginSchema = z
  .object({
    username: z
      .string()
      .min(4, "Username must be at least 4 characters")
      .max(15, "Username must be at most 15 characters")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Username can only contain letters and numbers, no spaces"
      ),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
        "Password must contain both letters and numbers"
      ),
  })
  .required();

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(4, "Username must be at least 4 characters")
      .max(15, "Username must be at most 15 characters")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Username can only contain letters and numbers, no spaces"
      ),
    password: z
      .number()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
    email: z.string(),
    referral_code: z.string(),
    country: z.string(),
    currency: z
      .object({
        id: z.number(),
        name: z.string(),
        avatar: z.string(),
      })
      .nullable(),
  })
  .required();
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signUpSchema>;
