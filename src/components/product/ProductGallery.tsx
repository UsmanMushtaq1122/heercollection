"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductGalleryProps {
  images: Array<ProductImage | string>;
  thumbnail?: string;
  productName?: string;
}

const FALLBACK_IMAGE: ProductImage = {
  id: "fallback",
  url: "",
  alt: "Product image",
  width: 600,
  height: 800,
};

const GRADIENT =
  "linear-gradient(135deg, #E8DDD4 0%, #d4c5b8 50%, #C9A27E22 100%)";

function Placeholder({ label }: { label?: string }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: GRADIENT }}
    >
      {label && (
        <span className="px-4 text-center text-sm font-medium text-[#1A1A1A]/40">
          {label}
        </span>
      )}
    </div>
  );
}

export default function ProductGallery({
  images,
  thumbnail,
  productName,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const rawImages = (images as unknown[]) || [];
  const normalizedImages: ProductImage[] = Array.isArray(rawImages)
    ? (rawImages
        .map((image, index) => {
          if (typeof image === "string" && image.trim()) {
            return {
              id: `image-${index}`,
              url: image.trim(),
              alt: productName || `Image ${index + 1}`,
              width: 600,
              height: 800,
            };
          }
          if (image && typeof image === "object") {
            const imgObj = image as { id?: string; url?: string; alt?: string; width?: number; height?: number };
            if (imgObj.url && typeof imgObj.url === "string" && imgObj.url.trim()) {
              return {
                id: imgObj.id || `image-${index}`,
                url: imgObj.url.trim(),
                alt: imgObj.alt || productName || `Image ${index + 1}`,
                width: imgObj.width || 600,
                height: imgObj.height || 800,
              };
            }
          }
          return null;
        })
        .filter(Boolean) as ProductImage[])
    : [];

  if (normalizedImages.length === 0 && thumbnail && typeof thumbnail === "string" && thumbnail.trim()) {
    normalizedImages.push({
      id: "thumbnail",
      url: thumbnail.trim(),
      alt: productName || "Product image",
      width: 600,
      height: 800,
    });
  }

  const allImages: ProductImage[] =
    normalizedImages.length > 0 ? normalizedImages : [FALLBACK_IMAGE];
  const activeImage = allImages[activeIndex] || allImages[0] || FALLBACK_IMAGE;
  const activeUrl = activeImage.url || thumbnail || undefined;

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <>
      <div className="flex flex-col-reverse gap-3 sm:gap-4 lg:flex-row w-full min-w-0">
        {/* Thumbnail Strip */}
        {allImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden lg:pb-0 w-full lg:w-[68px] lg:flex-shrink-0 lg:max-h-[620px]">
            {allImages.map((image, index) => (
              <button
                key={`${image.id || "image"}-${image.url || "placeholder"}-${index}`}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative aspect-[3/4] w-[46px] sm:w-[56px] lg:w-[68px] flex-shrink-0 overflow-hidden rounded-[4px] border transition-all duration-200",
                  activeIndex === index
                    ? "border-[#1A1A1A] shadow-sm ring-1 ring-[#1A1A1A]"
                    : "border-transparent opacity-75 hover:opacity-100"
                )}
                aria-label={`View image ${index + 1}`}
              >
                {image.url ? (
                  <Image
                    src={image.url}
                    alt={image.alt || productName || `Image ${index + 1}`}
                    fill
                    sizes="68px"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{
                      background: `linear-gradient(135deg, #E8DDD4 0%, #d4c5b8 100%)`,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Main Image */}
        <div className="relative flex-1 min-w-0 w-full">
          <div
            className="group relative aspect-[3/4] cursor-zoom-in overflow-hidden rounded-sm w-full bg-[#F5F2EE]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onClick={() => setIsLightboxOpen(true)}
            style={{ touchAction: "pinch-zoom" }}
          >
            <AnimatePresence>
              <motion.div
                key={activeImage.id || activeUrl || `img-${activeIndex}`}
                className="absolute inset-0"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.8 }}
                transition={{ duration: 0.2 }}
                style={{
                  transform: isZoomed
                    ? `scale(1.5) translate(${(50 - mousePosition.x) * 0.1}%, ${(50 - mousePosition.y) * 0.1}%)`
                    : "scale(1)",
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  transition: "transform 0.2s ease-out",
                }}
              >
                {activeUrl ? (
                  <Image
                    src={activeUrl}
                    alt={activeImage.alt || productName || "Product"}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <Placeholder label={productName} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Zoom Indicator */}
            <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 opacity-75 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <ZoomIn className="h-5 w-5 text-[#1A1A1A]" />
            </div>

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-3 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">
              {activeIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-4xl border-none bg-black/95 p-0">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {productName || "Product"} — Fullscreen view
            </DialogTitle>
            <DialogDescription>
              Expanded image view of the product
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 text-white hover:bg-white/20"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close fullscreen view"
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="relative aspect-square max-h-[80vh]">
              {activeUrl ? (
                <Image
                  src={activeUrl}
                  alt={activeImage.alt || productName || "Product"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  className="object-contain"
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{ background: GRADIENT }}
                />
              )}
            </div>

            {allImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={handlePrevious}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" />
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}