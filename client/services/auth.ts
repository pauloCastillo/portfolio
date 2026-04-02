import axios from 'axios';
import { AuthLogin } from "@/types/user";

type AuthResponse = {
    success: boolean;
    status: number;
    error: string | null;
}

export default function authService() {
    const handleLogin = async (logindata: AuthLogin): Promise<AuthResponse> => {
        try {
            const response = await axios.post('/api/auth/login', logindata);
            return { success: true, status: response.status, error: null };
        } catch (error: any) {
            return {
                success: false,
                status: error.response?.status || 500,
                error: error.response?.data?.error || 'Error de conexión'
            };
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return { handleLogin, logout };
}