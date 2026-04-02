"use client";

import { Provider } from "react-redux"
import { store } from "./store"
import type { ChildrenType } from "@/types/general";
import ErrorModal from "@/components/UI/modals/ErrorModal";

export function StoreProvider({ children }: ChildrenType){
    return(
        <Provider store={store}>
            {children}
            <ErrorModal />
        </Provider>
    )
}