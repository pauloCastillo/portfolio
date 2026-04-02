"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "~/store/store";
import { setError } from "~/store/features/errorSlice";
import { useState, useCallback} from "react";
import type { AuthLogin } from "@/types/user";
import authService from "~/services/auth";

export default function useAuth(){
    const dispatch : AppDispatch = useDispatch();
    const errorMessage = useSelector((state: RootState) => state.error.message);

    const [ loading, setLoading ] = useState(false);

    const login = useCallback(async(logindata:AuthLogin) => {
 
        setLoading(true);
        const auth = authService();
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
    },[dispatch]);

    // const logout = useCallback(async () => {
    //     // Remove the token from Redux
    //     dispatch(logoutUser());
    //     // Remove the cookie
    // }, [dispatch]);

    return {login, loading, errorMessage}
}