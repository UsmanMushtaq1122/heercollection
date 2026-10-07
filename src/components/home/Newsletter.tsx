"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Check, AlertCircle } from "lucide-react";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newsletterService } from "@/services/cms.service";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterInput>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterInput) => {
    setSubmitError(null);
    try {
      await newsletterService.subscribe(data.email);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setSubmitError("We couldn't subscribe you right now. Please try again.");
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#E8DDD4]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium uppercase tracking-[0.3em] text-[#C9A27E] mb-3"
          >
            Newsletter
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-wide text-[#1A1A1A]"
          >
            Join Our World
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-[#1A1A1A]/60 leading-relaxed"
          >
            Be the first to discover new collections, exclusive offers, and styling
            inspiration delivered straight to your inbox.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/80 border-[#C9A27E]/20 focus-visible:ring-[#C9A27E] h-12"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 text-left">
                  {errors.email.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              variant="gold"
              size="lg"
              disabled={isSubmitting}
              className="h-12 px-8 shrink-0"
            >
              {submitted ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Subscribed!
                </>
              ) : isSubmitting ? (
                "Subscribing..."
              ) : (
                <>
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.form>

          {submitError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-xs text-red-500 flex items-center justify-center gap-1.5"
            >
              <AlertCircle className="h-3.5 w-3.5" />
              {submitError}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-[11px] text-[#1A1A1A]/30"
          >
            By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
