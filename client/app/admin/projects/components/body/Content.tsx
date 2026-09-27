"use client";

import { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import BodyNavbar from "./BodyNavbar";
import Card from "./ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import { useProjectsFilter } from "../ProjectsFilterContext";
import { filterProjects } from "~/lib/projectFilters";
import { useRouter } from "next/navigation";

export default function ProjectsContent(){

    const { projects, isLoading, error } = useProjects();
    const { query, category } = useProjectsFilter();
    const router = useRouter();

    const visibleProjects = useMemo(
        () => filterProjects(projects, query, category),
        [projects, query, category]
    );

    const liveCount = useMemo(
        () => projects.filter((project) => project.published).length,
        [projects]
    );
    const draftCount = projects.length - liveCount;

    return(
      <div className="flex-1 overflow-y-auto p-8 relative">
            <BodyNavbar liveCount={liveCount} draftCount={draftCount} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pb-12">
                <Card projects={visibleProjects} />
                <div
                    onClick={() => router.push("/admin/projects/edit")}
                    className="glass-panel border-dashed border-2 border-border-glass rounded-xl overflow-hidden group hover:border-primary/30 transition-all duration-300 flex flex-col items-center justify-center min-h-80 cursor-pointer">
                    <div
                        className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                            <FontAwesomeIcon icon={faAdd} className="text-3xl text-text-muted group-hover:text-primary transition-colors" />
                    </div>
                    <p className="font-display font-bold text-lg text-white mb-1">New Artifact</p>
                    <p className="font-mono text-xs text-text-muted uppercase tracking-wider">Deploy to Grid</p>
                </div>
            </div>
            {!isLoading && !error && visibleProjects.length === 0 && (
                <p className="text-center font-mono text-sm text-text-muted pb-12">
                    No artifacts match the current filter. Adjust the search or category.
                </p>
            )}
            {error && (
                <p className="text-center font-mono text-sm text-error pb-12">
                    Failed to load projects. Please try again later.
                </p>
            )}
            <div
                className="absolute bottom-0 left-0 w-full h-12 from-void to-transparent pointer-events-none">
            </div>
        </div>
    )
}
