"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn, Gem, Loader2, AlertCircle } from "lucide-react";
import {
  loginSchema,
  type LoginInput,
} from "@/lib/validations";
import { SITE_NAME } from "@/lib/constants";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";
import { getErrorMessage } from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";

  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginInput) => {
    setError("");
    setLoading(true);
    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
      });

      if (response.requiresOtpVerification) {
        router.push(`/auth/verify-otp?email=${encodeURIComponent(data.email)}`);
        return;
      }

      if (response.user) {
        login(response.user);
        router.push(redirectUrl.startsWith("/") ? redirectUrl : "/account");
      }
    } catch (err) {
      let message = getErrorMessage(err);
      if (
        message.toLowerCase().includes("invalid email or password") ||
        message.toLowerCase().includes("401") ||
        message.toLowerCase().includes("unauthorized")
      ) {
        message = "The email or password you entered is incorrect. Please try again.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#E8DDD4] bg-white p-7 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.05)] sm:p-10">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A27E]/30 bg-[#F8F5F2]">
          <Gem className="h-5 w-5 text-[#C9A27E]" />
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C9A27E]">
          Welcome Back
        </p>
        <h1 className="mt-1.5 text-2xl font-light tracking-tight text-[#1A1A1A] sm:text-3xl">
          Sign In
        </h1>
        <div className="mx-auto mt-3 h-px w-10 bg-[#C9A27E]" />
        <p className="mx-auto mt-3 max-w-xs text-xs text-[#1A1A1A]/60 sm:text-sm">
          Sign in to your {SITE_NAME} account to manage orders, addresses, and wishlist.
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

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-[#1A1A1A]/70">
              Password
            </Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs font-medium text-[#C9A27E] transition-colors hover:text-[#B8906A] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
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
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex cursor-pointer items-center gap-2.5 text-xs text-[#1A1A1A]/70">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-[#E8DDD4] accent-[#C9A27E] cursor-pointer"
            />
            <span>Remember me</span>
          </label>
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
              Signing In...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </span>
          )}
        </Button>
      </form>

      {/* Footer link */}
      <div className="mt-8 border-t border-[#E8DDD4]/80 pt-6 text-center text-xs text-[#1A1A1A]/60 sm:text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-semibold text-[#C9A27E] transition-colors hover:text-[#B8906A] hover:underline"
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}