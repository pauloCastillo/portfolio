"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import type { Project } from "@/types/general";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/shared/ui/ScrollReveal";
import projectService from "~/services/project";
import { useLocale } from "~/lib/LocaleProvider";

library.add(faCode, faArrowUpRightFromSquare);

function toAbsoluteUrl(url: string): string {
  const trimmed = url.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function ProjectCardLink({
  href,
  className,
  children,
}: {
  href: string | null;
  className: string;
  children: React.ReactNode;
}) {
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

function LoadingSkeleton({ label, message }: { label: string; message: string }) {
  return (
    <section id="proyectos" className="max-w-[1100px] mx-auto px-10 max-md:px-5 py-20 max-md:py-14">
      <p className="font-mono text-xs text-cyan uppercase tracking-[0.08em] mb-3">{label}</p>
      <p className="text-muted">{message}</p>
    </section>
  );
}

function ErrorState({ label, message }: { label: string; message: string }) {
  return (
    <section id="proyectos" className="max-w-[1100px] mx-auto px-10 max-md:px-5 py-20 max-md:py-14">
      <p className="font-mono text-xs text-cyan uppercase tracking-[0.08em] mb-3">{label}</p>
      <p className="text-muted">{message}</p>
    </section>
  );
}

export default function ProjectsSection() {
  const { t } = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const service = useMemo(() => projectService(), []);

  useEffect(() => {
    (async () => {
      try {
        const data = await service.getPublishedProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [service]);

  if (isLoading) return <LoadingSkeleton label={t.projects.label} message={t.projects.loading} />;
  if (error) return <ErrorState label={t.projects.label} message={t.projects.error} />;

  return (
    <section id="proyectos" className="max-w-[1100px] mx-auto px-10 max-md:px-5 py-20 max-md:py-14">
      <ScrollReveal>
        <p className="font-mono text-xs text-cyan uppercase tracking-[0.08em] mb-3">
          {t.projects.label}
        </p>
        <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.01em] mb-4">
          {t.projects.title}
        </h2>
        <p className="text-base text-muted max-w-[500px] leading-relaxed mb-12">
          {t.projects.description}
        </p>
      </ScrollReveal>

      <StaggerContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project: Project, index: number) => (
            <StaggerItem key={project.id}>
              <ProjectCardLink
                href={
                  project.project_link?.trim()
                    ? toAbsoluteUrl(project.project_link)
                    : null
                }
                className={`flex flex-col gap-3 bg-surface border rounded-xl p-7 transition-all duration-300 ${
                  index === 0
                    ? "md:col-span-2 border-[rgba(34,211,238,0.25)]"
                    : "border-border"
                } ${
                  project.project_link?.trim()
                    ? "cursor-pointer hover:-translate-y-1 hover:border-cyan/40"
                    : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden rounded-lg bg-void ${
                    index === 0 ? "h-44 md:h-64" : "h-44"
                  }`}
                >
                  <Image
                    src={project.image_file || "/images/project1.svg"}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <FontAwesomeIcon
                    icon={faCode}
                    className="text-cyan text-[28px]"
                  />
                  <span className="font-mono text-xs text-muted">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="mr-1" />
                    {t.projects.viewProject}
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
              </ProjectCardLink>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}
