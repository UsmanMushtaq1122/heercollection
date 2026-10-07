"use client";

import { FormEvent, useState } from "react";
import { newsletterService } from "@/services/cms.service";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      await newsletterService.subscribe(email.trim());
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section aria-labelledby="mobile-newsletter-title" className="pt-2">
      <h2 id="mobile-newsletter-title" className="text-center text-lg font-medium text-[#111111]">
        Subscribe to our newsletter
      </h2>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
        <label htmlFor="mobile-newsletter-email" className="sr-only">Enter your email</label>
        <input
          id="mobile-newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          className="min-h-12 w-full rounded-xl border border-[#E5E5E5] bg-white px-4 text-[15px] text-[#111111] outline-none placeholder:text-[#999999] focus:border-[#C9A27E] focus:ring-2 focus:ring-[#C9A27E]/20"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-h-12 w-full rounded-xl bg-[#111111] px-5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#C9A27E] disabled:cursor-wait disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      <p role="status" className="mt-3 min-h-5 text-center text-xs text-[#666666]">
        {status === "success" && "You're subscribed. Thank you."}
        {status === "error" && "We couldn't subscribe you right now. Please try again."}
      </p>
    </section>
  );
}
