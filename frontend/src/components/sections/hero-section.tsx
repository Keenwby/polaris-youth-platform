/**
 * Hero Section Component
 * 英雄区块 - 页面顶部的横幅区域
 */

import { type SectionHero } from "@/types/strapi";
import { getMediaUrl } from "@/lib/strapi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  section: SectionHero;
}

export function HeroSection({ section }: HeroSectionProps) {
  const {
    title,
    subtitle,
    description,
    backgroundImage,
    ctaButtons,
    alignment = "center",
    height = "large",
    overlay = false,
    overlayOpacity = 50,
  } = section;

  // Get background image URL
  const bgImageUrl = backgroundImage?.data?.attributes?.url
    ? getMediaUrl(backgroundImage.data.attributes.url)
    : undefined;

  // Height classes
  const heightClasses = {
    small: "min-h-[300px]",
    medium: "min-h-[500px]",
    large: "min-h-[600px]",
    fullscreen: "min-h-screen",
  };

  // Alignment classes
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  return (
    <section
      className={cn(
        "relative flex flex-col justify-center px-4 py-16 md:px-8 lg:px-16",
        heightClasses[height]
      )}
      style={
        bgImageUrl
          ? {
              backgroundImage: `url(${bgImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* Overlay */}
      {overlay && bgImageUrl && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity / 100 }}
        />
      )}

      {/* Content */}
      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-7xl flex flex-col gap-6",
          alignmentClasses[alignment]
        )}
      >
        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {subtitle}
          </p>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>

        {/* Description - Rich Text */}
        {description && (
          <div
            className="prose prose-lg max-w-3xl dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* CTA Buttons */}
        {ctaButtons && ctaButtons.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {ctaButtons.map((button) => (
              <Button
                key={button.id}
                variant={button.variant || "default"}
                size={button.size || "default"}
                asChild={!!button.url}
              >
                {button.url ? (
                  <a
                    href={button.url}
                    target={button.openInNewTab ? "_blank" : undefined}
                    rel={button.openInNewTab ? "noopener noreferrer" : undefined}
                  >
                    {button.label}
                  </a>
                ) : (
                  <span>{button.label}</span>
                )}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
