// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { LocaleProvider } from "~/lib/LocaleProvider";
import NavbarLayout from "./Navbar";

const { mockPathname } = vi.hoisted(() => ({ mockPathname: { value: "/" } }));

vi.mock("next/navigation", () => ({
  usePathname: () => mockPathname.value,
}));

vi.mock("next/link", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ href, children, ...props }: any) => (
    <a href={typeof href === "string" ? href : String(href)} {...props}>
      {children}
    </a>
  ),
}));

beforeAll(() => {
  if (typeof globalThis.IntersectionObserver === "undefined") {
    globalThis.IntersectionObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof IntersectionObserver;
  }
});

beforeEach(() => {
  try {
    window.localStorage.clear();
  } catch {
    // jsdom sin storage: ignorar
  }
});

afterEach(() => {
  cleanup();
});

function renderNavbar() {
  return render(
    <LocaleProvider>
      <NavbarLayout />
    </LocaleProvider>
  );
}

describe("Navbar minimalista en blog", () => {
  it("en home muestra secciones y oculta Home; logo y CTA apuntan a home", () => {
    mockPathname.value = "/";
    const { container } = renderNavbar();

    expect(screen.queryByText("Inicio")).toBeNull();
    expect(screen.getByText("Stack")).toBeTruthy();
    expect(screen.getByText("Blog")).toBeTruthy();

    const logo = container.querySelector('a[href="/"]');
    expect(logo?.textContent).toContain("Kasti");

    const cta = screen.getByText("Hablemos →");
    expect(cta.closest("a")?.getAttribute("href")).toBe("#contacto");
  });

  it("en /blog muestra solo Home + Blog; logo y CTA llevan a home", () => {
    mockPathname.value = "/blog";
    renderNavbar();

    expect(screen.getByText("Inicio")).toBeTruthy();
    expect(screen.getByText("Blog")).toBeTruthy();
    expect(screen.queryByText("Stack")).toBeNull();
    expect(screen.queryByText("Proyectos")).toBeNull();

    expect(screen.getByText("Inicio").closest("a")?.getAttribute("href")).toBe("/");
    expect(screen.getByText("Blog").closest("a")?.getAttribute("href")).toBe("/blog");

    const cta = screen.getByText("Hablemos →");
    expect(cta.closest("a")?.getAttribute("href")).toBe("/#contacto");
  });

  it("en /blog/[slug] mantiene el modo minimalista", () => {
    mockPathname.value = "/blog/123";
    renderNavbar();

    expect(screen.getByText("Inicio")).toBeTruthy();
    expect(screen.queryByText("Stack")).toBeNull();

    const cta = screen.getByText("Hablemos →");
    expect(cta.closest("a")?.getAttribute("href")).toBe("/#contacto");
  });
});
