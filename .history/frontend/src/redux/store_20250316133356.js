// import { combineReducers, configureStore } from "@reduxjs/toolkit";

// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import authSlice from "./userSlice.js";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };
// const rootReducer = combineReducers({
//   auth: authSlice,
// });
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import appointmentReducer from "./appointmentSlice";
import doctorReducer from "./doctorSlice";
import prescriptionReducer from "./prescriptionSlice";
import remainderReducer from "./remainderSlice";
export const store = configureStore({
  reducer: {
    userKey: userReducer,
    appointmentKey: appointmentReducer,
    doctorKey: doctorReducer,
    prescriptionKey: prescriptionReducer,
    remainderKey: remainderReducer,
  },
});
