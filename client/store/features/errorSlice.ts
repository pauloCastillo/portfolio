import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ErrorState {
  id: number | null;
  message: string | null;
}

const initialState: ErrorState = {
  id: null,
  message: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.id = Date.now();
      state.message = action.payload;
    },
    clearError(state) {
      state.message = null;
    },  
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;