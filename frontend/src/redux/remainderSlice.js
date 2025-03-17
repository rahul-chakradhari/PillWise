import { createSlice } from "@reduxjs/toolkit";

export const remainderSlice = createSlice({
  name: "remainder",
  initialState: {
    reminders: [], // Store medicine reminders
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setReminders: (state, action) => {
      state.reminders = action.payload; // Set fetched reminders
    },
    addReminder: (state, action) => {
      state.reminders.push(action.payload); // Add a new reminder
    },
    updateReminder: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.reminders.findIndex((rem) => rem.id === id);
      if (index !== -1) {
        state.reminders[index] = { ...state.reminders[index], ...updatedData };
      }
    },
    deleteReminder: (state, action) => {
      state.reminders = state.reminders.filter(
        (rem) => rem.id !== action.payload
      );
    },
  },
});

export const {
  setLoading,
  setError,
  setReminders,
  addReminder,
  updateReminder,
  deleteReminder,
} = remainderSlice.actions;

export default remainderSlice.reducer;
