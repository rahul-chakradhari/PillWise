import axios from "axios";

// Action Types
export const FETCH_APPOINTMENTS_REQUEST = "FETCH_APPOINTMENTS_REQUEST";
export const FETCH_APPOINTMENTS_SUCCESS = "FETCH_APPOINTMENTS_SUCCESS";
export const FETCH_APPOINTMENTS_FAIL = "FETCH_APPOINTMENTS_FAIL";

export const ADD_APPOINTMENT_REQUEST = "ADD_APPOINTMENT_REQUEST";
export const ADD_APPOINTMENT_SUCCESS = "ADD_APPOINTMENT_SUCCESS";
export const ADD_APPOINTMENT_FAIL = "ADD_APPOINTMENT_FAIL";

export const DELETE_APPOINTMENT_REQUEST = "DELETE_APPOINTMENT_REQUEST";
export const DELETE_APPOINTMENT_SUCCESS = "DELETE_APPOINTMENT_SUCCESS";
export const DELETE_APPOINTMENT_FAIL = "DELETE_APPOINTMENT_FAIL";

// ✅ Fetch Appointments
export const fetchAppointments = () => async (dispatch) => {
  try {
    console.log("🔥 Fetching Appointments..."); // ✅ Debugging Step 1
    dispatch({ type: FETCH_APPOINTMENTS_REQUEST });

    const { data } = await axios.get("/api/appointments"); // 🔥 API Call
    console.log("✅ Appointments Fetched:", data); // ✅ Debugging Step 2

    dispatch({
      type: FETCH_APPOINTMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(
      "❌ Fetch Appointments Failed:",
      error.response?.data?.message || error.message
    ); // ✅ Debugging Step 3
    dispatch({
      type: FETCH_APPOINTMENTS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Add New Appointment
export const addAppointment = (appointmentData) => async (dispatch) => {
  try {
    console.log("🔥 Adding Appointment...", appointmentData); // ✅ Debugging Step 1
    dispatch({ type: ADD_APPOINTMENT_REQUEST });

    const { data } = await axios.post("/api/appointments", appointmentData); // 🔥 API Call
    console.log("✅ Appointment Added:", data); // ✅ Debugging Step 2

    dispatch({
      type: ADD_APPOINTMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(
      "❌ Add Appointment Failed:",
      error.response?.data?.message || error.message
    ); // ✅ Debugging Step 3
    dispatch({
      type: ADD_APPOINTMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// ✅ Delete Appointment
export const deleteAppointment = (id) => async (dispatch) => {
  try {
    console.log(`🔥 Deleting Appointment ID: ${id}`); // ✅ Debugging Step 1
    dispatch({ type: DELETE_APPOINTMENT_REQUEST });

    await axios.delete(`/api/appointments/${id}`); // 🔥 API Call
    console.log(`✅ Appointment Deleted: ${id}`); // ✅ Debugging Step 2

    dispatch({
      type: DELETE_APPOINTMENT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.error(
      "❌ Delete Appointment Failed:",
      error.response?.data?.message || error.message
    ); // ✅ Debugging Step 3
    dispatch({
      type: DELETE_APPOINTMENT_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
