import React from "react";

import { useSelector } from "react-redux";
import useFetchAllAppointments from "../hooks/useFetchAllApointments";
import { store } from "../redux/store";
import { MdDeleteSweep } from "react-icons/md";
import axiosInstance from "../utils/axiosInstant";
import { toast } from "react-toastify";
function AppointmentCard() {
  useFetchAllAppointments(); // Assuming this hook fetches all appointments
  const { appointments } = useSelector((store) => store.appointmentKey); // Replace with the
  const { user } = useSelector((store) => store.userKey);

  const removeAppointmentHandler = async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/appointment/${id}`);

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast(error.response?.data?.message);
    }
  };

  return (
    <div className="overflow-x-auto w-full h-screen">
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
              .filter((item) => item.userId !== user._id) // Exclude current user's appointments if needed
              .map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.userId.name}</td>{" "}
                  {/* Assuming user object has a name */}
                  <td>{item.doctorId.name}</td>{" "}
                  {/* Assuming doctor object has a name */}
                  <td>{new Date(item.appointmentDate).toLocaleDateString()}</td>
                  <td>{item.appointmentTime}</td>
                  <td>{item.status}</td>
                  <td>{item.notes}</td>
                  <td className="flex items-center gap-3">
                    <span onClick={() => removeAppointmentHandler(item._id)}>
                      <MdDeleteSweep className="text-3xl text-red-500" />
                    </span>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentCard;
