"use client";

import { useAuthStore } from "@/store/authStore";

export function useAuth() {
  const { user, isAuthenticated, isLoading, login, register, logout } =
    useAuthStore();

  const isLoaded = !isLoading && user !== null;

  const fullName = user ? `${user.firstName} ${user.lastName}` : "";
  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : "";

  return {
    user,
    isAuthenticated,
    isLoading,
    isLoaded,
    fullName,
    initials,
    login,
    register,
    logout,
  };
}
