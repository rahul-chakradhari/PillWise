import { createSlice } from "@reduxjs/toolkit";
import doctorReducer from "./doctorSlice";

const doctorSlice = createSlice({
  name: "doctorKey",
  initialState: {
    doctors: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// ✅ Named export
export const { setDoctors, setLoading, setError } = doctorSlice.actions;
export const doctorReducer = doctorSlice.reducer; // Named export
