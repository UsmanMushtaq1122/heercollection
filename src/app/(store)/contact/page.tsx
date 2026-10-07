"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";
import { contactFormSchema, type ContactFormInput } from "@/lib/validations";
import { useSiteSettings } from "@/hooks";
import { contactService } from "@/services/contact.service";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import SocialLinks from "@/components/common/SocialLinks";
import { isVisibleSocialLink } from "@/components/common/SocialIcon";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { settings } = useSiteSettings();
  const contact = settings?.contact;

  const CONTACT_INFO = [
    {
      icon: Mail,
      label: "Email",
      value: contact?.email ?? "N/A",
      href: contact?.email ? `mailto:${contact.email}` : null,
    },
    {
      icon: Phone,
      label: "Phone",
      value: contact?.phone ?? "N/A",
      href: contact?.phone ? `tel:${contact.phone}` : null,
    },
    {
      icon: MapPin,
      label: "Address",
      value: contact?.address ?? "N/A",
      href: null,
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: contact?.hours ?? "N/A",
      href: null,
    },
  ].filter((info) => info.value !== "N/A");

  const socialLinks = Array.isArray(settings?.socialLinks)
    ? settings.socialLinks
    : [];
  const hasSocialLinks = socialLinks.some(isVisibleSocialLink);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactFormInput) => {
    setSubmitError("");
    try {
      await contactService.submit(data);
      setSubmitted(true);
      reset();
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Could not send your message. Please try again.";
      setSubmitError(message);
    }
  };

  return (
    <section>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      />

      {/* Hero */}
      <div className="relative overflow-hidden bg-[#E8DDD4] py-20">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #E8DDD4 0%, #d4c5b8 50%, #C9A27E22 100%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-light tracking-wide text-[#1A1A1A] md:text-5xl">
            Get in Touch
          </h1>
          <div className="mx-auto mt-4 h-px w-16 bg-[#C9A27E]" />
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#1A1A1A]/70">
            Have a question about an order, need styling advice, or want to
            collaborate? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <h2 className="text-lg font-light text-[#1A1A1A]">Send Us a Message</h2>
            <div className="mb-8 mt-3 h-px w-12 bg-[#C9A27E]" />

            {submitted ? (
              <div className="rounded-sm border border-[#C9A27E]/20 bg-[#C9A27E]/5 p-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C9A27E]/10">
                  <CheckCircle className="h-8 w-8 text-[#C9A27E]" />
                </div>
                <h3 className="mt-4 text-lg font-light text-[#1A1A1A]">
                  Message Sent Successfully
                </h3>
                <p className="mt-2 text-sm text-[#1A1A1A]/60">
                  Thank you for reaching out. Our team will get back to you within
                  24 hours.
                </p>
                <Button
                  variant="gold"
                  className="mt-6 text-xs font-medium uppercase tracking-widest"
                  onClick={() => setSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      {...register("name")}
                      className={cn(errors.name && "border-red-400")}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      {...register("email")}
                      className={cn(errors.email && "border-red-400")}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    {...register("subject")}
                    className={cn(errors.subject && "border-red-400")}
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    {...register("message")}
                    className={cn(
                      "resize-none",
                      errors.message && "border-red-400"
                    )}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>

                {submitError && (
                  <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600">
                    {submitError}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="gold"
                  disabled={isSubmitting}
                  className="h-12 w-full text-xs font-medium uppercase tracking-widest"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-light text-[#1A1A1A]">Contact Information</h2>
              <div className="mb-8 mt-3 h-px w-12 bg-[#C9A27E]" />

              <div className="space-y-6">
                {CONTACT_INFO.map((info) => {
                  const Icon = info.icon;
                  const Content = (
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#E8DDD4]">
                        <Icon className="h-5 w-5 text-[#C9A27E]" />
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-widest text-[#1A1A1A]/50">
                          {info.label}
                        </p>
                        <p className="mt-1 text-sm text-[#1A1A1A]">{info.value}</p>
                      </div>
                    </div>
                  );

                  return info.href ? (
                    <a key={info.label} href={info.href} className="block transition-opacity hover:opacity-80">
                      {Content}
                    </a>
                  ) : (
                    <div key={info.label}>{Content}</div>
                  );
                })}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="overflow-hidden rounded-sm border border-[#E8DDD4]">
              <div
                className="flex h-64 items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #E8DDD4 0%, #d4c5b8 50%, #C9A27E22 100%)",
                }}
              >
                <div className="text-center">
                  <MapPin className="mx-auto h-8 w-8 text-[#C9A27E]/50" />
                  <p className="mt-2 text-sm font-medium text-[#1A1A1A]/30">
                    Interactive Map
                  </p>
                  <p className="mt-1 text-xs text-[#1A1A1A]/20">
                    Gulberg III, Lahore
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-widest text-[#1A1A1A]/60">
                Follow Us
              </h3>
              <div className="mt-4 flex gap-3">
                {!hasSocialLinks ? (
                  <p className="text-sm text-[#1A1A1A]/40">No social links available.</p>
                ) : (
                  <SocialLinks
                    links={socialLinks}
                    className="mt-4 flex flex-wrap gap-3"
                    linkClassName="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8DDD4] text-[#1A1A1A]/60 transition-all duration-300 hover:border-[#C9A27E] hover:text-[#C9A27E]"
                    iconClassName="h-4 w-4"
                    useBrandColors={false}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
