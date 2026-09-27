"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProjectCategory } from "~/lib/projectFilters";

type ProjectsFilterContextValue = {
  query: string;
  setQuery: (query: string) => void;
  category: ProjectCategory;
  setCategory: (category: ProjectCategory) => void;
};

const ProjectsFilterContext =
  createContext<ProjectsFilterContextValue | null>(null);

export function ProjectsFilterProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProjectCategory>("ALL");

  const value = useMemo(
    () => ({ query, setQuery, category, setCategory }),
    [query, category]
  );

  return (
    <ProjectsFilterContext.Provider value={value}>
      {children}
    </ProjectsFilterContext.Provider>
  );
}

export function useProjectsFilter(): ProjectsFilterContextValue {
  const ctx = useContext(ProjectsFilterContext);
  if (!ctx) {
    throw new Error(
      "useProjectsFilter must be used within ProjectsFilterProvider"
    );
  }
  return ctx;
}
