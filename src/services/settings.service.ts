import { apiService } from "./api";
import type { SiteSettings } from "@/types/content";

class SettingsService {
  async getSiteSettings(): Promise<SiteSettings> {
    return apiService.get<SiteSettings>("/settings");
  }

  async getStoreSettings(): Promise<SiteSettings> {
    const settings = await apiService.get<SiteSettings & {
      shipping?: {
        standardCost?: number;
        expressCost?: number;
        shippingCost?: number;
        expressShippingCost?: number;
        freeShippingThreshold?: number;
        codFee?: number;
        codEnabled?: boolean;
        advancedShippingEnabled?: boolean;
        additionalShippingChargeEnabled?: boolean;
        additionalShippingCharge?: number;
        expressAdditionalChargeEnabled?: boolean;
        expressAdditionalCharge?: number;
        perItemChargeEnabled?: boolean;
        perItemCharge?: number;
        perKgChargeEnabled?: boolean;
        perKgCharge?: number;
      };
    }>("/settings");
    const shipping = settings.shipping;

    return {
      ...settings,
      socialLinks: Array.isArray(settings.socialLinks)
        ? settings.socialLinks.map((link) => ({
            ...link,
            name: link.platform || link.name,
          }))
        : [],
      shipping: {
        standardCost: shipping?.standardCost ?? shipping?.shippingCost ?? 199,
        expressCost: shipping?.expressCost ?? shipping?.expressShippingCost ?? 399,
        freeShippingThreshold: shipping?.freeShippingThreshold ?? 5000,
        codFee: shipping?.codFee ?? 0,
        codEnabled: shipping?.codEnabled ?? false,
        advancedShippingEnabled: shipping?.advancedShippingEnabled ?? false,
        additionalShippingChargeEnabled: shipping?.additionalShippingChargeEnabled ?? false,
        additionalShippingCharge: shipping?.additionalShippingCharge ?? 0,
        expressAdditionalChargeEnabled: shipping?.expressAdditionalChargeEnabled ?? false,
        expressAdditionalCharge: shipping?.expressAdditionalCharge ?? 0,
        perItemChargeEnabled: shipping?.perItemChargeEnabled ?? false,
        perItemCharge: shipping?.perItemCharge ?? 0,
        perKgChargeEnabled: shipping?.perKgChargeEnabled ?? false,
        perKgCharge: shipping?.perKgCharge ?? 0,
      },
    };
  }
}

export const settingsService = new SettingsService();