import { z } from "zod";

export const loginSchema = z
  .object({
    username: z.string(),
    password: z.string(),
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
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters"),
    email: z.string().email(),
    referral_code: z.string(),
    country: z
      .object({
        country_name: z.string(),
        country_flag: z.string(),
      })
      .nullable(),
    currency: z.string(),
    otp: z.string().optional(),
  })
  .required();
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signUpSchema>;
