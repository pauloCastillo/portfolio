import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    token_type: string | null; 
}

const initialState:AuthState = {
    token: null,
    token_type: null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials(state, action:PayloadAction<AuthState>){
            state.token = action.payload.token;
            state.token_type = action.payload.token_type 
        },

        logoutUser(state){
            state.token = null;
            state.token_type = null;
        }
    }
})

export const { setCredentials, logoutUser } = authSlice.actions
export default authSlice.reducer