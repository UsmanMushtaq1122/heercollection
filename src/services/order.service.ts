import { apiService } from "./api";
import type { Order, CreateOrderData, PaginatedResponse, OrderStatus, PaymentStatus } from "@/types";

function normalizeOrder(order: any): Order {
  if (!order) return order;
  return {
    ...order,
    status: (order.status ? String(order.status).toLowerCase() : "pending") as OrderStatus,
    paymentStatus: (order.paymentStatus ? String(order.paymentStatus).toLowerCase() : "pending") as PaymentStatus,
  };
}

class OrderService {
  async createOrder(data: CreateOrderData): Promise<Order> {
    const response = await apiService.post<Order>("/orders", data);
    return normalizeOrder(response);
  }

  async getOrders(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Order>> {
    return this.getMyOrders(page, limit);
  }

  async getOrderById(orderId: string): Promise<Order> {
    const response = await apiService.get<Order>(`/orders/${orderId}`);
    return normalizeOrder(response);
  }

  async cancelOrder(orderId: string, reason?: string): Promise<Order> {
    const response = await apiService.post<Order>(`/orders/${orderId}/cancel`, { reason });
    return normalizeOrder(response);
  }

  async getMyOrders(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResponse<Order>> {
    const response = await apiService.get<{
      orders: Order[];
      total: number;
      page: number;
      totalPages: number;
    }>(`/orders/my-orders?page=${page}&limit=${limit}`);
    return {
      data: (response.orders || []).map(normalizeOrder),
      total: response.total,
      page: response.page,
      limit,
      totalPages: response.totalPages,
      hasMore: response.page < response.totalPages,
    };
  }

  async trackOrder(orderNumber: string): Promise<Order | null> {
    const response = await apiService.get<Order | null>(`/orders/track/${orderNumber}`);
    return response ? normalizeOrder(response) : null;
  }
}

export const orderService = new OrderService();
