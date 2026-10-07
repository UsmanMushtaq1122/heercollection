"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, MailCheck, Loader2, AlertCircle, ArrowLeft, ArrowRight, Send } from "lucide-react";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/lib/validations";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setError("");
    setLoading(true);
    try {
      await authService.forgotPassword(data.email);
      setSubmittedEmail(data.email);
      setEmailSent(true);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-[#E8DDD4] bg-white p-7 text-center shadow-[0_10px_35px_-10px_rgba(0,0,0,0.05)] sm:p-10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A27E]/30 bg-[#F8F5F2]">
          <MailCheck className="h-7 w-7 text-[#C9A27E]" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A27E]">
          Check Your Inbox
        </p>
        <h1 className="mt-1.5 text-2xl font-light tracking-tight text-[#1A1A1A] sm:text-3xl">
          Reset Code Sent
        </h1>
        <div className="mx-auto mt-3 h-px w-10 bg-[#C9A27E]" />
        <p className="mt-4 text-xs leading-relaxed text-[#1A1A1A]/70 sm:text-sm">
          We&apos;ve sent a 4-digit password reset code to:
        </p>
        <p className="mt-1 font-medium text-[#1A1A1A] text-sm">
          {submittedEmail}
        </p>
        <p className="mt-2 text-xs text-[#1A1A1A]/50">
          The code will expire in 10 minutes. Please check your spam folder if you do not see it.
        </p>

        <div className="mt-8 space-y-3">
          <Button
            type="button"
            variant="gold"
            onClick={() => router.push(`/auth/reset-password?email=${encodeURIComponent(submittedEmail)}`)}
            className="h-11 w-full rounded-lg text-xs font-semibold uppercase tracking-widest sm:h-12 shadow-md hover:shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              Enter Code &amp; Reset Password
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setEmailSent(false);
              setLoading(false);
            }}
            className="h-11 w-full rounded-lg text-xs font-semibold uppercase tracking-widest text-[#1A1A1A] hover:bg-[#F8F5F2]"
          >
            Try Another Email
          </Button>

          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center gap-1.5 pt-2 text-xs font-medium text-[#C9A27E] transition-colors hover:text-[#B8906A] hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#E8DDD4] bg-white p-7 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.05)] sm:p-10">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A27E]/30 bg-[#F8F5F2]">
          <KeyRound className="h-5 w-5 text-[#C9A27E]" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A27E]">
          Password Recovery
        </p>
        <h1 className="mt-1.5 text-2xl font-light tracking-tight text-[#1A1A1A] sm:text-3xl">
          Forgot Password?
        </h1>
        <div className="mx-auto mt-3 h-px w-10 bg-[#C9A27E]" />
        <p className="mx-auto mt-3 max-w-xs text-xs text-[#1A1A1A]/60 sm:text-sm">
          Enter your registered email address and we&apos;ll send you a 4-digit code to reset your password.
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

        <Button
          type="submit"
          variant="gold"
          disabled={loading}
          className="h-11 w-full rounded-lg text-xs font-semibold uppercase tracking-widest shadow-md transition-all duration-300 hover:shadow-lg sm:h-12"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending Code...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Reset Code
            </span>
          )}
        </Button>
      </form>

      {/* Footer link */}
      <div className="mt-8 border-t border-[#E8DDD4]/80 pt-6 text-center text-xs text-[#1A1A1A]/60 sm:text-sm">
        Remember your password?{" "}
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