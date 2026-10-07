"use client";

import { useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/store/cartStore";
import {
  shippingService,
  type ShippingQuote,
} from "@/services/shipping.service";

export function useShippingQuote(
  items: CartItem[],
  deliveryMethod: ShippingQuote["deliveryMethod"]
) {
  const [quote, setQuote] = useState<ShippingQuote | null>(null);
  const [loading, setLoading] = useState(items.length > 0);
  const [error, setError] = useState<string | null>(null);
  const quoteItems = useMemo(
    () => items.map((item) => ({ productId: item.product.id, quantity: item.quantity })),
    [items]
  );

  useEffect(() => {
    let active = true;
    if (!quoteItems.length) {
      setQuote(null);
      setLoading(false);
      setError(null);
      return () => { active = false; };
    }

    setQuote(null);
    setLoading(true);
    setError(null);
    shippingService.quote(quoteItems, deliveryMethod)
      .then((result) => {
        if (active) setQuote(result);
      })
      .catch((reason: unknown) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : "Unable to calculate shipping");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [deliveryMethod, quoteItems]);

  return { quote, loading, error, ready: Boolean(quote) && !loading };
}
