"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Loader2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Edit3,
  CheckCircle2,
  Mail,
} from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VerifyOtpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registerUser = useAuthStore((state) => state.register);

  const initialEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(initialEmail);
  const [isEditingEmail, setIsEditingEmail] = useState(!initialEmail);
  const [tempEmail, setTempEmail] = useState(initialEmail);

  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [cooldown, setCooldown] = useState(60);
  const [isVerified, setIsVerified] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Update email if query param changes
  useEffect(() => {
    if (initialEmail) {
      setEmail(initialEmail);
      setTempEmail(initialEmail);
      setIsEditingEmail(false);
    }
  }, [initialEmail]);

  // Focus the first input box on load
  useEffect(() => {
    if (!isEditingEmail) {
      inputRefs.current[0]?.focus();
    }
  }, [isEditingEmail]);

  // Countdown timer for resend
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleChange = (index: number, value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (!cleanValue) {
      const next = [...otp];
      next[index] = "";
      setOtp(next);
      return;
    }

    // If user pasted or typed multiple digits
    if (cleanValue.length > 1) {
      const pastedDigits = cleanValue.slice(0, 4).split("");
      const next = [...otp];
      pastedDigits.forEach((digit, i) => {
        if (i < 4) next[i] = digit;
      });
      setOtp(next);
      const targetIndex = Math.min(pastedDigits.length, 3);
      inputRefs.current[targetIndex]?.focus();
      return;
    }

    const next = [...otp];
    next[index] = cleanValue;
    setOtp(next);

    // Auto focus next input
    if (index < 3 && cleanValue) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pastedData) return;

    const digits = pastedData.slice(0, 4).split("");
    const next = [...otp];
    digits.forEach((digit, i) => {
      if (i < 4) next[i] = digit;
    });
    setOtp(next);
    const targetIndex = Math.min(digits.length, 3);
    inputRefs.current[targetIndex]?.focus();
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    setInfoMessage("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please provide a valid email address.");
      setIsEditingEmail(true);
      return;
    }

    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      setError("Please enter the full 4-digit verification code.");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.verifyOtp({
        email,
        otp: otpCode,
      });

      if (response.user) {
        registerUser(response.user);
      }

      setIsVerified(true);
      setTimeout(() => {
        router.push("/account");
      }, 1500);
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || resending) return;
    setError("");
    setInfoMessage("");

    if (!email) {
      setError("Email address is required to resend verification code.");
      setIsEditingEmail(true);
      return;
    }

    setResending(true);
    try {
      const res = await authService.resendOtp(email);
      setInfoMessage(res.message || "A fresh 4-digit verification code has been sent!");
      setCooldown(res.cooldownSeconds || 60);
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (err) {
      const msg = getErrorMessage(err);
      setError(msg);
    } finally {
      setResending(false);
    }
  };

  if (isVerified) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-[#E8DDD4] bg-white p-7 text-center shadow-[0_10px_35px_-10px_rgba(0,0,0,0.05)] sm:p-10">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A27E]">
          Account Verified
        </p>
        <h1 className="mt-1.5 text-2xl font-light tracking-tight text-[#1A1A1A] sm:text-3xl">
          Welcome to {SITE_NAME}
        </h1>
        <div className="mx-auto mt-3 h-px w-10 bg-[#C9A27E]" />
        <p className="mt-4 text-xs leading-relaxed text-[#1A1A1A]/60 sm:text-sm">
          Your email has been successfully verified. Redirecting you to your account...
        </p>
        <div className="mt-6 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-[#C9A27E]" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#E8DDD4] bg-white p-7 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.05)] sm:p-10">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A27E]/30 bg-[#F8F5F2]">
          <ShieldCheck className="h-5 w-5 text-[#C9A27E]" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A27E]">
          Security Verification
        </p>
        <h1 className="mt-1.5 text-2xl font-light tracking-tight text-[#1A1A1A] sm:text-3xl">
          Enter Verification Code
        </h1>
        <div className="mx-auto mt-3 h-px w-10 bg-[#C9A27E]" />

        {/* Email display / edit */}
        {!isEditingEmail && email ? (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#1A1A1A]/70">
            <Mail className="h-3.5 w-3.5 text-[#C9A27E]" />
            <span className="font-medium text-[#1A1A1A]">{email}</span>
            <button
              type="button"
              onClick={() => {
                setTempEmail(email);
                setIsEditingEmail(true);
              }}
              className="ml-1 inline-flex items-center text-[#C9A27E] hover:text-[#B8906A]"
              title="Change email address"
            >
              <Edit3 className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                className="h-9 text-xs rounded-lg border-[#E8DDD4]"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => {
                  if (tempEmail) {
                    setEmail(tempEmail);
                    setIsEditingEmail(false);
                  }
                }}
                className="h-9 text-xs"
              >
                Set
              </Button>
            </div>
          </div>
        )}
        <p className="mt-2 text-xs text-[#1A1A1A]/50">
          We&apos;ve sent a 4-digit code to your email address.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50/90 p-3.5 text-xs text-red-600">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          <p className="leading-relaxed">{error}</p>
        </div>
      )}

      {/* Info Alert */}
      {infoMessage && (
        <div className="mt-6 flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50/90 p-3.5 text-xs text-emerald-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
          <p className="leading-relaxed">{infoMessage}</p>
        </div>
      )}

      {/* OTP Input Form */}
      <form onSubmit={handleVerify} className="mt-6 space-y-6">
        <div className="space-y-2">
          <Label className="block text-center text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/70">
            4-Digit Code
          </Label>
          <div className="flex justify-center gap-3 sm:gap-4">
            {otp.map((digit, i) => (
              <Input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className="h-14 w-12 sm:w-14 rounded-xl border border-[#E8DDD4] bg-[#FAFAF8] text-center text-2xl font-bold tracking-widest text-[#1A1A1A] transition-all focus:border-[#C9A27E] focus:bg-white focus:ring-2 focus:ring-[#C9A27E]/30"
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Resend Cooldown */}
        <div className="text-center text-xs text-[#1A1A1A]/60">
          {cooldown > 0 ? (
            <p>
              Resend code in <span className="font-semibold text-[#1A1A1A]">{cooldown}s</span>
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="inline-flex items-center gap-1.5 font-medium text-[#C9A27E] transition-colors hover:text-[#B8906A] hover:underline"
            >
              <RefreshCw className={resending ? "h-3.5 w-3.5 animate-spin" : "h-3.5 w-3.5"} />
              {resending ? "Sending code..." : "Resend Verification Code"}
            </button>
          )}
        </div>

        {/* Verify Button */}
        <Button
          type="submit"
          variant="gold"
          disabled={loading || otp.join("").length !== 4}
          className="h-11 w-full rounded-lg text-xs font-semibold uppercase tracking-widest shadow-md transition-all duration-300 hover:shadow-lg disabled:opacity-50 sm:h-12"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Verify Code
              <ArrowRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Footer Navigation */}
      <div className="mt-8 border-t border-[#E8DDD4]/80 pt-6 text-center text-xs text-[#1A1A1A]/60 sm:text-sm">
        Already verified?{" "}
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
