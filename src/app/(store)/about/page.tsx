import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { SITE_NAME } from "@/lib/constants";
import {
  Sparkles,
  Scissors,
  Gem,
  Heart,
  Award,
  ArrowRight,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: `About Heer | ${SITE_NAME}`,
  description:
    "Discover the story behind Heer Collection — where timeless Pakistani craftsmanship, master karigars, and pure silks meet contemporary luxury couture.",
};

const PILLARS = [
  {
    icon: Gem,
    title: "Ancestral Craftsmanship",
    description:
      "Every creation celebrates centuries of South Asian needlecraft. From intricate Zardozi and Tilla metallic embroidery to delicate Aari and Marori threadwork, our artisans preserve heritage art forms.",
  },
  {
    icon: Scissors,
    title: "Pure & Ethical Textiles",
    description:
      "We source only authentic, breathable luxury fabrics: pure mulberry silks, hand-loomed raw silks, fine tissue organzas, and handcrafted velvets with zero compromises on tactile luxury.",
  },
  {
    icon: Heart,
    title: "Artisan Empowerment",
    description:
      "Behind every garment are master karigars in our Lahore, Multan, and Karachi studios. We foster fair living wages, ethical atelier conditions, and continuous craft apprenticeship for the next generation.",
  },
  {
    icon: Award,
    title: "Modern South Asian Grace",
    description:
      "Tradition meets progressive tailoring. We craft relaxed, fluid, architectural silhouettes designed for the confident, worldly South Asian woman celebrating life's most unforgettable milestones.",
  },
];

const JOURNEY_STEPS = [
  {
    number: "01",
    title: "Inspiration & Archival Sketching",
    description:
      "Each season begins in our design library, drawing from Mughal floral motifs, historic poetry, and vintage tapestries before rendering hand-drawn sketches.",
  },
  {
    number: "02",
    title: "Pure Fiber Selection & Bespoke Dyeing",
    description:
      "Raw silks, organzas, and chiffons are weighed, tested for drape, and dyed by hand in bespoke pigment pots to achieve our signature muted pastel and regal jewel tones.",
  },
  {
    number: "03",
    title: "Frame-Mounted Adda Hand Embroidery",
    description:
      "Artisans stretch panels onto wooden karchob frames, delicately applying dabka, pearls, cut-dana, and metallic tilla over dozens of concentrated hours.",
  },
  {
    number: "04",
    title: "Master Tailoring & Structural Draping",
    description:
      "Cut and stitched by master ustaads, each panel is assembled with French seams, concealed zippers, and pure silk linings to ensure an immaculate, flattering fit.",
  },
  {
    number: "05",
    title: "Gold Thread Inspection & Packaging",
    description:
      "Every piece undergoes rigorous inspection before being scented, hand-steamed, and wrapped in our signature Heer garment bag and keepsake box.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F2]/60 pb-20">
      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "About Heer" },
          ]}
        />
      </div>

      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-[#E8DDD4] bg-white py-20 sm:py-28">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-block text-[11px] font-medium uppercase tracking-[0.25em] text-[#C9A27E]">
            The Atelier Story
          </span>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-tight text-[#1A1A1A] sm:text-5xl md:text-6xl">
            The World of Heer
          </h1>
          <div className="mx-auto mt-4 h-0.5 w-16 bg-[#C9A27E]" />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#1A1A1A]/70 sm:text-lg">
            Where centuries of ancestral Pakistani craftsmanship seamlessly
            intertwine with contemporary luxury silhouettes.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/collections">
              <Button className="bg-[#1A1A1A] text-xs font-medium uppercase tracking-widest text-white hover:bg-[#1A1A1A]/90">
                Explore Lookbook
                <ArrowRight className="ml-2 h-4 w-4 text-[#C9A27E]" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-[#E8DDD4] bg-white text-xs font-medium uppercase tracking-widest text-[#1A1A1A] hover:bg-[#F8F5F2]"
              >
                Book Bridal Consultation
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Counter Bar */}
      <section className="border-b border-[#E8DDD4] bg-[#F8F5F2]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            <div className="rounded-sm border border-[#E8DDD4] bg-white p-6">
              <p className="font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
                25+
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-[#C9A27E]">
                Years of Heritage Guilds
              </p>
            </div>
            <div className="rounded-sm border border-[#E8DDD4] bg-white p-6">
              <p className="font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
                100%
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-[#C9A27E]">
                Pure Sourced Silks
              </p>
            </div>
            <div className="rounded-sm border border-[#E8DDD4] bg-white p-6">
              <p className="font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
                40+
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-[#C9A27E]">
                Countries Delivered
              </p>
            </div>
            <div className="rounded-sm border border-[#E8DDD4] bg-white p-6">
              <p className="font-serif text-3xl font-bold text-[#1A1A1A] sm:text-4xl">
                10,000+
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-[#C9A27E]">
                Celebrations Adorned
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section: The Soul of Heer */}
      <main className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A27E]">
              Our Origins
            </span>
            <h2 className="mt-2 font-serif text-3xl font-light text-[#1A1A1A] sm:text-4xl">
              Rooted in Poetry, Reimagined for Tomorrow
            </h2>
            <div className="mt-3 h-0.5 w-12 bg-[#C9A27E]" />
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#1A1A1A]/75">
              <p>
                Heer Collection draws its name from the legendary Punjabi heroine whose
                grace, courage, and uncompromising individuality have echoed across centuries of
                South Asian folklore.
              </p>
              <p>
                Established with a singular mission: to liberate traditional festive wear from
                fleeting fast-fashion trends and restore it to its rightful place as wearable
                art. In our ateliers, garments are not simply stitched; they are patiently
                crafted by master artisans who have inherited needlecraft traditions passed
                down through generations.
              </p>
              <p>
                From effortless pret kurtas to regal bridal lehengas, every Heer silhouette
                carries an unmistakable reverence for detail, timeless draping, and quiet luxury.
              </p>
            </div>
          </div>

          <div className="rounded-sm border border-[#C9A27E]/30 bg-gradient-to-br from-[#E8DDD4] to-[#F5EDE4] p-8 sm:p-12">
            <Sparkles className="h-8 w-8 text-[#C9A27E]" />
            <blockquote className="mt-4 font-serif text-xl font-light italic leading-relaxed text-[#1A1A1A] sm:text-2xl">
              &ldquo;We don&apos;t just design clothes for an occasion; we create
              heirlooms that carry stories of heritage, dignity, and personal celebration.&rdquo;
            </blockquote>
            <div className="mt-6 border-t border-[#1A1A1A]/10 pt-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]">
                The Heer Atelier
              </p>
              <p className="text-xs text-[#1A1A1A]/50">Lahore, Pakistan</p>
            </div>
          </div>
        </section>

        {/* 4 Pillars of Excellence */}
        <section aria-labelledby="pillars-heading">
          <div className="text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A27E]">
              Our Philosophy
            </span>
            <h2 id="pillars-heading" className="mt-2 font-serif text-3xl font-light text-[#1A1A1A] sm:text-4xl">
              The Four Pillars of Heer
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-12 bg-[#C9A27E]" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-sm border border-[#E8DDD4] bg-white p-7 shadow-xs transition-all hover:border-[#C9A27E]/50 hover:shadow-md"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8DDD4] text-[#C9A27E]">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-base font-semibold text-[#1A1A1A]">
                      {pillar.title}
                    </h3>
                    <div className="mt-2 h-0.5 w-8 bg-[#C9A27E]" />
                    <p className="mt-3 text-xs leading-relaxed text-[#1A1A1A]/65">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* The Craftsmanship Journey */}
        <section aria-labelledby="journey-heading" className="rounded-sm border border-[#E8DDD4] bg-white p-8 sm:p-14 shadow-xs">
          <div className="text-center">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A27E]">
              Atelier Process
            </span>
            <h2 id="journey-heading" className="mt-2 font-serif text-3xl font-light text-[#1A1A1A] sm:text-4xl">
              The Journey of a Heer Ensemble
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-12 bg-[#C9A27E]" />
            <p className="mx-auto mt-4 max-w-xl text-xs text-[#1A1A1A]/60">
              Each garment takes between 40 to 300 hours of devoted craftsmanship before it reaches your hands.
            </p>
          </div>

          <div className="mt-12 space-y-6">
            {JOURNEY_STEPS.map((step) => (
              <div
                key={step.number}
                className="flex flex-col gap-4 rounded-sm border border-[#E8DDD4]/80 bg-[#F8F5F2]/40 p-5 sm:flex-row sm:items-center sm:gap-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C9A27E] bg-white font-serif text-lg font-light text-[#C9A27E]">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1A1A1A]">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#1A1A1A]/70">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Flagship Atelier & Bridal Studio */}
        <section className="rounded-sm border border-[#C9A27E]/30 bg-[#F5EDE4]/70 p-8 sm:p-12">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#B8906A]">
                Flagship Studio
              </span>
              <h2 className="mt-2 font-serif text-2xl font-light text-[#1A1A1A] sm:text-3xl">
                Visit Our Lahore Atelier
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/70">
                Experience the fabrics, view our bridal archives, and enjoy a private
                consultation with our senior styling team at our flagship atelier in Gulberg,
                Lahore. We also host virtual video consultations for our valued overseas brides.
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-[#1A1A1A]/80">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#C9A27E]" />
                  <span>Main Boulevard, Gulberg III, Lahore, Pakistan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#C9A27E]" />
                  <span>Monday &ndash; Saturday: 11:00 AM &ndash; 8:00 PM PKT</span>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/contact">
                  <Button className="bg-[#1A1A1A] text-xs font-medium uppercase tracking-widest text-white hover:bg-[#1A1A1A]/90">
                    Book an Appointment
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-3 rounded-sm border border-[#E8DDD4] bg-white p-6 shadow-xs">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]">
                The Heer Promise
              </h3>
              <ul className="space-y-3 text-xs text-[#1A1A1A]/70">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Transparent provenance with no outsourced sweatshop manufacturing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Complimentary personalized sizing consultations for bridal clients</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Worldwide express courier delivery with doorstep insurance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Lifetime care guidelines and styling support for every heirloom</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="rounded-sm border border-[#E8DDD4] bg-white p-8 text-center sm:p-14">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#C9A27E]">
            Curated Elegance
          </span>
          <h2 className="mt-2 font-serif text-3xl font-light text-[#1A1A1A] sm:text-4xl">
            Discover the Latest Heer Collections
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#1A1A1A]/60">
            From breezy daytime cottons to regal festive silk ensembles, explore our
            newest seasonal edits handcrafted for your special moments.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/collections">
              <Button className="bg-[#1A1A1A] text-xs font-medium uppercase tracking-widest text-white hover:bg-[#1A1A1A]/90">
                Shop Collections
              </Button>
            </Link>
            <Link href="/category/pret">
              <Button variant="outline" className="border-[#E8DDD4] text-xs font-medium uppercase tracking-widest text-[#1A1A1A]">
                Explore Pret-a-Porter
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}