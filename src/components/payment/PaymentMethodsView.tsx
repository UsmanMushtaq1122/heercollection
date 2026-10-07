"use client";

import { motion } from "framer-motion";
import {
  Banknote,
  CreditCard,
  Smartphone,
  Wallet,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { EASE_LUXURY } from "@/lib/constants";
import Reveal from "./Reveal";
import PaymentMethodsGrid from "./PaymentMethodsGrid";
import PaymentSecurity from "./PaymentSecurity";
import PaymentTimeline from "./PaymentTimeline";
import PaymentFaq from "./PaymentFaq";
import NeedHelp from "./NeedHelp";

const PAYMENT_CHIPS = [
  { icon: Banknote, label: "Cash on Delivery" },
  { icon: CreditCard, label: "Visa / Mastercard" },
  { icon: Smartphone, label: "Easypaisa" },
  { icon: Wallet, label: "JazzCash" },
  { icon: Landmark, label: "Bank Transfer" },
];

export default function PaymentMethodsView() {
  return (
    <>
      {/* Hero Section */}
      <header
        aria-labelledby="payment-methods-title"
        className="relative overflow-hidden bg-[#1A1A1A] px-4 py-20 sm:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(50% 70% at 50% 0%, rgba(201,162,126,0.20) 0%, transparent 60%), radial-gradient(45% 55% at 90% 95%, rgba(201,162,126,0.12) 0%, transparent 60%), radial-gradient(35% 45% at 5% 25%, rgba(232,221,212,0.10) 0%, transparent 60%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A27E] to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-24 w-[60%] -translate-x-1/2 translate-y-1/2 rounded-[100%] bg-[#C9A27E]/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_LUXURY }}
            className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C9A27E]"
          >
            Secure Shopping Experience
          </motion.p>

          <motion.h1
            id="payment-methods-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_LUXURY, delay: 0.1 }}
            className="mt-4 font-serif text-4xl font-light tracking-tight text-[#F8F5F2] sm:text-5xl md:text-6xl"
          >
            Payment Methods
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: EASE_LUXURY, delay: 0.35 }}
            className="mx-auto mt-6 h-0.5 w-20 bg-[#C9A27E]"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_LUXURY, delay: 0.45 }}
            className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#F8F5F2]/65 sm:text-base"
          >
            Simple, secure, and convenient ways to pay for your Heer Collection
            order — so you can shop with complete peace of mind.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_LUXURY, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            {PAYMENT_CHIPS.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full border border-[#F8F5F2]/15 bg-[#F8F5F2]/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-[#F8F5F2]/70"
              >
                <chip.icon className="h-4 w-4 text-[#C9A27E]" strokeWidth={1.5} />
                {chip.label}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE_LUXURY, delay: 0.8 }}
            className="mt-10 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A27E]/80"
          >
            <ShieldCheck className="h-4 w-4" strokeWidth={1.5} />
            100% Secure & Trusted Checkout
          </motion.div>
        </div>
      </header>

      {/* Introduction Section */}
      <section
        aria-label="About our payment options"
        className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16"
      >
        <Reveal>
          <p className="font-serif text-xl font-light leading-relaxed tracking-wide text-[#1A1A1A] sm:text-2xl">
            At Heer Collection, we offer secure and convenient payment options
            to ensure a seamless shopping experience for our customers across
            Pakistan.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-6 h-px w-12 bg-[#C9A27E]" />
        </Reveal>
      </section>

      <main className="space-y-20 pb-24 sm:space-y-24">
        <PaymentMethodsGrid />
        <PaymentSecurity />
        <PaymentTimeline />
        <PaymentFaq />
        <NeedHelp />
      </main>
    </>
  );
}