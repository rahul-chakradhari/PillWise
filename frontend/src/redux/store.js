import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import appointmentReducer from "./appointmentSlice";
import doctorReducer from "./doctorSlice";
import prescriptionReducer from "./prescriptionSlice";
import remainderReducer from "./remainderSlice";

import alluserReducer from "./allUsersSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // You can change this to sessionStorage or other storage if needed

const persistConfig = {
  key: "root",
  version: 1,
  storage, // This will persist the data to localStorage by default
};

const rootReducer = combineReducers({
  userKey: userReducer,
  appointmentKey: appointmentReducer,
  doctorKey: doctorReducer,
  prescriptionKey: prescriptionReducer,
  remainderKey: remainderReducer,
  allUserKey: alluserReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // This ignores serialization checks for persisted actions
      },
    }),
});

export { store };
