import { apiService } from "./api";
import type {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  VerifyOtpData,
  ResendOtpResponse,
} from "@/types";

type BackendUser = {
  id: string;
  email: string;
  name?: string;
  avatar?: string | null;
  createdAt: string;
  updatedAt?: string;
};

type BackendAuthResponse = {
  user?: BackendUser;
  token?: string;
  refreshToken?: string;
  requiresOtpVerification?: boolean;
  requiresOtp?: boolean;
  email?: string;
  message?: string;
};

function mapUser(user: BackendUser): User {
  const nameParts = (user.name || "").trim().split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] || user.email.split("@")[0];
  const lastName = nameParts.slice(1).join(" ");

  return {
    id: user.id,
    email: user.email,
    firstName,
    lastName,
    avatar: user.avatar || undefined,
    addresses: [],
    createdAt: user.createdAt,
    updatedAt: user.updatedAt || user.createdAt,
  };
}

function persistTokens(response: AuthResponse) {
  if (typeof window === "undefined") return;
  if (response.token) {
    localStorage.setItem("heer-auth-token", response.token);
  }
  if (response.refreshToken) {
    localStorage.setItem("heer-refresh-token", response.refreshToken);
  }
}

function mapAuthResponse(response: BackendAuthResponse): AuthResponse {
  return {
    user: response.user ? mapUser(response.user) : undefined,
    token: response.token,
    refreshToken: response.refreshToken,
    requiresOtpVerification: response.requiresOtpVerification || response.requiresOtp,
    email: response.email,
    message: response.message,
  };
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<BackendAuthResponse>("/auth/login", credentials);
    const mapped = mapAuthResponse(response);
    if (mapped.token) {
      persistTokens(mapped);
    }
    return mapped;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<BackendAuthResponse>("/auth/register", {
      name: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      password: data.password,
      phone: data.phone,
    });
    const mapped = mapAuthResponse(response);
    if (mapped.token) {
      persistTokens(mapped);
    }
    return mapped;
  }

  async verifyOtp(data: VerifyOtpData): Promise<AuthResponse> {
    const response = await apiService.post<BackendAuthResponse>("/auth/verify-otp", data);
    const mapped = mapAuthResponse(response);
    if (mapped.token) {
      persistTokens(mapped);
    }
    return mapped;
  }

  async resendOtp(email: string): Promise<ResendOtpResponse> {
    return apiService.post<ResendOtpResponse>("/auth/resend-otp", { email });
  }

  async verifyPasswordResetOtp(data: {
    email: string;
    otp: string;
    newPassword: string;
  }): Promise<{ message: string }> {
    return apiService.post<{ message: string }>("/auth/verify-reset-otp", data);
  }

  async logout(): Promise<void> {
    try {
      await apiService.post<void>("/auth/logout");
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("heer-auth-token");
        localStorage.removeItem("heer-refresh-token");
      }
    }
  }

  async getProfile(): Promise<User> {
    const response = await apiService.get<BackendUser>("/auth/me");
    return mapUser(response);
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await apiService.put<BackendUser>("/auth/me", {
      name: [data.firstName, data.lastName].filter(Boolean).join(" ") || undefined,
      avatar: data.avatar,
    });
    return mapUser(response);
  }

  async forgotPassword(email: string): Promise<{ message: string; requiresOtp?: boolean; email?: string }> {
    return apiService.post<{ message: string; requiresOtp?: boolean; email?: string }>("/auth/forgot-password", { email });
  }

  async resetPassword(
    token: string,
    password: string
  ): Promise<{ message: string }> {
    return apiService.post<{ message: string }>("/auth/reset-password", {
      token,
      password,
    });
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    return apiService.post<{ message: string }>("/auth/verify-email", { token });
  }
}

export const authService = new AuthService();
