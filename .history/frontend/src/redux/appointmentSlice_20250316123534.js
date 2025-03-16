import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointmentSlice",
  initialState: {
    appointments: [],
  },
  reducers: {
    //adding appointments
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    //delete appointments
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
    // update appointments
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex(
        (appointment) => appointment.id === action.payload.id
      );
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },

    // set appointments
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
  },
});
export const {
  addAppointment,
  deleteAppointment,
  updateAppointment,
  setAppointments,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;
