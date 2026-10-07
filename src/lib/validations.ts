import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number")
      .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, "Must include at least one special character (!@#$%^&*)"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterInput = z.infer<typeof registerSchema>;

export const otpSchema = z.object({
  email: z.email("Please enter a valid email address"),
  otp: z
    .string()
    .length(4, "Verification code must be 4 digits")
    .regex(/^\d{4}$/, "Code must contain only digits"),
});

export type OtpInput = z.infer<typeof otpSchema>;

export const resendOtpSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type ResendOtpInput = z.infer<typeof resendOtpSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number")
      .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, "Must include at least one special character (!@#$%^&*)"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const resetPasswordOtpSchema = z
  .object({
    email: z.email("Please enter a valid email address"),
    otp: z
      .string()
      .length(4, "Verification code must be 4 digits")
      .regex(/^\d{4}$/, "Code must contain only digits"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number")
      .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, "Must include at least one special character (!@#$%^&*)"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type ResetPasswordOtpInput = z.infer<typeof resetPasswordOtpSchema>;

export const shippingAddressSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your full address"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State / Province is required"),
  postalCode: z.string().min(4, "Please enter a valid postal code"),
  country: z.string().min(2, "Country is required"),
});

export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>;

export const checkoutSchema = shippingAddressSchema.extend({
  paymentMethod: z.enum([
    "cod",
    "card",
    "bank_transfer",
    "jazzcash",
    "easypaisa",
  ]),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;