import { describe, it, expect, vi } from "vitest";
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

  it("should accept asChild prop without passing it to DOM", () => {
    // The asChild prop is accepted but not implemented in basic button
    // It should not cause React warnings or be passed to DOM
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<Button asChild>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    // Verify no React warnings about unknown prop
    expect(consoleError).not.toHaveBeenCalledWith(
      expect.stringContaining("asChild")
    );

    consoleError.mockRestore();
  });

  it("should not pass asChild to button element", () => {
    render(<Button asChild>Test</Button>);
    const button = screen.getByRole("button");

    // asChild should not appear as a DOM attribute
    expect(button).not.toHaveAttribute("aschild");
    expect(button).not.toHaveAttribute("asChild");
  });

  it("should accept custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
