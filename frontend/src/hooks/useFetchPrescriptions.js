import { useEffect } from "react";
import { useDispatch } from "react-redux";

import axiosInstance from "../utils/axiosInstant.js";

import { toast } from "react-toastify";
import { setPrescription } from "../redux/prescriptionSlice.js";

const useFetchPrescriptions = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axiosInstance.get("/api/prescription/all");
      //  console.log(response.data.prescriptions);
        if (response.data.success) {
          dispatch(setPrescription(response?.data?.prescriptions));
        }
      } catch (err) {
        toast(err?.response?.data?.message);
      }
    };

    fetchPrescriptions();
  }, [dispatch]);

  return {};
};

export default useFetchPrescriptions;
