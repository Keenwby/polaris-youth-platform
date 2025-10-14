import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("Button", () => {
  it("should render with default variant", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("should render with different variants", () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>);
    let button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    rerender(<Button variant="ghost">Ghost</Button>);
    button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should render with different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should handle disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should render as child when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("should accept custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
