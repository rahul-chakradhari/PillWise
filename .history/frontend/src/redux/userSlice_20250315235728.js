// import { createSlice } from "@reduxjs/toolkit";
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//   },
//   reducers: {
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },
// });

// export const { setUser } = authSlice.actions;
// export default authSlice.reducer;
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
