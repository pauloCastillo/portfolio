import axios from "axios";
import type { Project } from "@/types/general";

export default function projectService() {
    const getAllProjects = async (): Promise<Project[]> => {
        const response = await axios.get<Project[]>('/api/admin/projects');
        return response.data;
    }

    const getPublishedProjects = async (): Promise<Project[]> => {
        const response = await axios.get<Project[]>('/api/admin/projects/published');
        return response.data;
    }

    const getProjectById = async (id: number): Promise<Project> => {
        const response = await axios.get<Project>(`/api/admin/projects/${id}`);
        return response.data;
    }

    const createProject = async (project: Partial<Project>): Promise<Project> => {
        const response = await axios.post<Project>('/api/admin/projects', project);
        return response.data;
    }

    const updateProject = async (id: number, project: Partial<Project>): Promise<Project> => {
        const response = await axios.put<Project>(`/api/admin/projects/${id}`, project);
        return response.data;
    }

    const deleteProject = async (id: number): Promise<void> => {
        await axios.delete(`/api/admin/projects/${id}`);
    }

    const uploadImage = async (file: File): Promise<{ filename: string; path: string }> => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('/api/admin/projects/upload/image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    }

    return {
        getAllProjects,
        getPublishedProjects,
        getProjectById,
        createProject,
        updateProject,
        deleteProject,
        uploadImage,
    }
}
