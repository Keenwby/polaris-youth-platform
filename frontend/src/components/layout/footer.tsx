/**
 * Footer Component
 * 全局页脚 - 从 Site Settings 获取配置
 */

import type { LayoutFooter } from "@/types/strapi";

interface FooterProps {
  footer?: LayoutFooter;
}

export function Footer({ footer }: FooterProps) {
  if (!footer) {
    return null;
  }

  const {
    copyrightText = "© 2025 北辰青年发展中心. All rights reserved.",
    links = [],
    socialLinks = [],
    additionalInfo,
  } = footer;

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Links Section */}
          {links && links.length > 0 && (
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                快速链接
              </h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target={link.openInNewTab ? "_blank" : undefined}
                      rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Social Links Section */}
          {socialLinks && socialLinks.length > 0 && (
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                关注我们
              </h3>
              <ul className="space-y-2">
                {socialLinks.map((social, index) => (
                  <li key={index}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                    >
                      {social.icon && <span>{social.icon}</span>}
                      <span>{social.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Info Section */}
          {additionalInfo && (
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                关于
              </h3>
              <div
                className="prose prose-sm dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: additionalInfo }}
              />
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
