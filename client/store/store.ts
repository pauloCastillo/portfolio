import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "~/store/features/errorSlice";
import authReducer from "~/store/features/authSlice"
import toastReducer from "~/store/features/toastSlice";
import { errorMiddleware } from "./middleware/errorMiddleware";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        error: errorReducer,
        toast: toastReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch