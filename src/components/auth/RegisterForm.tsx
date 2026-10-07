"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  UserPlus,
  Gem,
  Loader2,
  AlertCircle,
  Check,
} from "lucide-react";
import {
  registerSchema,
  type RegisterInput,
} from "@/lib/validations";
import { SITE_NAME } from "@/lib/constants";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Strength = 0 | 1 | 2 | 3 | 4;

function calculateStrength(password: string): Strength {
  let score: Strength = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;
  return score as Strength;
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];

const STRENGTH_COLORS = [
  "bg-[#E8DDD4]",
  "bg-red-400",
  "bg-amber-400",
  "bg-yellow-400",
  "bg-emerald-500",
];

export default function RegisterForm() {
  const router = useRouter();
  const registerUser = useAuthStore((state) => state.register);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const passwordValue = useWatch<RegisterInput>({ control, name: "password" }) || "";
  const strength = calculateStrength(passwordValue);

  const onSubmit = async (data: RegisterInput) => {
    if (!agreeTerms) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    setError("");
    setLoading(true);
    try {
      const response = await authService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      if (response.requiresOtpVerification) {
        router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}`);
        return;
      }

      if (response.user) {
        registerUser(response.user);
        router.push("/account");
      } else {
        router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}`);
      }
    } catch (err) {
      let message = getErrorMessage(err);
      if (message.toLowerCase().includes("already exists") || message.toLowerCase().includes("unique constraint")) {
        message = "An account with this email already exists. Please sign in or use forgot password.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg rounded-2xl border border-[#E8DDD4] bg-white p-7 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.05)] sm:p-10">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A27E]/30 bg-[#F8F5F2]">
          <Gem className="h-5 w-5 text-[#C9A27E]" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A27E]">
          Join {SITE_NAME}
        </p>
        <h1 className="mt-1.5 text-2xl font-light tracking-tight text-[#1A1A1A] sm:text-3xl">
          Create Account
        </h1>
        <div className="mx-auto mt-3 h-px w-10 bg-[#C9A27E]" />
        <p className="mx-auto mt-3 max-w-xs text-xs text-[#1A1A1A]/60 sm:text-sm">
          Join our exclusive circle for order tracking, wishlist access, and bespoke luxury collections.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50/90 p-3.5 text-xs text-red-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="leading-relaxed">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4 sm:space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/70">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="Ayesha"
              autoComplete="given-name"
              {...register("firstName")}
              className={cn(
                "h-11 rounded-lg border-[#E8DDD4] bg-[#FAFAF8] text-sm focus:border-[#C9A27E] focus:bg-white focus:ring-[#C9A27E]/20",
                errors.firstName && "border-red-400 bg-red-50/20"
              )}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/70">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Khan"
              autoComplete="family-name"
              {...register("lastName")}
              className={cn(
                "h-11 rounded-lg border-[#E8DDD4] bg-[#FAFAF8] text-sm focus:border-[#C9A27E] focus:bg-white focus:ring-[#C9A27E]/20",
                errors.lastName && "border-red-400 bg-red-50/20"
              )}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/70">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="ayesha@example.com"
            autoComplete="email"
            {...register("email")}
            className={cn(
              "h-11 rounded-lg border-[#E8DDD4] bg-[#FAFAF8] text-sm focus:border-[#C9A27E] focus:bg-white focus:ring-[#C9A27E]/20",
              errors.email && "border-red-400 bg-red-50/20"
            )}
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/70">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              {...register("password")}
              className={cn(
                "h-11 rounded-lg border-[#E8DDD4] bg-[#FAFAF8] pr-10 text-sm focus:border-[#C9A27E] focus:bg-white focus:ring-[#C9A27E]/20",
                errors.password && "border-red-400 bg-red-50/20"
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 transition-colors hover:text-[#1A1A1A]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Password strength meter */}
          {passwordValue.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors duration-300",
                      strength >= i ? STRENGTH_COLORS[strength] : "bg-[#E8DDD4]"
                    )}
                  />
                ))}
                <span
                  className={cn(
                    "ml-2 w-12 text-right text-[11px] font-medium",
                    strength > 0 ? "text-[#1A1A1A]" : "text-transparent"
                  )}
                >
                  {STRENGTH_LABELS[strength]}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1 pt-1 text-[11px] text-[#1A1A1A]/60">
                <span className={cn("flex items-center gap-1", passwordValue.length >= 8 ? "text-emerald-600 font-medium" : "")}>
                  <Check className="h-3 w-3" /> 8+ Characters
                </span>
                <span className={cn("flex items-center gap-1", /[A-Z]/.test(passwordValue) && /[a-z]/.test(passwordValue) ? "text-emerald-600 font-medium" : "")}>
                  <Check className="h-3 w-3" /> Upper &amp; Lowercase
                </span>
                <span className={cn("flex items-center gap-1", /[0-9]/.test(passwordValue) ? "text-emerald-600 font-medium" : "")}>
                  <Check className="h-3 w-3" /> One Number
                </span>
                <span className={cn("flex items-center gap-1", /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(passwordValue) ? "text-emerald-600 font-medium" : "")}>
                  <Check className="h-3 w-3" /> Special Character (!@#$)
                </span>
              </div>
            </div>
          )}

          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword" className="text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/70">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              {...register("confirmPassword")}
              className={cn(
                "h-11 rounded-lg border-[#E8DDD4] bg-[#FAFAF8] pr-10 text-sm focus:border-[#C9A27E] focus:bg-white focus:ring-[#C9A27E]/20",
                errors.confirmPassword && "border-red-400 bg-red-50/20"
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 transition-colors hover:text-[#1A1A1A]"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="pt-1">
          <label className="flex cursor-pointer items-start gap-2.5 text-xs text-[#1A1A1A]/70">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => {
                setAgreeTerms(e.target.checked);
                if (e.target.checked) setTermsError(false);
              }}
              className="mt-0.5 h-4 w-4 rounded border-[#E8DDD4] accent-[#C9A27E] cursor-pointer"
            />
            <span className="leading-relaxed">
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-medium text-[#C9A27E] underline underline-offset-2 transition-colors hover:text-[#B8906A]"
              >
                Terms &amp; Conditions
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium text-[#C9A27E] underline underline-offset-2 transition-colors hover:text-[#B8906A]"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
          {termsError && (
            <p className="mt-1 text-xs text-red-500">
              Please accept the terms &amp; conditions to continue.
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="gold"
          disabled={loading}
          className="h-11 w-full rounded-lg text-xs font-semibold uppercase tracking-widest shadow-md transition-all duration-300 hover:shadow-lg sm:h-12"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating Account...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Create Account
            </span>
          )}
        </Button>
      </form>

      {/* Footer link */}
      <div className="mt-8 border-t border-[#E8DDD4]/80 pt-6 text-center text-xs text-[#1A1A1A]/60 sm:text-sm">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-[#C9A27E] transition-colors hover:text-[#B8906A] hover:underline"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}