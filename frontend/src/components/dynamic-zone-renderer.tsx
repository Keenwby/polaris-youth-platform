/**
 * Dynamic Zone Renderer
 * 动态区域渲染器 - 根据组件类型渲染不同的 Section 组件
 */

import { type DynamicZoneSection } from "@/types/strapi";
import { HeroSection } from "@/components/sections/hero-section";
import { RichTextSection } from "@/components/sections/rich-text-section";
import { FeatureGridSection } from "@/components/sections/feature-grid-section";
import { ActivityListSection } from "@/components/sections/activity-list-section";
import { ImageGallerySection } from "@/components/sections/image-gallery-section";

interface DynamicZoneRendererProps {
  sections: DynamicZoneSection[];
}

export function DynamicZoneRenderer({ sections }: DynamicZoneRendererProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div>
      {sections.map((section, index) => {
        // Get the component type
        const componentType = section.__component;

        // Render based on component type
        switch (componentType) {
          case "sections.hero":
            return <HeroSection key={index} section={section} />;

          case "sections.rich-text":
            return <RichTextSection key={index} section={section} />;

          case "sections.feature-grid":
            return <FeatureGridSection key={index} section={section} />;

          case "sections.activity-list":
            return <ActivityListSection key={index} section={section} />;

          case "sections.image-gallery":
            return <ImageGallerySection key={index} section={section} />;

          default:
            console.warn(`Unknown component type: ${componentType}`);
            return null;
        }
      })}
    </div>
  );
}
