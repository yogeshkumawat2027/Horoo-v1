"use client";

import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { useState } from "react";

type ListingGalleryProps = {
  images: string[];
  title: string;
};

export default function ListingGallery({ images, title }: ListingGalleryProps) {
  const gallery = images.length > 0 ? images : ["https://images.unsplash.com/photo-1555854877-bab0e564b8d5"];
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = gallery.length > 1;

  function showPreviousImage() {
    setActiveIndex((index) => (index - 1 + gallery.length) % gallery.length);
  }

  function showNextImage() {
    setActiveIndex((index) => (index + 1) % gallery.length);
  }

  return (
    <section className="relative h-64 overflow-hidden bg-gray-200 sm:h-[330px]">
      <img src={gallery[activeIndex]} alt={`${title} photo ${activeIndex + 1}`} className="h-full w-full object-cover" />

      {hasMultipleImages && (
        <>
          <button
            type="button"
            onClick={showPreviousImage}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-black/45 text-white transition hover:bg-black/65"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={showNextImage}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-black/45 text-white transition hover:bg-black/65"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 bg-black/45 px-2.5 py-1.5">
            {gallery.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                className={`h-1.5 transition-all ${index === activeIndex ? "w-5 bg-orange-500" : "w-1.5 bg-white/75 hover:bg-white"}`}
              />
            ))}
          </div>
          <span className="absolute right-3 top-3 bg-black/45 px-2 py-1 text-xs font-semibold text-white">
            {activeIndex + 1} / {gallery.length}
          </span>
        </>
      )}

      {images.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center gap-1 text-xs text-white">
          <ImageOff className="h-3 w-3" />
          No photos
        </div>
      )}
    </section>
  );
}