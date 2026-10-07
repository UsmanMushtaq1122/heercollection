"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { SiteSettings } from "@/types/content";
import { settingsService } from "@/services/settings.service";
import { API_BASE_URL } from "@/lib/constants";

const FALLBACK_SETTINGS: SiteSettings = {
  siteName: "HEER",
  siteDescription: "Luxury pret for the contemporary woman",
  announcementMessages: [],
  navigation: [],
  socialLinks: [],
  footerLinks: {},
  contact: {
    email: "",
    phone: "",
    address: "",
  },
  paymentMethods: [],
  shipping: {
    standardCost: 199,
    expressCost: 399,
    freeShippingThreshold: 5000,
    codFee: 0,
    codEnabled: true,
    advancedShippingEnabled: false,
    additionalShippingChargeEnabled: false,
    additionalShippingCharge: 0,
    expressAdditionalChargeEnabled: false,
    expressAdditionalCharge: 0,
    perItemChargeEnabled: false,
    perItemCharge: 0,
    perKgChargeEnabled: false,
    perKgCharge: 0,
  },
  tax: {
    rate: 0.05,
  },
};

const settingsRefreshListeners = new Set<() => void>();
let socialMediaEvents: EventSource | null = null;

function subscribeToSettingsRefresh(listener: () => void) {
  settingsRefreshListeners.add(listener);

  if (!socialMediaEvents) {
    socialMediaEvents = new EventSource(`${API_BASE_URL}/social-media/stream`);
    socialMediaEvents.addEventListener("social-links-updated", () => {
      settingsRefreshListeners.forEach((refresh) => refresh());
    });
  }

  return () => {
    settingsRefreshListeners.delete(listener);
    if (settingsRefreshListeners.size === 0) {
      socialMediaEvents?.close();
      socialMediaEvents = null;
    }
  };
}

export function useSiteSettings(): {
  settings: SiteSettings;
  isLoaded: boolean;
  isLoading: boolean;
  error: string | null;
} {
  const [settings, setSettings] = useState<SiteSettings>(FALLBACK_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const requestId = useRef(0);

  const fetchSettings = useCallback(() => {
    const id = ++requestId.current;
    setError(null);
    setIsLoading(true);
    settingsService
      .getStoreSettings()
      .then((result) => {
        if (id === requestId.current) {
          setSettings({ ...FALLBACK_SETTINGS, ...result });
          setIsLoaded(true);
        }
      })
      .catch((err: unknown) => {
        if (id === requestId.current) {
          setError(err instanceof Error ? err.message : "Failed to load settings");
        }
      })
      .finally(() => {
        if (id === requestId.current) setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    return subscribeToSettingsRefresh(fetchSettings);
  }, [fetchSettings]);

  return { settings, isLoaded, isLoading, error };
}