import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user: null,
  },
  //reducer
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
//action creater
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
