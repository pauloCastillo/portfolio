import { describe, it, expect } from "vitest";
import { categorizeProject, filterProjects } from "./projectFilters";
import type { Project } from "@/types/general";

function makeProject(overrides: Partial<Project> = {}): Project {
  return {
    id: 1,
    title: "Test project",
    description: "Test description",
    content: null,
    image_file: null,
    project_link: null,
    github_link: null,
    tech_stack: null,
    published: true,
    published_date: "2026-01-01",
    updated_at: "2026-01-01",
    ...overrides,
  };
}

describe("categorizeProject", () => {
  it("prioriza MOBILE sobre WEB (React Native contiene React)", () => {
    expect(
      categorizeProject(
        makeProject({ tech_stack: "React Native, Expo" })
      )
    ).toBe("MOBILE");
  });

  it("clasifica IoT por stack", () => {
    expect(
      categorizeProject(
        makeProject({ tech_stack: "Arduino, MQTT", title: "Sensor node" })
      )
    ).toBe("IOT");
  });

  it("clasifica WEB por stack", () => {
    expect(
      categorizeProject(
        makeProject({ tech_stack: "Next.js, Tailwind" })
      )
    ).toBe("WEB");
  });

  it("devuelve OTHER sin coincidencias", () => {
    expect(categorizeProject(makeProject({ title: "X", description: "Y" }))).toBe(
      "OTHER"
    );
  });
});

describe("filterProjects", () => {
  const projects = [
    makeProject({ id: 1, title: "Shop web", tech_stack: "Next.js" }),
    makeProject({ id: 2, title: "Fit tracker", tech_stack: "Flutter" }),
    makeProject({ id: 3, title: "Mystery box", tech_stack: "Cobol" }),
  ];

  it("ALL devuelve todo sin query", () => {
    expect(filterProjects(projects, "", "ALL")).toHaveLength(3);
  });

  it("filtra por categoría", () => {
    expect(filterProjects(projects, "", "MOBILE").map((p) => p.id)).toEqual([2]);
  });

  it("filtra por texto en título, descripción y stack", () => {
    expect(filterProjects(projects, "shop", "ALL").map((p) => p.id)).toEqual([1]);
    expect(filterProjects(projects, "flutter", "ALL").map((p) => p.id)).toEqual([2]);
    expect(filterProjects(projects, "cobol", "ALL").map((p) => p.id)).toEqual([3]);
  });

  it("combina categoría y query", () => {
    expect(filterProjects(projects, "tracker", "WEB")).toHaveLength(0);
    expect(filterProjects(projects, "tracker", "MOBILE").map((p) => p.id)).toEqual([2]);
  });
});
