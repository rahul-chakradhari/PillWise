import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import axiosInstance from "../utils/axiosInstant.js";

import { toast } from "react-toastify";
import { setAppointments } from "../redux/appointmentSlice.js";

const useFetchAllAppointments = () => {
  const dispatch = useDispatch();
  const { appointments } = useSelector((store) => store.appointmentKey);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get("/api/appointment/all");
        if (response.data.success) {
          dispatch(setAppointments(response.data.appointments));
        }
      } catch (err) {
        toast(
          err?.response?.data?.message ||
            "An error occurred while fetching appointments."
        );
      }
    };

    fetchAppointments();
  }, [dispatch]);

  return {};
};

export default useFetchAllAppointments;
