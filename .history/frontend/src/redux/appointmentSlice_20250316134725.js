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
  },
});
export const { setAppointments } = appointmentSlice.actions;
export default appointmentSlice.reducer;
