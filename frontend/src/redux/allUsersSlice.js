import { createSlice } from "@reduxjs/toolkit";

export const allUsersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});
export const { setAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;
