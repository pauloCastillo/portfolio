"use client";

import { api } from "@/api/config";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "~/store/store";
import { setCredentials, logoutUser } from "~/store/features/authSlice";
import { useState, useCallback} from "react";

export default function useAuth(){
    const dispatch : AppDispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState<string | null>(null)

    const login = useCallback(async(logindata:{email:string, password:string}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post("auth/login", logindata,{ headers:{
                "Content-Type":"application/json"
            }});
            if(response.status === 200 && response.data.access_token){
                dispatch(setCredentials({token:response.data.token, token_type:response.data.token_type}));
                // Set cookie for middleware authentication
                document.cookie = `access_token=${response.data.token}; path=/; max-age=${60*60*24*7};`; // 1 week
                setLoading(false);
                return true;
            }else{
                throw new Error("Invalid response from server!");
            }
        } catch (error) {
            const message = error instanceof Error 
            ? error.message
            : "An unknown error occured durin login"
            setError(message);
            setLoading(false);
            return false
        }
    },[dispatch]);

    const logout = useCallback(() => {
        // Remove the token from Redux
        dispatch(logoutUser());
        // Remove the cookie
        document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }, [dispatch]);

    return {token, login, logout, loading, error}
}