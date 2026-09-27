import type { Project } from "@/types/general";

export type ProjectCategory = "ALL" | "WEB" | "MOBILE" | "IOT";

export type ProjectFilter = Exclude<ProjectCategory, "ALL"> | "OTHER";

const MOBILE_KEYWORDS = [
  "react native",
  "flutter",
  "swift",
  "kotlin",
  "expo",
  "android",
  "ios",
  "mobile",
  "dart",
  "ionic",
  "capacitor",
];

const IOT_KEYWORDS = [
  "iot",
  "arduino",
  "raspberry",
  "esp32",
  "esp8266",
  "mqtt",
  "embedded",
  "micropython",
  "firmware",
];

const WEB_KEYWORDS = [
  "react",
  "next",
  "vue",
  "angular",
  "svelte",
  "node",
  "express",
  "django",
  "flask",
  "laravel",
  "tailwind",
  "typescript",
  "javascript",
  "html",
  "css",
  "fastapi",
  "nest",
  "nuxt",
  "remix",
  "web",
];

function haystackOf(project: Pick<Project, "title" | "description" | "tech_stack">): string {
  return [project.title, project.description, project.tech_stack ?? ""]
    .join(" ")
    .toLowerCase();
}

/**
 * Clasifica un proyecto según palabras clave en título/descripción/tech_stack.
 * Prioridad MOBILE > IOT > WEB para que "React Native" no caiga en WEB.
 * Sin coincidencias devuelve "OTHER" (visible solo con el filtro ALL).
 */
export function categorizeProject(
  project: Pick<Project, "title" | "description" | "tech_stack">
): ProjectFilter {
  const haystack = haystackOf(project);
  if (MOBILE_KEYWORDS.some((kw) => haystack.includes(kw))) return "MOBILE";
  if (IOT_KEYWORDS.some((kw) => haystack.includes(kw))) return "IOT";
  if (WEB_KEYWORDS.some((kw) => haystack.includes(kw))) return "WEB";
  return "OTHER";
}

/**
 * Filtra proyectos por categoría y texto libre (título, descripción, stack).
 */
export function filterProjects(
  projects: Project[],
  query: string,
  category: ProjectCategory
): Project[] {
  const normalizedQuery = query.trim().toLowerCase();
  return projects.filter((project) => {
    if (category !== "ALL" && categorizeProject(project) !== category) {
      return false;
    }
    if (normalizedQuery && !haystackOf(project).includes(normalizedQuery)) {
      return false;
    }
    return true;
  });
}
