import { createSlice } from "@reduxjs/toolkit";
import { doctorSlice } from "./doctorSlice";

export const prescrioptionSlice = createSlice({
  name: "prescriptionSlice",
  initialState: {
    prescriptions: [],
    loading: false,
    error: null,
  },
  reducers: {
    //set prescription
    setPrescription: (state, action) => {
      state.prescriptions = action.payload;
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
export const { setPrescription, setLoading, setError } =
  prescrioptionSlice.actions;
export default prescrioptionSlice.reducer;
