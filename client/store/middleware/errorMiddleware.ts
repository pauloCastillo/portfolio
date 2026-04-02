import { Middleware } from "@reduxjs/toolkit";
import { useErrorHandler } from "~/services/errorHandler";

export const errorMiddleware: Middleware = () => (next) => (action) => {
    const { handleError } = useErrorHandler();   
    try {
        return next(action);
    } catch (error) {
        if (error instanceof Error) {
            handleError(error);
        }
        throw error;
    }
}