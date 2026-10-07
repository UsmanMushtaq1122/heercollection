export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface AuthResponse {
  user?: User;
  token?: string;
  refreshToken?: string;
  requiresOtpVerification?: boolean;
  requiresOtp?: boolean;
  email?: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface VerifyOtpData {
  email: string;
  otp: string;
}

export interface ResendOtpResponse {
  message: string;
  cooldownSeconds?: number;
}

export interface ResetPasswordOtpData {
  email: string;
  otp: string;
  newPassword: string;
}
