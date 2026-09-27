"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { RootState, AppDispatch } from "~/store/store";
import { setError } from "~/store/features/errorSlice";
import { logoutUser } from "~/store/features/authSlice";
import { useState, useCallback, useMemo } from "react";
import type { AuthLogin } from "@/types/user";
import authService from "~/services/auth";

export default function useAuth(){
    const dispatch : AppDispatch = useDispatch();
    const router = useRouter();
    const errorMessage = useSelector((state: RootState) => state.error.message);

    const [ loading, setLoading ] = useState(false);

    const auth = useMemo(() => authService(), []);

    const login = useCallback(async(logindata:AuthLogin) => {

        setLoading(true);
        const response = await auth.handleLogin(logindata);

        try {
            if(!response.success || response.status !== 200){
                setLoading(false);
                dispatch(setError("Login Failed! Please check your credentials and try again."));
            }
            setLoading(false);
            return response.success;
        } catch (error) {
            dispatch(setError("Server Error: " + (error instanceof Error ? error.message : "Unknown Error on the Server")));
            setLoading(false);
            return !response.success;
        }
    },[dispatch, auth]);

    const logout = useCallback(async () => {
        setLoading(true);
        try {
            // Destroy the server-side session cookie
            await auth.logout();
        } finally {
            // Clear client-side credentials even if the request fails
            dispatch(logoutUser());
            setLoading(false);
            router.push("/auth");
        }
    }, [dispatch, router, auth]);

    return {login, logout, loading, errorMessage}
}