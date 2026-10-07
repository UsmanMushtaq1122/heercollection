import api from "@/lib/axios";
import type { AxiosRequestConfig } from "axios";

function unwrapApiPayload<T>(payload: T | { success?: boolean; data?: T }): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    Object.prototype.hasOwnProperty.call(payload, "data")
  ) {
    return (payload as { data?: T }).data as T;
  }

  return payload as T;
}

class ApiService {
  private readonly pendingGets = new Map<string, Promise<unknown>>();

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const key = `${url}|${JSON.stringify(config?.params ?? {})}`;
    const pending = this.pendingGets.get(key);
    if (pending) return pending as Promise<T>;

    const request = api
      .get<T | { success?: boolean; data?: T }>(url, config)
      .then((response) => unwrapApiPayload<T>(response.data))
      .finally(() => this.pendingGets.delete(key));

    this.pendingGets.set(key, request);
    return request;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.post<T | { success?: boolean; data?: T }>(url, data, config);
    return unwrapApiPayload<T>(response.data);
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.put<T | { success?: boolean; data?: T }>(url, data, config);
    return unwrapApiPayload<T>(response.data);
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.patch<T | { success?: boolean; data?: T }>(url, data, config);
    return unwrapApiPayload<T>(response.data);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await api.delete<T | { success?: boolean; data?: T }>(url, config);
    return unwrapApiPayload<T>(response.data);
  }
}

export const apiService = new ApiService();
