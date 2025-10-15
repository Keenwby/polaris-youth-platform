/**
 * Feature Grid Section Component
 * 特性网格区块 - 展示功能或服务网格
 */

import { type SectionFeatureGrid } from "@/types/strapi";
import { getMediaUrl } from "@/lib/strapi";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureGridSectionProps {
  section: SectionFeatureGrid;
}

export function FeatureGridSection({ section }: FeatureGridSectionProps) {
  const {
    title,
    description,
    features = [],
    columns = 3,
    layout = "grid",
  } = section;

  // Grid columns classes
  const gridColsClasses = {
    1: "grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        {(title || description) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Features */}
        <div
          className={cn(
            layout === "grid"
              ? `grid gap-8 ${gridColsClasses[columns as keyof typeof gridColsClasses] || gridColsClasses[3]}`
              : "flex flex-col gap-6"
          )}
        >
          {features.map((feature) => {
            const imageUrl = feature.image?.data?.attributes?.url
              ? getMediaUrl(feature.image.data.attributes.url)
              : undefined;

            return (
              <Card key={feature.id} className="p-6">
                {/* Icon or Image */}
                {imageUrl ? (
                  <div className="mb-4 h-48 w-full overflow-hidden rounded-lg">
                    <img
                      src={imageUrl}
                      alt={feature.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : feature.icon ? (
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                ) : null}

                {/* Title */}
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>

                {/* Description */}
                {feature.description && (
                  <p className="mb-4 text-muted-foreground">
                    {feature.description}
                  </p>
                )}

                {/* Link */}
                {feature.link && (
                  <a
                    href={feature.link}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    {feature.linkText || "了解更多"}
                    <span className="ml-1">→</span>
                  </a>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
