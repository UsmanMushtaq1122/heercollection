import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "./constants";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("heer-auth-token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      _rateLimitRetry?: boolean;
    };

    if (error.response?.status === 429 && !originalRequest._rateLimitRetry) {
      originalRequest._rateLimitRetry = true;
      const retryAfter = Number(error.response.headers["retry-after"]);
      const delay = Number.isFinite(retryAfter)
        ? Math.min(Math.max(retryAfter * 1000, 250), 2000)
        : 500;
      await new Promise((resolve) => setTimeout(resolve, delay));
      return api(originalRequest);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (typeof window !== "undefined") {
        const refreshToken = localStorage.getItem("heer-refresh-token");
        if (refreshToken) {
          try {
            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refreshToken,
            });
            const payload = response.data as {
              data?: { token?: string; refreshToken?: string };
              token?: string;
              refreshToken?: string;
            };
            const token = payload.data?.token ?? payload.token;
            const nextRefreshToken = payload.data?.refreshToken ?? payload.refreshToken;
            if (!token) {
              throw new Error("Refresh response did not include an access token");
            }
            localStorage.setItem("heer-auth-token", token);
            if (nextRefreshToken) {
              localStorage.setItem("heer-refresh-token", nextRefreshToken);
            }
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          } catch {
            localStorage.removeItem("heer-auth-token");
            localStorage.removeItem("heer-refresh-token");
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination
            window.location.href = "/auth/login";
          }
        } else {
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination
          window.location.href = "/auth/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string | string[]>;
}

// ─── Centralized user-friendly error messages ───────────────────────────────

const NETWORK_MESSAGE =
  "Unable to connect to the server. Please check your internet connection and try again.";
const SERVER_MESSAGE =
  "Something went wrong on our server. Please try again in a moment.";

const TECHNICAL_PATTERN =
  /^(sqlstate|relation "|table "|column "|prisma|mongoose|sequelize|mongo|\bat [\w./\\]+:\d+:\d+)|(\b(http|)\/api\/v\d|\bstack trace|internal server error|database connection|uncaptured exception|unhandled rejection)/i;

function isUserFacingMessage(message: unknown): message is string {
  if (typeof message !== "string") return false;
  if (!message.trim()) return false;
  if (!/^[A-Za-z]/.test(message)) return false;
  if (message.length > 300) return false;
  if (TECHNICAL_PATTERN.test(message)) return false;
  return true;
}

function friendlyForStatus(status: number, serverMessage?: string): string {
  if (serverMessage && isUserFacingMessage(serverMessage)) return serverMessage;
  if (status === 400) return "Please check your input and try again.";
  if (status === 401) return "Your session has expired. Please sign in again.";
  if (status === 403) return "You don't have permission to perform this action.";
  if (status === 404) return "The requested item could not be found.";
  if (status === 409)
    return serverMessage
      ? serverMessage
      : "This record already exists or conflicts with existing data.";
  if (status === 422) return "Please correct the highlighted fields and try again.";
  if (status === 429) return "You've made too many requests. Please wait a moment and try again.";
  if (status >= 500) return SERVER_MESSAGE;
  return "An unexpected error occurred. Please try again.";
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      const isTimeout =
        error.code === "ECONNABORTED" ||
        (typeof error.message === "string" && error.message.toLowerCase().includes("timeout"));
      return isTimeout
        ? "The request timed out. Please check your connection and try again."
        : NETWORK_MESSAGE;
    }

    const data = error.response?.data as ApiError | undefined;
    return friendlyForStatus(error.response.status, data?.message);
  }
  if (error instanceof Error) {
    return error.message || "An unexpected error occurred. Please try again.";
  }
  return "An unexpected error occurred. Please try again.";
}

export function getValidationErrors(error: unknown): Record<string, string[] | string> | null {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiError | undefined;
    return data?.errors || null;
  }
  return null;
}

export default api;
