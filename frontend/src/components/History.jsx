import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetchAllAppointments from "../hooks/useFetchAllApointments";
import { MdDeleteSweep } from "react-icons/md";
import axiosInstance from "../utils/axiosInstant";
import { toast } from "react-toastify";
import { updateAppointmentStatus } from "../redux/appointmentSlice"; // Assuming you have this action

function History() {
  useFetchAllAppointments();
  const { appointments } = useSelector((store) => store.appointmentKey);
  const { user } = useSelector((store) => store.userKey);

  // Function to handle status change for a specific row

  const removeAppointmentHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        const res = await axiosInstance.delete(`/api/appointment/${id}`);

        if (res.data.success) {
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete appointment."
        );
      }
    } else {
      toast.info("Delete cancelled");
    }
  };

  return (
    <div className="flex justify-center">
      {/* Today's Appointments Section */}
      <div className="mb-6 w-[80%] h-screen">
        <p className="text-xl font-bold mb-3 text-center text-gray-600">
          Your Appointments
        </p>
        <div className="w-full h-2.5 bg-red-300 "></div>
        <div className="overflow-x-auto w-full">
          <table className="table table-xs w-full">
            <thead>
              <tr>
                <th>Index</th>
                <th>Patient Name</th>
                <th>Doctor</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments &&
                appointments
                  .filter((item) => item?.userId?._id === user?._id) // Exclude current user's appointments if needed
                  .map((item, index) => (
                    <tr key={item._id}>
                      <th>{index + 1}</th>
                      <td>{item.userId.name}</td>{" "}
                      {/* Assuming user object has a name */}
                      <td>{item.doctorId.name}</td>{" "}
                      {/* Assuming doctor object has a name */}
                      <td>
                        {new Date(item.appointmentDate).toLocaleDateString()}
                      </td>
                      <td>{item.appointmentTime}</td>
                      <td>
                        {/* Status Dropdown */}
                        {item.status}
                      </td>
                      <td className="flex items-center gap-3">
                        {/* Delete Appointment Button */}
                        <span
                          onClick={() => removeAppointmentHandler(item._id)}
                        >
                          <MdDeleteSweep className="text-3xl text-red-500" />
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default History;
