import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import VerifyOtpForm from "@/components/auth/VerifyOtpForm";
import { SITE_NAME } from "@/lib/constants";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Verify Email",
  description: `Verify your ${SITE_NAME} account email with a one-time verification code.`,
};

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F2]">
      {/* Navigation Header */}
      <header className="sticky top-0 z-20 border-b border-[#E8DDD4] bg-[#F8F5F2]/90 px-6 py-4 backdrop-blur-md">
        <Link
          href="/"
          className="text-sm font-light tracking-[0.25em] text-[#1A1A1A] transition-colors hover:text-[#C9A27E]"
        >
          {SITE_NAME}
        </Link>
      </header>

      {/* Centered Main Area */}
      <main className="flex min-h-[calc(100vh-65px)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="flex h-64 w-full max-w-md items-center justify-center rounded-2xl border border-[#E8DDD4] bg-white">
              <Loader2 className="h-6 w-6 animate-spin text-[#C9A27E]" />
            </div>
          }
        >
          <VerifyOtpForm />
        </Suspense>
      </main>
    </div>
  );
}