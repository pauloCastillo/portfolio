"use client";

import { Provider } from "react-redux"
import { store } from "./store"
import type { ChildrenType } from "@/types/general";

export function StoreProvider({ children }: ChildrenType){
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}