import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointmentSlice",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {
    //set appointments
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    //set loading
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    //set appointments
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setAppointments, setloading, setError } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
