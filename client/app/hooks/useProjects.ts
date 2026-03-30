"use client";

import { useState, useEffect } from "react";
import { Project } from "@/types/general";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Hardcoded data - in a real app, this would come from an API
        const dummyProjects: Project[] = [
          {
            id: 1,
            name: "Proyecto 1",
            imageUrl: "/images/project1.svg",
            description: "Descripción del proyecto 1",
            stack: ["React", "Next.js", "TypeScript"],
          },
          {
            id: 2,
            name: "Proyecto 2",
            imageUrl: "/images/project2.svg",
            description: "Descripción del proyecto 2",
            stack: ["React", "Next.js", "TypeScript"],
          },
          {
            id: 3,
            name: "Proyecto 3",
            imageUrl: "/images/project3.svg",
            description: "Descripción del proyecto 3",
            stack: ["React", "Next.js", "TypeScript"],
          },
        ];
        
        setProjects(dummyProjects);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"));
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, isLoading, error };
}