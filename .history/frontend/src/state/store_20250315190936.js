import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { appointmentReducer } from "./reducers/appointmentReducer";

// ✅ Root Reducer (Agar aur bhi reducers ho, to yahan add kar sakte ho)
const rootReducer = combineReducers({
  appointments: appointmentReducer, // 🔥 Appointment reducer added
});

// ✅ Initial State
const initialState = {};

// ✅ Middleware
const middleware = [thunk];

// ✅ Store Creation
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
