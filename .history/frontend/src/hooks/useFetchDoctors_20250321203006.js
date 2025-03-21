import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { setDoctors, setLoading, setError } from "../redux/doctorSlice";
import { toast } from "react-toastify";

const useFetchDoctors = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDoctors = async () => {
      dispatch(setLoading(true));

      try {
        const response = await axiosInstance.get("/api/doctor/doctors");
        dispatch(setDoctors(response.data.doctors));
      } catch (err) {
        dispatch(setError("Failed to load doctors!"));
        toast.error(err.response?.data?.message || "Error loading doctors!");
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchDoctors();
  }, [dispatch]);
};

export default useFetchDoctors;
