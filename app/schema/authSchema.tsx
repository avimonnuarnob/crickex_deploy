import {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
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
        /^[a-zA-Z0-9]+$/,
        "Password can only contain letters and numbers, no spaces"
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
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "Password can only contain letters and numbers, no spaces"
      ),
    referral_code: z.string(),
    // country: z
    //   .object({
    //     country_name: z.string(),
    //     country_flag: z.string(),
    //   })
    //   .nullable(),
    currency: z.string(),
    otp: z.string().optional(),
    phone: z.string(),
  })
  .required()
  .superRefine((data, ctx) => {
    if (data.phone && !isPossiblePhoneNumber(data.phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Valid phone number must be provided.",
        path: ["phone"], // points to the whole object
      });
    }
  });

export const forgotPasswordByMailSchema = z
  .object({
    email: z.string().email().optional(),
    otp: z.string().optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .optional(),
  })
  .required();

export const forgotPasswordBySMSSchema = z
  .object({
    phone: z
      .string()
      .regex(/^[0-9]+$/, "Phone number can only contain numbers, no spaces"),
  })
  .required();
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signUpSchema>;
export type forgotPasswordBySMSInput = z.infer<
  typeof forgotPasswordBySMSSchema
>;
export type forgotPasswordByMailInput = z.infer<
  typeof forgotPasswordByMailSchema
>;
