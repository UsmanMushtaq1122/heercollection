import { apiService } from "./api";
import type {
  CmsPage,
  Faq,
  Career,
  SizeGuideEntry,
  CouponValidationResult,
  SearchSuggestion,
} from "@/types/content";


class CmsService {
  async getPage(slug: string): Promise<CmsPage> {
    const page = await apiService.get<{
      id: string;
      title: string;
      slug: string;
      content?: string | null;
      published: boolean;
      metaTitle?: string | null;
      metaDescription?: string | null;
    }>(`/pages/by-slug/${encodeURIComponent(slug)}`);

    let content: CmsPage["content"] = [];
    if (page.content) {
      try {
        const parsed = JSON.parse(page.content);
        content = Array.isArray(parsed) ? parsed : [{ id: "content", type: "text", body: page.content }];
      } catch {
        content = [{ id: "content", type: "text", body: page.content }];
      }
    }

    return {
      id: page.id,
      title: page.title,
      slug: page.slug,
      content,
      isPublished: page.published,
      metaTitle: page.metaTitle || undefined,
      metaDescription: page.metaDescription || undefined,
    };
  }

  async getFaqs(category?: string): Promise<Faq[]> {
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    return apiService.get<Faq[]>(`/faqs${query}`);
  }

  async getCareers(): Promise<Career[]> {
    return apiService.get<Career[]>("/careers");
  }

  async getSizeGuide(): Promise<SizeGuideEntry[]> {
    const response = await apiService.get<{ sizeGuide?: SizeGuideEntry[] }>("/settings/size-guide");
    return response.sizeGuide || [];
  }
}

class CouponService {
  async validate(code: string, subtotal: number): Promise<CouponValidationResult> {
    const response = await apiService.post<{
      code: string;
      type: "PERCENTAGE" | "FIXED";
      value: number;
      discountAmount: number;
      message: string;
    }>("/coupons/validate", {
      code,
      orderTotal: subtotal,
    });
    return {
      valid: true,
      code: response.code,
      discount: response.discountAmount,
      discountType: response.type.toLowerCase() as "percentage" | "fixed",
      message: response.message,
    };
  }
}

class SearchService {
  async getSuggestions(query: string): Promise<SearchSuggestion[]> {
    const response = await apiService.get<{ products: Array<{ name: string; slug: string }> }>(
      `/products/search?q=${encodeURIComponent(query)}&limit=6`
    );
    return response.products.map((product) => ({
      query: product.name,
      href: `/product/${encodeURIComponent(product.slug)}`,
    }));
  }

  async getTrendingSearches(): Promise<SearchSuggestion[]> {
    const response = await apiService.get<{ products: Array<{ name: string; slug: string }> }>(
      "/products?limit=6&sortBy=createdAt&sortOrder=desc"
    );
    return response.products.map((product) => ({
      query: product.name,
      href: `/product/${encodeURIComponent(product.slug)}`,
    }));
  }
}

class NewsletterService {
  async subscribe(email: string): Promise<{ message: string }> {
    return apiService.post<{ message: string }>("/newsletter", { email });
  }
}

export const cmsService = new CmsService();
export const couponService = new CouponService();
export const searchService = new SearchService();
export const newsletterService = new NewsletterService();
