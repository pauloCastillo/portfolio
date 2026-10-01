import axios from "axios";
import type { User, UserCreatePayload, UserUpdatePayload } from "@/types/user";

export default function userService() {
    const getAllUsers = async (): Promise<User[]> => {
        const response = await axios.get<User[]>('/api/admin/users');
        return response.data;
    }

    const getUserById = async (id: string): Promise<User> => {
        const response = await axios.get<User>(`/api/admin/users/${id}`);
        return response.data;
    }

    const createUser = async (user: UserCreatePayload): Promise<User> => {
        const response = await axios.post<User>('/api/admin/users', user);
        return response.data;
    }

    const updateUser = async (id: string, user: UserUpdatePayload): Promise<User> => {
        const response = await axios.put<User>(`/api/admin/users/${id}`, user);
        return response.data;
    }

    const toggleActive = async (id: string, isActive: boolean): Promise<User> => {
        return updateUser(id, { isActive });
    }

    const deleteUser = async (id: string): Promise<void> => {
        await axios.delete(`/api/admin/users/${id}`);
    }

    return {
        getAllUsers,
        getUserById,
        createUser,
        updateUser,
        toggleActive,
        deleteUser,
    }
}
