"use client";

import { useEffect, useMemo, useState } from "react"
import ProjectHeader from "./components/ProjectHeader";
import SocialShare from "./components/SocialShare";
import ProjectImage from "./components/ProjectImage";
import ProjectContent from "./components/ProjectContent";
import Loading from "@/loading";
import projectService from "~/services/project";
import type { Project } from "@/types/general";

export default function ProjectDetails({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const service = useMemo(() => projectService(), []);

  useEffect(() => {
    (async () => {
      try {
        const { slug } = await params;
        const id = parseInt(slug);
        if (isNaN(id)) { setLoading(false); return; }
        const data = await service.getProjectById(id);
        setProject(data);
      } catch {
        // not found
      } finally {
        setLoading(false);
      }
    })();
  }, [params, service]);

  if (loading) return <Loading />;
  if (!project) return <div className="p-8 text-center text-muted">Project not found</div>;

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center py-12 bg-gray-50">
      <div className="w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <ProjectHeader
          title={project.title}
          author="Admin"
          date={new Date(project.published_date).toLocaleDateString("en-GB", {
            day: "numeric", month: "short", year: "numeric"
          }).toUpperCase()}
        />
        <SocialShare title={project.title} />
        {project.image_file && (
          <ProjectImage src={project.image_file} alt={project.title} />
        )}
        <ProjectContent>
          <p className="mb-4 leading-relaxed">{project.description}</p>
        </ProjectContent>
        <div className="mt-8 flex gap-2">
          {project.tech_stack?.split(", ").map((tech) => (
            <span key={tech} className="px-3 py-1 bg-gray-200 rounded text-sm">{tech}</span>
          ))}
        </div>
        <div className="mt-4 flex gap-4">
          {project.project_link && (
            <a href={project.project_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Project →</a>
          )}
          {project.github_link && (
            <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Source →</a>
          )}
        </div>
      </div>
    </div>
  )
}
