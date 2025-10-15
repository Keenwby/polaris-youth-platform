/**
 * Theme Toggle Tests
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "../theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset document classes
    document.documentElement.className = "";

    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("should render toggle button", async () => {
    render(<ThemeToggle />);
    const button = await screen.findByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should start with light theme by default", async () => {
    render(<ThemeToggle />);
    await screen.findByRole("button");
    expect(document.documentElement.classList.contains("light")).toBe(true);
  });

  it("should toggle to dark theme when clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = await screen.findByRole("button");
    await user.click(button);

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("should toggle back to light theme", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = await screen.findByRole("button");

    // Toggle to dark
    await user.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    // Toggle back to light
    await user.click(button);
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("should load saved theme from localStorage", async () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeToggle />);

    await screen.findByRole("button");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("should render moon icon in light mode", async () => {
    render(<ThemeToggle />);
    const button = await screen.findByRole("button");
    expect(button.textContent).toContain("🌙");
  });

  it("should render sun icon in dark mode", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const button = await screen.findByRole("button");
    await user.click(button);

    expect(button.textContent).toContain("☀️");
  });

  it("should have accessible label", async () => {
    render(<ThemeToggle />);
    const button = await screen.findByRole("button");
    expect(button.textContent).toMatch(/切换/);
  });
});
