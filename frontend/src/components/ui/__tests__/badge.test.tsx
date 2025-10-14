import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";

describe("Badge", () => {
  it("should render with default variant", () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText(/default badge/i);
    expect(badge).toBeInTheDocument();
  });

  it("should render with different variants", () => {
    const { rerender } = render(<Badge variant="secondary">Secondary</Badge>);
    let badge = screen.getByText(/secondary/i);
    expect(badge).toBeInTheDocument();

    rerender(<Badge variant="destructive">Destructive</Badge>);
    badge = screen.getByText(/destructive/i);
    expect(badge).toBeInTheDocument();

    rerender(<Badge variant="outline">Outline</Badge>);
    badge = screen.getByText(/outline/i);
    expect(badge).toBeInTheDocument();
  });

  it("should accept custom className", () => {
    render(<Badge className="custom-badge">Custom</Badge>);
    const badge = screen.getByText(/custom/i);
    expect(badge).toHaveClass("custom-badge");
  });

  it("should render children correctly", () => {
    render(
      <Badge>
        <span>Badge Content</span>
      </Badge>
    );
    const content = screen.getByText(/badge content/i);
    expect(content).toBeInTheDocument();
  });
});
