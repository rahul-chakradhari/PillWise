import { useEffect } from "react";
import { useDispatch } from "react-redux";

import axiosInstance from "../utils/axiosInstant.js";

import { toast } from "react-toastify";
import { setAllUsers } from "../redux/allUsersSlice.js";

const useFetchUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/api/user/all");
        console.log(response);

        dispatch(setAllUsers(response.data.users));
        console.log(response.data.users);
      } catch (err) {
        toast(err?.response?.data?.message);
      }
    };

    fetchUsers();
  }, [dispatch]);

  return {};
};

export default useFetchUsers;
