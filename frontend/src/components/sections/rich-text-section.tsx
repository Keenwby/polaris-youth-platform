/**
 * Rich Text Section Component
 * 富文本区块 - 显示富文本内容
 */

import { type SectionRichText } from "@/types/strapi";
import { cn } from "@/lib/utils";

interface RichTextSectionProps {
  section: SectionRichText;
}

export function RichTextSection({ section }: RichTextSectionProps) {
  const { content, layout = "medium", backgroundColor } = section;

  // Layout width classes
  const layoutClasses = {
    narrow: "max-w-3xl",
    medium: "max-w-5xl",
    wide: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <section
      className="px-4 py-16 md:px-8"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className={cn("mx-auto", layoutClasses[layout])}>
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}
