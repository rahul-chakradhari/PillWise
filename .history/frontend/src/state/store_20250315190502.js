import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { appointmentReducer } from "./reducers/appointmentReducer"; // Apna reducer import karo

const reducer = combineReducers({
  appointments: appointmentReducer, // Apne reducers ko yaha add karo
});

const initialState = {}; // Agar initial state set karni ho to yaha karo

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
