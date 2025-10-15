/**
 * Navigation Bar Component
 * 全局导航栏 - 从 Site Settings 获取配置
 */

"use client";

import { useState } from "react";
import type { SiteSettings } from "@/types/strapi";
import { getMediaUrl } from "@/lib/strapi";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  settings?: SiteSettings;
}

export function Navbar({ settings }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const siteName = settings?.siteName || "北辰青年发展中心";

  // Support both logo and siteLogo fields
  const logoData = settings?.logo?.data || settings?.siteLogo?.data;
  const logo = logoData?.attributes?.url
    ? getMediaUrl(logoData.attributes.url)
    : undefined;

  // Support both navigation array structure and mainNavigation
  const navigation = settings?.mainNavigation ||
    (settings?.navigation && settings.navigation.length > 0
      ? settings.navigation[0].links
      : []);

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Site Name */}
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-3">
              {logo && (
                <img
                  src={logo}
                  alt={siteName}
                  className="h-8 w-auto object-contain"
                />
              )}
              <span className="text-lg font-semibold">{siteName}</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navigation.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target={item.openInNewTab ? "_blank" : undefined}
                rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">菜单</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navigation.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
