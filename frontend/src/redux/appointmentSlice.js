// In your appointmentSlice.js (Redux Slice)
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appointments: [],
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setAppointments(state, action) {
      state.appointments = action.payload;
    },
    updateAppointmentStatus(state, action) {
      const { id, status } = action.payload;
      const appointment = state.appointments.find((apt) => apt._id === id);
      if (appointment) {
        appointment.status = status;
      }
    },
  },
});

export const { setAppointments, updateAppointmentStatus } =
  appointmentSlice.actions;
export default appointmentSlice.reducer;
