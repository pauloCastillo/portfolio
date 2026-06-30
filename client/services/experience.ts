import axios from "axios";
import type { Experience } from "@/types/general";

export default function experienceService() {
    const getAll = async (): Promise<Experience[]> => {
        const response = await axios.get<Experience[]>('/api/admin/experiences');
        return response.data;
    }

    const getById = async (id: number): Promise<Experience> => {
        const response = await axios.get<Experience>(`/api/admin/experiences/${id}`);
        return response.data;
    }

    const create = async (data: Partial<Experience>): Promise<Experience> => {
        const response = await axios.post<Experience>('/api/admin/experiences', data);
        return response.data;
    }

    const update = async (id: number, data: Partial<Experience>): Promise<Experience> => {
        const response = await axios.put<Experience>(`/api/admin/experiences/${id}`, data);
        return response.data;
    }

    const remove = async (id: number): Promise<void> => {
        await axios.delete(`/api/admin/experiences/${id}`);
    }

    return { getAll, getById, create, update, remove }
}
