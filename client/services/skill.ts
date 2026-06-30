import axios from "axios";
import type { Skill } from "@/types/general";

export default function skillService() {
    const getAll = async (): Promise<Skill[]> => {
        const response = await axios.get<Skill[]>('/api/admin/skills');
        return response.data;
    }

    const getById = async (id: number): Promise<Skill> => {
        const response = await axios.get<Skill>(`/api/admin/skills/${id}`);
        return response.data;
    }

    const create = async (data: Partial<Skill>): Promise<Skill> => {
        const response = await axios.post<Skill>('/api/admin/skills', data);
        return response.data;
    }

    const update = async (id: number, data: Partial<Skill>): Promise<Skill> => {
        const response = await axios.put<Skill>(`/api/admin/skills/${id}`, data);
        return response.data;
    }

    const remove = async (id: number): Promise<void> => {
        await axios.delete(`/api/admin/skills/${id}`);
    }

    return { getAll, getById, create, update, remove }
}
