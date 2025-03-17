import { configureStore } from "@reduxjs/toolkit";
import { appointmentReducer } from "./reducers/appointmentReducer"; // Import your reducers

const store = configureStore({
  reducer: {
    auth: authReducer,
    appointments: appointmentReducer,
    // Add other reducers if needed
  },
});

export default store;
