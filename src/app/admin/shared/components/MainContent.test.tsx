// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import MainContent from "./MainContent";
import type { Post, Project } from "@/types/general";

afterEach(() => cleanup());

const fakeProjects: Project[] = [
  {
    id: 1, title: "A", description: "a", content: null, image_file: null,
    project_link: null, github_link: null, tech_stack: null,
    published: true, published_date: "2026-09-01", updated_at: "2026-09-01",
  },
  {
    id: 2, title: "B", description: "b", content: null, image_file: null,
    project_link: null, github_link: null, tech_stack: null,
    published: true, published_date: "2026-09-02", updated_at: "2026-09-02",
  },
  {
    id: 3, title: "C", description: "c", content: null, image_file: null,
    project_link: null, github_link: null, tech_stack: null,
    published: false, published_date: "2026-09-03", updated_at: "2026-09-03",
  },
];

const fakePosts: Post[] = [
  {
    id: 1, title: "P1", content: "c1", image_file: null, author_id: "u1",
    published: true, published_date: "2026-09-01",
  },
  {
    id: 2, title: "P2", content: "c2", image_file: null, author_id: "u1",
    published: false, published_date: "2026-09-02",
  },
];

vi.mock("@/hooks/useProjects", () => ({
  useProjects: () => ({ projects: fakeProjects, isLoading: false, error: null }),
}));

vi.mock("@/hooks/usePosts", () => ({
  usePosts: () => ({ posts: fakePosts, isLoading: false, error: null }),
}));

vi.mock("@/hooks/useVisitStats", () => ({
  useVisitStats: () => ({
    stats: {
      today: 5,
      last_7d: 9,
      last_30d: 12,
      series: [{ date: "2026-09-30", uniques: 5 }],
    },
    isLoading: false,
    error: null,
  }),
}));

describe("MainContent dashboard", () => {
  it("muestra conteos reales de publicados y visitantes", () => {
    render(<MainContent />);

    expect(screen.getByText("Published Posts")).toBeDefined();
    expect(screen.getByText("Published Projects")).toBeDefined();
    expect(screen.getByText("Unique Visitors Today")).toBeDefined();
    // 1 post publicado de 2, 2 proyectos publicados de 3, 5 únicos hoy
    // (el 5 aparece en la card y en el tooltip de la barra de tendencia)
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
    expect(screen.getAllByText("5")).toHaveLength(2);
    // contexto 30 días en la card de visitantes + barra de tendencia
    expect(screen.getByText("12 30d")).toBeDefined();
    expect(screen.getByTestId("trend-bar-2026-09-30")).toBeDefined();
  });

  it("ya no muestra las métricas mock anteriores", () => {
    render(<MainContent />);

    expect(screen.queryByText("Total Views")).toBeNull();
    expect(screen.queryByText("System Uptime")).toBeNull();
    expect(screen.queryByText("Active Leads")).toBeNull();
    expect(screen.queryByText("Deploy Speed")).toBeNull();
  });
});
