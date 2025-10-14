import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../card";

describe("Card Components", () => {
  describe("Card", () => {
    it("should render card container", () => {
      render(<Card>Card content</Card>);
      const card = screen.getByText(/card content/i);
      expect(card).toBeInTheDocument();
    });

    it("should accept custom className", () => {
      render(<Card className="custom-card">Content</Card>);
      const card = screen.getByText(/content/i);
      expect(card).toHaveClass("custom-card");
    });
  });

  describe("CardHeader", () => {
    it("should render card header", () => {
      render(<CardHeader>Header content</CardHeader>);
      const header = screen.getByText(/header content/i);
      expect(header).toBeInTheDocument();
    });
  });

  describe("CardTitle", () => {
    it("should render card title", () => {
      render(<CardTitle>Card Title</CardTitle>);
      const title = screen.getByText(/card title/i);
      expect(title).toBeInTheDocument();
    });
  });

  describe("CardDescription", () => {
    it("should render card description", () => {
      render(<CardDescription>Card description text</CardDescription>);
      const description = screen.getByText(/card description text/i);
      expect(description).toBeInTheDocument();
    });
  });

  describe("CardContent", () => {
    it("should render card content", () => {
      render(<CardContent>Main content</CardContent>);
      const content = screen.getByText(/main content/i);
      expect(content).toBeInTheDocument();
    });
  });

  describe("CardFooter", () => {
    it("should render card footer", () => {
      render(<CardFooter>Footer content</CardFooter>);
      const footer = screen.getByText(/footer content/i);
      expect(footer).toBeInTheDocument();
    });
  });

  describe("Complete Card", () => {
    it("should render a complete card with all parts", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText(/test title/i)).toBeInTheDocument();
      expect(screen.getByText(/test description/i)).toBeInTheDocument();
      expect(screen.getByText(/test content/i)).toBeInTheDocument();
      expect(screen.getByText(/test footer/i)).toBeInTheDocument();
    });
  });
});
