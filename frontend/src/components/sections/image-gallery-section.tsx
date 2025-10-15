/**
 * Image Gallery Section Component
 * 图片画廊区块 - 展示图片集合
 */

"use client";

import { useState } from "react";
import { type SectionImageGallery } from "@/types/strapi";
import { getMediaUrl } from "@/lib/strapi";
import { cn } from "@/lib/utils";

interface ImageGallerySectionProps {
  section: SectionImageGallery;
}

export function ImageGallerySection({ section }: ImageGallerySectionProps) {
  const {
    title,
    images,
    layout = "grid",
    columns = 3,
    aspectRatio = "original",
  } = section;

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const imageList = images.data || [];

  // Grid columns classes
  const gridColsClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  // Aspect ratio classes
  const aspectRatioClasses = {
    square: "aspect-square",
    landscape: "aspect-video",
    portrait: "aspect-[3/4]",
    original: "",
  };

  if (imageList.length === 0) {
    return null;
  }

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        {title && (
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
        )}

        {/* Gallery Grid */}
        <div
          className={cn(
            "grid gap-4",
            layout === "grid" &&
              gridColsClasses[columns as keyof typeof gridColsClasses]
          )}
        >
          {imageList.map((image, index) => {
            const imageUrl = getMediaUrl(image.attributes.url);
            const altText =
              image.attributes.alternativeText || image.attributes.name;

            return (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "relative overflow-hidden rounded-lg bg-muted transition-transform hover:scale-105",
                  aspectRatioClasses[aspectRatio]
                )}
              >
                <img
                  src={imageUrl}
                  alt={altText}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute right-4 top-4 text-4xl text-white hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl text-white hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev === null || prev === 0
                    ? imageList.length - 1
                    : prev - 1
                );
              }}
            >
              ‹
            </button>

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl text-white hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage((prev) =>
                  prev === null || prev === imageList.length - 1
                    ? 0
                    : prev + 1
                );
              }}
            >
              ›
            </button>

            <img
              src={getMediaUrl(imageList[selectedImage].attributes.url)}
              alt={
                imageList[selectedImage].attributes.alternativeText ||
                imageList[selectedImage].attributes.name
              }
              className="max-h-full max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
}
