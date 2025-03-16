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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    //set error
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setAppointments, setError, setLoading } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
