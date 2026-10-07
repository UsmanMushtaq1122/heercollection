"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Quote,
  MapPin,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  X,
} from "lucide-react";
import { useTestimonials } from "@/hooks/useContent";
import type { Testimonial } from "@/types/content";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function getCustomerInitials(name: string): string {
  if (!name) return "HC";
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function isInstagramLink(url?: string): boolean {
  if (!url) return false;
  return /instagram\.com\/(p|reel|stories|tv)\//i.test(url) || url.includes("instagram.com");
}

export default function TestimonialsPage() {
  const { testimonials, isLoading, error } = useTestimonials();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [selectedStory, setSelectedStory] = useState<Testimonial | null>(null);

  // Video refs map
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  const setVideoRef = (id: string, el: HTMLVideoElement | null) => {
    if (el) {
      videoRefs.current.set(id, el);
    } else {
      videoRefs.current.delete(id);
    }
  };

  // Pause card video when another starts or modal opens
  const handleTogglePlay = (id: string) => {
    const video = videoRefs.current.get(id);
    if (!video) return;

    if (playingVideoId === id) {
      video.pause();
      setPlayingVideoId(null);
    } else {
      // Pause any currently playing video
      if (playingVideoId && videoRefs.current.get(playingVideoId)) {
        videoRefs.current.get(playingVideoId)?.pause();
      }
      video.play().catch(() => {});
      setPlayingVideoId(id);
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = !isMuted;
    setIsMuted(newMuted);

    // Apply to all card videos
    videoRefs.current.forEach((video) => {
      video.muted = newMuted;
    });

    if (modalVideoRef.current) {
      modalVideoRef.current.muted = newMuted;
    }
  };

  // Filter testimonials
  const filtered = testimonials.filter((t) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "video") return t.type === "video" || t.type === "story";
    if (activeFilter === "instagram") return t.type === "instagram" || isInstagramLink(t.videoUrl);
    if (activeFilter === "reviews") return t.type === "gallery";
    return true;
  });

  // Open modal story
  const openStoryModal = (item: Testimonial) => {
    // Pause any playing card video
    if (playingVideoId && videoRefs.current.get(playingVideoId)) {
      videoRefs.current.get(playingVideoId)?.pause();
      setPlayingVideoId(null);
    }
    setSelectedStory(item);
  };

  const closeStoryModal = () => {
    if (modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
    setSelectedStory(null);
  };

  // Listen to keyboard ESC to close modal
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeStoryModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A]">
      {/* Hero Header Section */}
      <section className="relative py-16 sm:py-24 border-b border-[#E8DDD4]/60 bg-gradient-to-b from-[#F8F5F2] to-[#FDFBF7] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#C9A27E]/10 blur-3xl" />
          <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-[#C9A27E]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A27E]/10 border border-[#C9A27E]/20 text-[#B8906A] text-xs uppercase tracking-[0.25em] font-medium mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Client Stories & Testimonials
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-wide text-[#1A1A1A] max-w-3xl mx-auto leading-tight"
          >
            Celebrated by Women Worldwide
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-[#1A1A1A]/60 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Real moments, unedited stories, and verified client reviews. Explore
            how our pret, luxury formals, and hand-crafted ensembles make every
            occasion timeless.
          </motion.p>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10"
          >
            {[
              { id: "all", label: "All Stories" },
              { id: "video", label: "Video & Stories (9:16)" },
              { id: "instagram", label: "Instagram Mentions" },
              { id: "reviews", label: "Client Reviews" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-light uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === tab.id
                    ? "bg-[#1A1A1A] text-white shadow-sm"
                    : "bg-white border border-[#E8DDD4] text-[#1A1A1A]/70 hover:border-[#C9A27E] hover:text-[#B8906A]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Global Sound Control Header */}
          <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8DDD4]/60">
            <p className="text-xs uppercase tracking-widest text-[#1A1A1A]/50 font-medium">
              Showing {filtered.length} {filtered.length === 1 ? "story" : "stories"}
            </p>

            <button
              onClick={handleToggleMute}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8DDD4] bg-white text-xs font-light text-[#1A1A1A]/70 hover:border-[#C9A27E] hover:text-[#B8906A] transition-colors"
              title={isMuted ? "Unmute all videos" : "Mute all videos"}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#1A1A1A]/50" />
                  <span>Audio Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#C9A27E]" />
                  <span>Audio On</span>
                </>
              )}
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white border border-[#E8DDD4]/70 p-4 shadow-sm animate-pulse"
                >
                  <div className="aspect-[9/16] w-full bg-[#F4EFEA] rounded-xl mb-4" />
                  <div className="h-4 bg-[#F4EFEA] rounded w-3/4 mb-2" />
                  <div className="h-3 bg-[#F4EFEA] rounded w-1/2" />
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {!isLoading && error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md mx-auto">
              <p className="text-sm text-red-700 font-light">
                Unable to load testimonials at this time. Please try refreshing the page.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#E8DDD4]/60 max-w-xl mx-auto p-8">
              <Quote className="w-12 h-12 text-[#C9A27E]/30 mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-[#1A1A1A] tracking-wide mb-2">
                No Stories Found
              </h3>
              <p className="text-sm text-[#1A1A1A]/50 font-light mb-6">
                There are currently no published testimonials matching this filter.
              </p>
              <button
                onClick={() => setActiveFilter("all")}
                className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white text-xs uppercase tracking-wider font-light hover:bg-[#1A1A1A]/80 transition-colors"
              >
                View All Stories
              </button>
            </div>
          )}

          {/* Testimonial Cards Grid */}
          {!isLoading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 items-start">
              {filtered.map((item, index) => {
                const isVideo = item.type === "video" || item.type === "story";
                const isInstagram = item.type === "instagram" || isInstagramLink(item.videoUrl);
                const mediaUrl = item.videoUrl || item.image || "";
                const isPlaying = playingVideoId === item.id;
                const initials = getCustomerInitials(item.customerName);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-white rounded-2xl border border-[#E8DDD4]/70 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Media Container: 9:16 vertical ratio for Video / Story, or 4:5 for image/post */}
                    {mediaUrl ? (
                      <div className="relative w-full aspect-[9/16] bg-[#141414] overflow-hidden select-none">
                        {isVideo ? (
                          <>
                            <video
                              ref={(el) => setVideoRef(item.id, el)}
                              src={mediaUrl}
                              className="w-full h-full object-cover"
                              loop
                              muted={isMuted}
                              playsInline
                              preload="metadata"
                              onClick={() => handleTogglePlay(item.id)}
                            />

                            {/* Story Badge */}
                            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                              {item.type === "story" ? "Story" : "Video"}
                            </div>

                            {/* Expand to Modal Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openStoryModal(item);
                              }}
                              className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white/90 hover:text-white flex items-center justify-center transition-colors"
                              title="Full Story View"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>

                            {/* Play / Pause Overlay Button */}
                            <div
                              onClick={() => handleTogglePlay(item.id)}
                              className={`absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer transition-opacity duration-300 ${
                                isPlaying ? "opacity-0 hover:opacity-100" : "opacity-100"
                              }`}
                            >
                              <div className="w-14 h-14 rounded-full bg-white/90 shadow-xl flex items-center justify-center text-[#1A1A1A] transition-transform group-hover:scale-105">
                                {isPlaying ? (
                                  <Pause className="w-6 h-6 fill-[#1A1A1A]" />
                                ) : (
                                  <Play className="w-6 h-6 fill-[#1A1A1A] ml-1" />
                                )}
                              </div>
                            </div>
                          </>
                        ) : isInstagram ? (
                          <div className="w-full h-full bg-gradient-to-b from-[#833ab4]/15 via-[#fd1d1d]/10 to-[#fcb045]/15 flex flex-col items-center justify-between p-6 text-center">
                            <div className="flex items-center gap-2 self-start px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 text-[10px] uppercase tracking-wider font-semibold">
                              <InstagramIcon className="w-3 h-3" />
                              Instagram
                            </div>

                            <div className="my-auto px-4">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] p-0.5 mx-auto mb-4">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                  <InstagramIcon className="w-6 h-6 text-[#dc2743]" />
                                </div>
                              </div>
                              <p className="font-serif text-lg text-[#1A1A1A] italic leading-relaxed line-clamp-4">
                                &ldquo;{item.content}&rdquo;
                              </p>
                            </div>

                            <a
                              href={item.videoUrl || "https://instagram.com/heercollection"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 shadow-sm hover:opacity-95 transition-opacity"
                            >
                              View on Instagram
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        ) : (
                          // Photo Review
                          <div className="relative w-full h-full">
                            <img
                              src={mediaUrl}
                              alt={item.customerName}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-medium">
                              Client Photo
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Text-only Luxury Card Header
                      <div className="p-6 bg-gradient-to-br from-[#F8F5F2] to-[#F4EFEA] border-b border-[#E8DDD4]/60">
                        <Quote className="w-8 h-8 text-[#C9A27E]/40 mb-3" />
                        <p className="font-serif text-base text-[#1A1A1A] italic leading-relaxed line-clamp-4">
                          &ldquo;{item.content}&rdquo;
                        </p>
                      </div>
                    )}

                    {/* Card Content & Author Details */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-2.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < item.rating
                                ? "text-[#C9A27E] fill-[#C9A27E]"
                                : "text-[#E8DDD4]"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Content if not already displayed prominently */}
                      {mediaUrl && (
                        <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-light leading-relaxed mb-4 line-clamp-3">
                          {item.content}
                        </p>
                      )}

                      {/* Author Info */}
                      <div className="mt-auto pt-3 border-t border-[#1A1A1A]/5 flex items-center gap-3">
                        {item.customerImage ? (
                          <img
                            src={item.customerImage}
                            alt={item.customerName}
                            className="w-9 h-9 rounded-full object-cover border border-[#E8DDD4]"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-xs font-light tracking-wider shrink-0">
                            {initials}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="text-xs font-medium text-[#1A1A1A] truncate">
                              {item.customerName}
                            </p>
                            <CheckCircle2
                              className="w-3.5 h-3.5 text-[#B8906A] shrink-0"
                            />
                          </div>
                          {item.location && (
                            <p className="text-[11px] text-[#1A1A1A]/40 flex items-center gap-1 truncate">
                              <MapPin className="w-2.5 h-2.5 shrink-0" />
                              {item.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Fullscreen Vertical Story Modal Viewer */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={closeStoryModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[85vh] bg-[#141414] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
            >
              {/* Top Story Header Bar */}
              <div className="absolute top-0 inset-x-0 z-30 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between text-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#C9A27E] text-black font-medium flex items-center justify-center text-xs">
                    {getCustomerInitials(selectedStory.customerName)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white">
                      {selectedStory.customerName}
                    </p>
                    {selectedStory.location && (
                      <p className="text-[10px] text-white/60">
                        {selectedStory.location}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMute}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <button
                    onClick={closeStoryModal}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Story Video Element */}
              <div className="relative flex-1 w-full h-full bg-black flex items-center justify-center">
                <video
                  ref={modalVideoRef}
                  src={selectedStory.videoUrl || selectedStory.image || ""}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  loop
                  muted={isMuted}
                />
              </div>

              {/* Bottom Caption & Review */}
              <div className="absolute bottom-0 inset-x-0 z-30 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < selectedStory.rating
                          ? "text-[#C9A27E] fill-[#C9A27E]"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-white/90 font-light leading-relaxed mb-1">
                  &ldquo;{selectedStory.content}&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
