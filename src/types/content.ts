import type { Category } from "./product";

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  buttonText?: string;
  link?: string;
  image?: string;
  mobileImage?: string;
  type: "hero" | "editorial" | "announcement";
  isActive: boolean;
  sortOrder: number;
  startsAt?: string;
  endsAt?: string;
  bgColor?: string;
  textColor?: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  customerImage?: string;
  location?: string;
  image?: string;
  videoUrl?: string;
  rating: number;
  content: string;
  type: "gallery" | "video" | "instagram" | "story";
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
}

export interface EditorialCollection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  productCount?: number;
}

export interface InstagramPost {
  id: string;
  image?: string;
  link?: string;
  likes?: number;
}

export interface Announcement {
  id: string;
  text: string;
  link?: string;
  cta?: string;
  isActive: boolean;
}

export interface NavChild {
  name: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  children?: NavChild[];
  sortOrder: number;
  isActive: boolean;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  shop?: FooterLink[];
  customerCare?: FooterLink[];
  about?: FooterLink[];
  newsletter?: string;
  copyright?: string;
}

export interface SocialLink {
  id?: string;
  platform?: string;
  name: string;
  url: string;
  icon?: string;
  isActive?: boolean;
  displayOrder?: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp?: string;
  address: string;
  hours?: string;
}

export interface PaymentMethodOption {
  id: "cod" | "card" | "bank_transfer" | "jazzcash" | "easypaisa";
  label: string;
  description?: string;
  enabled: boolean;
  sortOrder: number;
}

export interface ShippingSettings {
  standardCost: number;
  expressCost: number;
  freeShippingThreshold: number;
  codFee: number;
  codEnabled: boolean;
  advancedShippingEnabled: boolean;
  additionalShippingChargeEnabled: boolean;
  additionalShippingCharge: number;
  expressAdditionalChargeEnabled: boolean;
  expressAdditionalCharge: number;
  perItemChargeEnabled: boolean;
  perItemCharge: number;
  perKgChargeEnabled: boolean;
  perKgCharge: number;
}

export interface TaxSettings {
  rate: number;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  announcementMessages: Announcement[];
  navigation: NavItem[];
  socialLinks: SocialLink[];
  footerLinks: FooterConfig;
  contact: ContactInfo;
  paymentMethods: PaymentMethodOption[];
  shipping: ShippingSettings;
  tax: TaxSettings;
  brandTagline?: string;
  logoUrl?: string;
  instagramHandle?: string;
  freeShippingMessage?: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
}

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full_time" | "part_time" | "contract" | "internship";
  description: string;
  requirements: string[];
  isActive: boolean;
}

export interface CmsPage {
  id: string;
  title: string;
  slug: string;
  metaTitle?: string;
  metaDescription?: string;
  content: CmsSection[];
  isPublished: boolean;
}

export type CmsSectionType =
  | "hero"
  | "values"
  | "milestones"
  | "roles"
  | "perks"
  | "steps"
  | "list"
  | "chart"
  | "feature"
  | "policies"
  | "sections"
  | "text";

export interface CmsSectionItem {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  value?: string;
  meta?: string;
  keywords?: string[];
}

export interface CmsSection {
  id: string;
  type: CmsSectionType;
  title?: string;
  subtitle?: string;
  body?: string;
  items?: CmsSectionItem[];
}

export interface SizeGuideEntry {
  size: string;
  bust: string;
  waist: string;
  hips: string;
  length?: string;
  inseam?: string;
}

export interface SearchSuggestion {
  query: string;
  href?: string;
}

export interface CouponValidationResult {
  valid: boolean;
  code?: string;
  discount?: number;
  discountType?: "percentage" | "fixed";
  maxDiscount?: number;
  message?: string;
}

export type { Category };