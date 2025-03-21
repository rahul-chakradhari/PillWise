import { createSlice } from "@reduxjs/toolkit";

export const doctorSlice = createSlice({
  name: "doctorSlice",
  initialState: {
    doctors: [],
    loading: false,
    error: null,
  },
  reducers: {
    //set doctors
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
    //set loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    //set error
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setDoctors, setLoading, setError } = doctorSlice.actions;
export default doctorSlice.reducer;
