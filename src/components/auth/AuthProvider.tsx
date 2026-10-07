"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const refreshUser = useAuthStore((s) => s.refreshUser);

  useEffect(() => {
    // Synchronize user profile on initial load if token exists
    if (typeof window !== "undefined" && localStorage.getItem("heer-auth-token")) {
      refreshUser().catch(() => {});
    }
  }, [refreshUser]);

  return <>{children}</>;
}
