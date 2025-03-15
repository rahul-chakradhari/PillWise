import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
  FETCH_APPOINTMENTS_FAIL,
  ADD_APPOINTMENT_REQUEST,
  ADD_APPOINTMENT_SUCCESS,
  ADD_APPOINTMENT_FAIL,
  DELETE_APPOINTMENT_REQUEST,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAIL,
} from "../action_creaters/appointmentActions";

const initialState = {
  appointments: [], // Saari appointments ka array
  loading: false, // API call ho rahi hai ya nahi
  error: null, // Koi error hai ya nahi
};

// ✅ Appointment Reducer
export const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {
    // 📌 FETCH APPOINTMENTS
    case FETCH_APPOINTMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: action.payload,
      };
    case FETCH_APPOINTMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // 📌 ADD APPOINTMENT
    case ADD_APPOINTMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: [...state.appointments, action.payload],
      };
    case ADD_APPOINTMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // 📌 DELETE APPOINTMENT
    case DELETE_APPOINTMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: state.appointments.filter(
          (appointment) => appointment._id !== action.payload
        ),
      };
    case DELETE_APPOINTMENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
