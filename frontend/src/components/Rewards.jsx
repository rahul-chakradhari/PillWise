import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetchDoctors from "../hooks/useFetchDoctors";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstant";

const RewardsSection = () => {
  useFetchDoctors();
  const { doctors } = useSelector((state) => state.doctorKey);
  const removeDoctorHandler = async (doctorId) => {
    try {
      const response = await axiosInstance.delete(`/api/doctor/${doctorId}`);
      if (response?.data?.success) {
        toast(response.data.message);
        console.log(response.data);
      }
    } catch (error) {
      toast(error?.response?.data?.message);
    }
  };
  return (
    <div className="overflow-x-auto w-full h-screen">
      <table className="table table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Profile picture</th>
            <th>Name</th>

            <th>Speciality</th>

            <th>Location</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          {doctors?.map((item, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>
                <img
                  className="avtar w-20 h-20 rounded-full  object-center object-cover"
                  src={item.profileImage}
                  alt=""
                />
              </td>
              <td>{item.name}</td>
              <td>{item.speciality}</td>
              <td>{item.address}</td>
              {/* Add company data here if you have it */}
              <td>{item.email}</td> {/* Add location data if available */}
              <td>{item.phone}</td> {/* Add last login data */}
              <td>{item.favoriteColor}</td>
              {/* Add favorite color data */}
              <td>{item.fees}</td>
              <td className="">
                <button className="btn btn-sm btn-success me-2">Update</button>
                <button
                  onClick={() => removeDoctorHandler(item._id)}
                  className="btn btn-sm btn-danger "
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RewardsSection;
