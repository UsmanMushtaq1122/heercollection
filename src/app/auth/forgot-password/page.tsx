import type { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: `Reset your ${SITE_NAME} account password.`,
};

export default function ForgotPasswordPage() {
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
        <ForgotPasswordForm />
      </main>
    </div>
  );
}
