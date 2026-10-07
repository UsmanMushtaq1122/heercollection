import type { Address, User } from "./user";
import type { Product } from "./product";

export interface Order {
  id: string;
  orderNumber: string;
  user: User;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  subtotal: number;
  shippingCost: number;
  shippingBreakdown?: {
    deliveryMethod?: "standard" | "express" | "store_pickup";
    baseCharge?: number;
    additionalCharge?: number;
    shippingCost?: number;
    isFreeStandard?: boolean;
  };
  codFee?: number;
  tax: number;
  discount: number;
  total: number;
  currency: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  trackingNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentMethod = "cod" | "card" | "payfast" | "bank_transfer" | "jazzcash" | "easypaisa";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface CreateOrderData {
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: Omit<Address, "id" | "isDefault"> & {
    email?: string;
    addressLine1?: string;
    address1?: string;
  };
  billingAddress?: Omit<Address, "id" | "isDefault"> & {
    email?: string;
    addressLine1?: string;
    address1?: string;
  };
  paymentMethod: PaymentMethod;
  deliveryMethod?: "standard" | "store_pickup" | "express";
  notes?: string;
  couponCode?: string;
}
