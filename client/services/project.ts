import axios from "axios";
import type { Project } from "@/types/general";

export default function projectService() {
    const getAllProjects = async () : Promise<Project[]> => {
        try {
            const response = await axios.get<Project[]>('/api/admin/projects');
            return response.data;
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
            throw new Error('Error al obtener los proyectos');
        }
    }

    return {
        getAllProjects
    }
}