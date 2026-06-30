"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState, useEffect } from "react";
import type { Project } from "@/types/general";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/shared/ui/ScrollReveal";
import projectService from "~/services/project";

library.add(faCode, faArrowUpRightFromSquare);

function LoadingSkeleton() {
  return (
    <section id="proyectos" className="max-w-[1100px] mx-auto px-10 max-md:px-5 py-20 max-md:py-14">
      <p className="font-mono text-xs text-cyan uppercase tracking-[0.08em] mb-3">// proyectos</p>
      <p className="text-muted">Cargando proyectos...</p>
    </section>
  );
}

function ErrorState() {
  return (
    <section id="proyectos" className="max-w-[1100px] mx-auto px-10 max-md:px-5 py-20 max-md:py-14">
      <p className="font-mono text-xs text-cyan uppercase tracking-[0.08em] mb-3">// proyectos</p>
      <p className="text-muted">Error al cargar proyectos.</p>
    </section>
  );
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await projectService().getPublishedProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorState />;

  return (
    <section id="proyectos" className="max-w-[1100px] mx-auto px-10 max-md:px-5 py-20 max-md:py-14">
      <ScrollReveal>
        <p className="font-mono text-xs text-cyan uppercase tracking-[0.08em] mb-3">
          // proyectos
        </p>
        <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.01em] mb-4">
          Proyectos destacados
        </h2>
        <p className="text-base text-muted max-w-[500px] leading-relaxed mb-12">
          Una muestra de los proyectos que he construido — cada uno con su propia historia y desafíos.
        </p>
      </ScrollReveal>

      <StaggerContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project: Project, index: number) => (
            <StaggerItem key={project.id}>
              <div
                className={`flex flex-col gap-3 bg-surface border rounded-xl p-7 transition-all duration-300 ${
                  index === 0
                    ? "md:col-span-2 border-[rgba(34,211,238,0.25)]"
                    : "border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <FontAwesomeIcon
                    icon={faCode}
                    className="text-cyan text-[28px]"
                  />
                  <span className="font-mono text-xs text-muted">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-1" />
                    ver proyecto ↗
                  </span>
                </div>
                <h3 className="text-[17px] font-semibold text-text">
                  {project.title}
                </h3>
                <p className="text-sm text-muted leading-[1.6]">
                  {project.description}
                </p>
                {project.tech_stack && (
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tech_stack.split(", ").map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] text-indigo bg-[rgba(99,102,241,0.1)] px-[10px] py-[3px] rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}
