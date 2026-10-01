import { Middleware } from "@reduxjs/toolkit";
import { store } from "~/store/store";
import { setError } from "~/store/features/errorSlice";

export const errorMiddleware: Middleware = () => (next) => (action) => {
    try {
        return next(action);
    } catch (error) {
        if (error instanceof Error) {
            store.dispatch(setError(error.message));
        }
        throw error;
    }
}