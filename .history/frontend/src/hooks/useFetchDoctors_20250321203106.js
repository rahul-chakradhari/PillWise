import { useEffect } from "react";
import { useDispatch } from "react-redux";

import axiosInstance from "../utils/axiosInstant.js";
import { setDoctors, setLoading } from "../redux/doctorSlice.js";
import { toast } from "react-toastify";
const useFetchDoctors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDoctors = async () => {
      dispatch(setLoading(true));

      try {
        const response = await axiosInstance.get("/api/doctor/doctors");
        dispatch(setDoctors(response.data.doctors));
        //console.log(response.data);
      } catch (err) {
        toast.error(err.response.data.message);
      }
    };

    fetchDoctors();
  }, [dispatch]);

  return {};
};

export default useFetchDoctors;
