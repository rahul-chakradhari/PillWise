import { useEffect } from "react";
import { useDispatch } from "react-redux";

import axiosInstance from "../utils/axiosInstant.js";

import { toast } from "react-toastify";
import { setAppointments } from "../redux/appointmentSlice.js";

const useFetchAllAppointments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get("/api/appointment/all");
        console.log(response);
        if (response.data.success) {
          dispatch(setAppointments(response.data.appointments));
          console.log(response.data.appointments);
        }
      } catch (err) {
        toast(
          err?.response?.data?.message ||
            "An error occurred while fetching appointments."
        ); // Improved error message handling
      }
    };

    fetchAppointments();
  }, [dispatch]);

  return {};
};

export default useFetchAllAppointments;
