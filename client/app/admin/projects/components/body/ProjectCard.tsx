"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-regular-svg-icons"
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Project = {
    id: number;
    image_file: string | null;
    title: string;
    description: string;
    github_link: string | null;
    project_link: string | null;
    tech_stack: string | null;
    published: boolean;
}

type ProjectCard = {
    projects: Project[];
}

export default function Card({ projects }: Readonly<ProjectCard>) {
    const router = useRouter();

    return (
        <>
            {projects.map((project) => (
                <div
                    key={project.id}
                    className="glass-panel rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:-translate-y-1 relative flex flex-col">
                    <div className="relative h-48 overflow-hidden bg-void">
                        {project.image_file ? (
                            <Image
                                src={project.image_file}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                width={400}
                                height={300}
                            />
                        ) : (
                            <Image
                                src={"/images/proyecto1.svg"}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                width={400}
                                height={300}
                            />
                        )}
                        <div className="absolute inset-0 from-void via-transparent to-transparent opacity-90"></div>
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                            <button
                                className="w-10 h-10 rounded-full bg-void/80 border border-primary/50 text-primary flex items-center justify-center hover:bg-primary hover:text-void transition-all hover:scale-110 hover:cursor-pointer"
                                title="Edit Artifact"
                                onClick={() => router.push(`/admin/projects/edit?id=${project.id}`)}
                            >
                                <FontAwesomeIcon icon={faEdit} className="text-lg font-bold" />
                            </button>
                            <button
                                className="w-10 h-10 rounded-full bg-void/80 border border-primary/50 text-primary flex items-center justify-center hover:bg-primary hover:text-void transition-all hover:scale-110 hover:cursor-pointer"
                                title="View Live"
                                onClick={() => router.push(`/admin/projects/${project.id}`)}
                            >
                                <FontAwesomeIcon icon={faEye} className="text-lg font-bold" />
                            </button>
                        </div>
                        <div className={`absolute top-3 right-3 px-2 py-1 bg-void/90 backdrop-blur rounded border flex items-center gap-2 shadow-[0_0_10px_rgba(16,185,129,0.2)] ${project.published ? 'border-success/30' : 'border-amber-500/30'}`}>
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${project.published ? 'bg-success' : 'bg-amber-400'} opacity-75`}></span>
                                <span className={`relative inline-flex rounded-full h-2 w-2 ${project.published ? 'bg-success' : 'bg-amber-500'}`}></span>
                            </span>
                            <span className="text-[10px] font-mono font-bold tracking-wider uppercase" style={{ color: project.published ? '#10b981' : '#f59e0b' }}>
                                {project.published ? 'LIVE' : 'DRAFT'}
                            </span>
                        </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                        <div
                            className="flex justify-between items-start mb-2 hover:cursor-pointer group"
                            onClick={() => router.push(`/admin/projects/${project.id}`)}
                        >
                            <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                            <FontAwesomeIcon icon={faUpRightFromSquare} className="text-text-muted opacity-0 group-hover:opacity-50 transition-opacity text-sm" />
                        </div>
                        <p className="text-sm text-text-muted mb-4 font-body line-clamp-2">
                            {project.description}
                        </p>
                        {project.tech_stack && (
                            <div className="mt-auto flex flex-wrap gap-2">
                                {project.tech_stack.split(", ").map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-primary uppercase tracking-wide group-hover:border-primary/30 transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}
