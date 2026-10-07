import { apiService } from "./api";

export interface ShippingQuote {
  deliveryMethod: "standard" | "express" | "store_pickup";
  baseCharge: number;
  additionalCharge: number;
  shippingCost: number;
  isFreeStandard: boolean;
  freeShippingThreshold: number;
}

export interface ShippingQuoteItem {
  productId: string;
  quantity: number;
}

class ShippingService {
  quote(items: ShippingQuoteItem[], deliveryMethod: ShippingQuote["deliveryMethod"]) {
    return apiService.post<ShippingQuote>("/orders/shipping-quote", {
      items,
      deliveryMethod,
    });
  }
}

export const shippingService = new ShippingService();
