import { apiService } from "./api";
import type {
  Banner,
  Testimonial,
  EditorialCollection,
  InstagramPost,
} from "@/types/content";

class ContentService {
  async getHeroBanners(): Promise<Banner[]> {
    return apiService.get<Banner[]>("/banners?type=hero");
  }

  async getEditorialBanners(): Promise<Banner[]> {
    return apiService.get<Banner[]>("/banners?type=editorial");
  }

  async getAnnouncementBars(): Promise<Banner[]> {
    return apiService.get<Banner[]>("/banners?type=announcement");
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return apiService.get<Testimonial[]>("/testimonials");
  }

  async getCollections(): Promise<EditorialCollection[]> {
    const items = await apiService.get<Array<{
      id: string;
      title: string;
      description?: string | null;
      imageUrl?: string | null;
      isActive?: boolean;
      sortOrder?: number;
    }>>("/editorial");
    return items.map((item) => ({
      id: item.id,
      name: item.title,
      slug: item.id,
      description: item.description || undefined,
      image: item.imageUrl || undefined,
      isActive: item.isActive ?? true,
      sortOrder: item.sortOrder ?? 0,
    }));
  }

  async getCollectionBySlug(slug: string): Promise<EditorialCollection> {
    const item = await apiService.get<{
      id: string;
      title: string;
      description?: string | null;
      imageUrl?: string | null;
      isActive?: boolean;
      sortOrder?: number;
    }>(`/editorial/${encodeURIComponent(slug)}`);
    return {
      id: item.id,
      name: item.title,
      slug: item.id,
      description: item.description || undefined,
      image: item.imageUrl || undefined,
      isActive: item.isActive ?? true,
      sortOrder: item.sortOrder ?? 0,
    };
  }

  async getInstagramFeed(): Promise<InstagramPost[]> {
    // Instagram has no backend resource yet; expose an empty state rather than
    // issuing a guaranteed 404 request on every page load.
    return [];
  }
}

export const contentService = new ContentService();
