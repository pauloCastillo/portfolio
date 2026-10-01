"use client";

import { cn } from "~/utils/utils";
import type { ProjectCategory } from "~/lib/projectFilters";
import { useProjectsFilter } from "../ProjectsFilterContext";

const TABS: ReadonlyArray<{ value: ProjectCategory; label: string }> = [
  { value: "ALL", label: "ALL SYSTEMS" },
  { value: "WEB", label: "WEB APPS" },
  { value: "MOBILE", label: "MOBILE UNITS" },
  { value: "IOT", label: "IoT" },
];

export default function Filters() {
  const { category, setCategory } = useProjectsFilter();

  return (
    <div
      role="tablist"
      aria-label="Filtrar proyectos por categoría"
      className="flex p-1 bg-white/5 rounded-lg border border-border-glass"
    >
      {TABS.map((tab) => {
        const isActive = category === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setCategory(tab.value)}
            className={cn(
              "px-4 py-1.5 rounded-md text-sm font-mono transition-all cursor-pointer",
              isActive
                ? "bg-primary/20 text-primary shadow-[0_0_10px_rgba(6,182,212,0.1)] border border-primary/20"
                : "text-text-muted hover:text-white hover:bg-white/5 border border-transparent"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
