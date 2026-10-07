"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  ShieldCheck,
  LockKeyhole,
  Loader2,
  AlertCircle,
  Check,
  Mail,
  Edit3,
} from "lucide-react";
import {
  resetPasswordOtpSchema,
  resetPasswordSchema,
  type ResetPasswordOtpInput,
  type ResetPasswordInput,
} from "@/lib/validations";
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

export default function ResetPasswordForm({
  token: initialToken,
}: {
  token?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlToken = initialToken || searchParams.get("token") || "";
  const initialEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(initialEmail);
  const [isEditingEmail, setIsEditingEmail] = useState(!initialEmail && !urlToken);
  const [tempEmail, setTempEmail] = useState(initialEmail);

  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", ""]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Form for OTP-based reset
  const otpForm = useForm<ResetPasswordOtpInput>({
    resolver: zodResolver(resetPasswordOtpSchema),
    mode: "onTouched",
    defaultValues: {
      email: initialEmail,
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Form for token-based reset
  const tokenForm = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const tokenPassword = useWatch({
    control: tokenForm.control,
    name: "password",
  }) || "";

  const otpPassword = useWatch({
    control: otpForm.control,
    name: "password",
  }) || "";

  const activePassword: string = urlToken ? tokenPassword : otpPassword;

  const strength = calculateStrength(activePassword);

  const handleOtpDigitChange = (index: number, val: string) => {
    const cleaned = val.replace(/\D/g, "");
    if (!cleaned) {
      const next = [...otpDigits];
      next[index] = "";
      setOtpDigits(next);
      otpForm.setValue("otp", next.join(""), { shouldValidate: true });
      return;
    }

    if (cleaned.length > 1) {
      const pasted = cleaned.slice(0, 4).split("");
      const next = [...otpDigits];
      pasted.forEach((d, i) => {
        if (i < 4) next[i] = d;
      });
      setOtpDigits(next);
      otpForm.setValue("otp", next.join(""), { shouldValidate: true });
      const target = Math.min(pasted.length, 3);
      otpInputRefs.current[target]?.focus();
      return;
    }

    const next = [...otpDigits];
    next[index] = cleaned;
    setOtpDigits(next);
    otpForm.setValue("otp", next.join(""), { shouldValidate: true });

    if (index < 3 && cleaned) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const onOtpSubmit = async (data: ResetPasswordOtpInput) => {
    setError("");
    setLoading(true);
    try {
      await authService.verifyPasswordResetOtp({
        email: email || data.email,
        otp: otpDigits.join("") || data.otp,
        newPassword: data.password,
      });
      setResetComplete(true);
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const onTokenSubmit = async (data: ResetPasswordInput) => {
    setError("");
    setLoading(true);
    try {
      await authService.resetPassword(urlToken, data.password);
      setResetComplete(true);
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (resetComplete) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-[#E8DDD4] bg-white p-7 text-center shadow-[0_10px_35px_-10px_rgba(0,0,0,0.05)] sm:p-10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50">
          <ShieldCheck className="h-7 w-7 text-emerald-600" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A27E]">
          Account Security
        </p>
        <h1 className="mt-1.5 text-2xl font-light tracking-tight text-[#1A1A1A] sm:text-3xl">
          Password Updated
        </h1>
        <div className="mx-auto mt-3 h-px w-10 bg-[#C9A27E]" />
        <p className="mt-4 text-xs leading-relaxed text-[#1A1A1A]/60 sm:text-sm">
          Your password has been changed successfully. You can now sign in with your new credentials.
        </p>
        <div className="mt-8">
          <Button
            variant="gold"
            onClick={() => router.push("/auth/login")}
            className="h-11 w-full rounded-lg text-xs font-semibold uppercase tracking-widest sm:h-12 shadow-md hover:shadow-lg"
          >
            Sign In Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#E8DDD4] bg-white p-7 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.05)] sm:p-10">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A27E]/30 bg-[#F8F5F2]">
          <LockKeyhole className="h-5 w-5 text-[#C9A27E]" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A27E]">
          New Credentials
        </p>
        <h1 className="mt-1.5 text-2xl font-light tracking-tight text-[#1A1A1A] sm:text-3xl">
          Reset Password
        </h1>
        <div className="mx-auto mt-3 h-px w-10 bg-[#C9A27E]" />
        <p className="mx-auto mt-3 max-w-xs text-xs text-[#1A1A1A]/60 sm:text-sm">
          {urlToken
            ? "Choose a strong, unique password to secure your account."
            : "Enter the 4-digit code sent to your email and your new password."}
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50/90 p-3.5 text-xs text-red-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="leading-relaxed">{error}</p>
        </div>
      )}

      {/* Form: Token Mode or OTP Mode */}
      {urlToken ? (
        <form
          onSubmit={tokenForm.handleSubmit(onTokenSubmit)}
          className="mt-6 space-y-4 sm:space-y-5"
        >
          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/70"
            >
              New Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                {...tokenForm.register("password")}
                className={cn(
                  "h-11 rounded-lg border-[#E8DDD4] bg-[#FAFAF8] pr-10 text-sm focus:border-[#C9A27E] focus:bg-white focus:ring-[#C9A27E]/20",
                  tokenForm.formState.errors.password && "border-red-400 bg-red-50/20"
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

            {/* Password Strength Meter */}
            {activePassword.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-colors duration-300",
                        strength >= i
                          ? STRENGTH_COLORS[strength]
                          : "bg-[#E8DDD4]"
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
              </div>
            )}

            {tokenForm.formState.errors.password && (
              <p className="text-xs text-red-500">
                {tokenForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="confirmPassword"
              className="text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/70"
            >
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your new password"
                autoComplete="new-password"
                {...tokenForm.register("confirmPassword")}
                className={cn(
                  "h-11 rounded-lg border-[#E8DDD4] bg-[#FAFAF8] pr-10 text-sm focus:border-[#C9A27E] focus:bg-white focus:ring-[#C9A27E]/20",
                  tokenForm.formState.errors.confirmPassword &&
                    "border-red-400 bg-red-50/20"
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
            {tokenForm.formState.errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {tokenForm.formState.errors.confirmPassword.message}
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
                Resetting Password...
              </span>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={otpForm.handleSubmit(onOtpSubmit)}
          className="mt-6 space-y-4 sm:space-y-5"
        >
          {/* Email section */}
          <div className="space-y-1.5">
            <Label
              htmlFor="otpEmail"
              className="text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/70"
            >
              Account Email
            </Label>
            {!isEditingEmail && email ? (
              <div className="flex items-center justify-between rounded-lg border border-[#E8DDD4] bg-[#FAFAF8] px-3.5 py-2 text-sm text-[#1A1A1A]">
                <span className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-[#C9A27E]" />
                  {email}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setTempEmail(email);
                    setIsEditingEmail(true);
                  }}
                  className="text-xs font-medium text-[#C9A27E] hover:text-[#B8906A] flex items-center gap-1"
                >
                  <Edit3 className="h-3 w-3" /> Change
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  id="otpEmail"
                  type="email"
                  placeholder="ayesha@example.com"
                  value={tempEmail}
                  onChange={(e) => {
                    setTempEmail(e.target.value);
                    otpForm.setValue("email", e.target.value, { shouldValidate: true });
                  }}
                  className="h-10 text-sm rounded-lg border-[#E8DDD4]"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (tempEmail) {
                      setEmail(tempEmail);
                      otpForm.setValue("email", tempEmail, { shouldValidate: true });
                      setIsEditingEmail(false);
                    }
                  }}
                  className="h-10 text-xs px-3"
                >
                  Confirm
                </Button>
              </div>
            )}
            {otpForm.formState.errors.email && (
              <p className="text-xs text-red-500">
                {otpForm.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* 4-digit code section */}
          <div className="space-y-2">
            <Label className="block text-center text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/70">
              4-Digit Reset Code
            </Label>
            <div className="flex justify-center gap-3">
              {otpDigits.map((digit, i) => (
                <Input
                  key={i}
                  ref={(el) => {
                    otpInputRefs.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpDigitChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="h-12 w-12 rounded-xl border border-[#E8DDD4] bg-[#FAFAF8] text-center text-xl font-bold text-[#1A1A1A] focus:border-[#C9A27E] focus:bg-white focus:ring-2 focus:ring-[#C9A27E]/20"
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>
            {otpForm.formState.errors.otp && (
              <p className="text-center text-xs text-red-500">
                {otpForm.formState.errors.otp.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <Label
              htmlFor="otpPassword"
              className="text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/70"
            >
              New Password
            </Label>
            <div className="relative">
              <Input
                id="otpPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Min. 8 characters"
                autoComplete="new-password"
                {...otpForm.register("password")}
                className={cn(
                  "h-11 rounded-lg border-[#E8DDD4] bg-[#FAFAF8] pr-10 text-sm focus:border-[#C9A27E] focus:bg-white focus:ring-[#C9A27E]/20",
                  otpForm.formState.errors.password && "border-red-400 bg-red-50/20"
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

            {/* Password strength checklist & meter */}
            {activePassword.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-colors duration-300",
                        strength >= i
                          ? STRENGTH_COLORS[strength]
                          : "bg-[#E8DDD4]"
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
                  <span className={cn("flex items-center gap-1", activePassword.length >= 8 ? "text-emerald-600 font-medium" : "")}>
                    <Check className="h-3 w-3" /> 8+ Characters
                  </span>
                  <span className={cn("flex items-center gap-1", /[A-Z]/.test(activePassword) && /[a-z]/.test(activePassword) ? "text-emerald-600 font-medium" : "")}>
                    <Check className="h-3 w-3" /> Upper &amp; Lower
                  </span>
                  <span className={cn("flex items-center gap-1", /[0-9]/.test(activePassword) ? "text-emerald-600 font-medium" : "")}>
                    <Check className="h-3 w-3" /> One Number
                  </span>
                  <span className={cn("flex items-center gap-1", /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(activePassword) ? "text-emerald-600 font-medium" : "")}>
                    <Check className="h-3 w-3" /> Special Char
                  </span>
                </div>
              </div>
            )}

            {otpForm.formState.errors.password && (
              <p className="text-xs text-red-500">
                {otpForm.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <Label
              htmlFor="otpConfirmPassword"
              className="text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/70"
            >
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="otpConfirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your new password"
                autoComplete="new-password"
                {...otpForm.register("confirmPassword")}
                className={cn(
                  "h-11 rounded-lg border-[#E8DDD4] bg-[#FAFAF8] pr-10 text-sm focus:border-[#C9A27E] focus:bg-white focus:ring-[#C9A27E]/20",
                  otpForm.formState.errors.confirmPassword &&
                    "border-red-400 bg-red-50/20"
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
            {otpForm.formState.errors.confirmPassword && (
              <p className="text-xs text-red-500">
                {otpForm.formState.errors.confirmPassword.message}
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
                Resetting Password...
              </span>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      )}

      {/* Footer link */}
      <div className="mt-8 border-t border-[#E8DDD4]/80 pt-6 text-center text-xs text-[#1A1A1A]/60 sm:text-sm">
        <Link
          href="/auth/login"
          className="font-semibold text-[#C9A27E] transition-colors hover:text-[#B8906A] hover:underline"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}