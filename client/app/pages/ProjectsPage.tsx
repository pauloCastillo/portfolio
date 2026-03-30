"use client";

import BaseCard from "@/components/UI/BaseCard";
import { useProjects } from "@/hooks/useProjects";
import { Project } from "@/types/general";

export default function ProjectsLayout() {
  const { projects, isLoading, error } = useProjects();

  if (isLoading) return <div>Cargando proyectos...</div>;
  if (error) return <div>Error al cargar proyectos: {error.message}</div>;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
        Proyectos Destacados
      </h1>
      <p className="font-light text-xs text-center mt-2.5">
        Te presento una lista de mis proyectos más destacados.
        <br /> Mostrándote mis habilidades y experiencia en desarrollo y diseño
        web.
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {projects.map((project: Project) => (
          <BaseCard key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
}
