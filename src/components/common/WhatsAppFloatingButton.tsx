"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface WhatsAppProductInfo {
  name: string;
  slug: string;
  price: number;
  size?: string | null;
  color?: string;
}

const WhatsAppProductContext = createContext<WhatsAppProductInfo | null>(null);
const WhatsAppProductUpdaterContext = createContext<
  (product: WhatsAppProductInfo | null) => void
>(() => {});

export function WhatsAppProductProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [product, setProduct] = useState<WhatsAppProductInfo | null>(null);

  return (
    <WhatsAppProductUpdaterContext.Provider value={setProduct}>
      <WhatsAppProductContext.Provider value={product}>
        {children}
      </WhatsAppProductContext.Provider>
    </WhatsAppProductUpdaterContext.Provider>
  );
}

export function useWhatsAppProduct(product: WhatsAppProductInfo) {
  const setProduct = useContext(WhatsAppProductUpdaterContext);
  const { name, slug, price, size, color } = product;

  useEffect(() => {
    setProduct({ name, slug, price, size, color });
    return () => setProduct(null);
  }, [name, slug, price, size, color, setProduct]);
}

export default function WhatsAppFloatingButton() {
  const product = useContext(WhatsAppProductContext);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const number = configuredNumber?.replace(/\D/g, "");
  const isValidNumber = Boolean(number && /^\d{8,15}$/.test(number));

  useEffect(() => {
    if (!isValidNumber) {
      console.error(
        "WhatsApp support is unavailable. Set NEXT_PUBLIC_WHATSAPP_NUMBER to a valid international number."
      );
    }
  }, [isValidNumber]);

  if (!isValidNumber || !number) return null;

  const productUrl =
    product && origin
      ? `${origin}/product/${encodeURIComponent(product.slug)}`
      : "";
  const message = product
    ? [
        "Hello Heer Collection, I am interested in this product:",
        "",
        `Product: ${product.name}`,
        ...(product.size ? [`Size: ${product.size}`] : []),
        ...(product.color ? [`Color: ${product.color}`] : []),
        `Price: Rs. ${product.price.toLocaleString()}`,
        ...(productUrl ? [`Product Link: ${productUrl}`] : []),
        "",
        "Please provide more information.",
      ].join("\n")
    : "Hello Heer Collection, I would like to know more about your products.";
  const href = `https://wa.me/${number}?${new URLSearchParams({ text: message }).toString()}`;

  return (
    <div className="whatsapp-float">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Heer Collection on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(0,0,0,0.2)] transition-[transform,box-shadow] duration-200 ease-out hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.28)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 focus-visible:ring-offset-2"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-8 w-8"
          fill="currentColor"
          role="img"
          aria-label="WhatsApp"
        >
          <path d="M16.02 3C8.86 3 3.04 8.8 3.04 15.94c0 2.28.6 4.5 1.75 6.46L3 29l6.78-1.77a13.03 13.03 0 0 0 6.23 1.58h.01c7.15 0 12.97-5.81 12.98-12.96A12.9 12.9 0 0 0 25.2 6.64 12.9 12.9 0 0 0 16.02 3Zm0 23.62h-.01a10.8 10.8 0 0 1-5.5-1.5l-.4-.23-4.02 1.05 1.07-3.91-.26-.41a10.75 10.75 0 0 1-1.65-5.68c0-5.93 4.83-10.75 10.78-10.75 2.88 0 5.58 1.12 7.61 3.15a10.68 10.68 0 0 1 3.15 7.62c0 5.93-4.83 10.76-10.77 10.76Zm5.91-8.06c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.84 1.05-1.03 1.26-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.77-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.57-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.68s1.16 3.1 1.32 3.31c.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.25 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.29-.22-.61-.38Z" />
        </svg>
        <span className="sr-only">Chat with us on WhatsApp</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-[#1A1A1A] px-3 py-2 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
        >
          Chat with us on WhatsApp
        </span>
      </a>
    </div>
  );
}
