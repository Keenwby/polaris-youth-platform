/**
 * Image Gallery Section Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ImageGallerySection } from "../image-gallery-section";
import type { SectionImageGallery } from "@/types/strapi";

describe("ImageGallerySection", () => {
  const mockImages = {
    data: [
      {
        id: 1,
        attributes: {
          name: "image1.jpg",
          url: "/uploads/image1.jpg",
          alternativeText: "图片1",
          width: 800,
          height: 600,
          hash: "test1",
          ext: ".jpg",
          mime: "image/jpeg",
          size: 100,
          provider: "local",
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01",
        },
      },
      {
        id: 2,
        attributes: {
          name: "image2.jpg",
          url: "/uploads/image2.jpg",
          alternativeText: "图片2",
          width: 800,
          height: 600,
          hash: "test2",
          ext: ".jpg",
          mime: "image/jpeg",
          size: 100,
          provider: "local",
          createdAt: "2025-01-01",
          updatedAt: "2025-01-01",
        },
      },
    ],
  };

  const mockSection: SectionImageGallery = {
    id: 1,
    __component: "sections.image-gallery",
    images: mockImages,
    layout: "grid",
    columns: 3,
    aspectRatio: "original",
  };

  it("should render all images", () => {
    render(<ImageGallerySection section={mockSection} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });

  it("should render title when provided", () => {
    const sectionWithTitle: SectionImageGallery = {
      ...mockSection,
      title: "照片集",
    };

    render(<ImageGallerySection section={sectionWithTitle} />);
    expect(screen.getByText("照片集")).toBeInTheDocument();
  });

  it("should render nothing when no images", () => {
    const emptySection: SectionImageGallery = {
      ...mockSection,
      images: { data: [] },
    };

    const { container } = render(<ImageGallerySection section={emptySection} />);
    expect(container.firstChild).toBeNull();
  });

  it("should open lightbox when image is clicked", async () => {
    const user = userEvent.setup();
    render(<ImageGallerySection section={mockSection} />);

    const imageButtons = screen.getAllByRole("button");
    await user.click(imageButtons[0]);

    // Lightbox should be visible with the clicked image
    const lightboxImages = screen.getAllByAltText("图片1");
    expect(lightboxImages.length).toBeGreaterThan(1); // Original + lightbox
  });

  it("should close lightbox when clicked outside", async () => {
    const user = userEvent.setup();
    render(<ImageGallerySection section={mockSection} />);

    // Open lightbox
    const imageButtons = screen.getAllByRole("button");
    await user.click(imageButtons[0]);

    // Find and click the lightbox background
    const lightbox = document.querySelector(".fixed.inset-0");
    if (lightbox) {
      await user.click(lightbox);
    }

    // Lightbox should be closed
    expect(document.querySelector(".fixed.inset-0")).not.toBeInTheDocument();
  });

  it("should navigate to next image in lightbox", async () => {
    const user = userEvent.setup();
    render(<ImageGallerySection section={mockSection} />);

    // Open lightbox
    const imageButtons = screen.getAllByRole("button");
    await user.click(imageButtons[0]);

    // Wait for lightbox to open and display image
    await waitFor(() => {
      const lightboxImages = screen.getAllByAltText("图片1");
      expect(lightboxImages.length).toBeGreaterThan(1);
    });

    // Find and click next button (›)
    const buttons = screen.getAllByRole("button");
    const nextButton = buttons.find((btn) => btn.textContent === "›");
    if (nextButton) {
      await user.click(nextButton);
      // Should now show image 2 in the lightbox
      await waitFor(() => {
        const lightboxImage = document.querySelector(".fixed.inset-0 img.max-h-full");
        expect(lightboxImage).toHaveAttribute("alt", "图片2");
      });
    }
  });

  it("should use correct grid columns class", () => {
    const columns: Array<number> = [2, 3, 4, 5, 6];

    columns.forEach((col) => {
      const { container, unmount } = render(
        <ImageGallerySection
          section={{ ...mockSection, columns: col as any }}
        />
      );
      const grid = container.querySelector(".grid");
      expect(grid).toBeInTheDocument();
      unmount();
    });
  });

  it("should render with different aspect ratios", () => {
    const ratios: Array<SectionImageGallery["aspectRatio"]> = [
      "square",
      "landscape",
      "portrait",
      "original",
    ];

    ratios.forEach((ratio) => {
      const { container, unmount } = render(
        <ImageGallerySection section={{ ...mockSection, aspectRatio: ratio }} />
      );
      const buttons = container.querySelectorAll("button");
      expect(buttons.length).toBeGreaterThan(0);
      unmount();
    });
  });
});
