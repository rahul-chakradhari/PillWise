import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetchAllAppointments from "../hooks/useFetchAllApointments";
import { MdDeleteSweep } from "react-icons/md";
import axiosInstance from "../utils/axiosInstant";
import { toast } from "react-toastify";
import { updateAppointmentStatus } from "../redux/appointmentSlice"; // Assuming you have this action
import { useNavigate } from "react-router-dom";

function AppointmentCard() {
  const { appointments } = useSelector((store) => store.appointmentKey);
  const { user } = useSelector((store) => store.userKey);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Initialize a state to store selected statuses for each appointment
  const [statusMap, setStatusMap] = useState({});
  console.log(appointments);

  // Function to handle status change for a specific row
  const handleStatusChange = (e, id) => {
    setStatusMap((prev) => ({
      ...prev,
      [id]: e.target.value, // Update the status for the specific appointment
    }));
  };

  const updateStatusHandler = async (id, currentStatus) => {
    const newStatus = statusMap[id] || currentStatus; // Get the updated status for that specific appointment

    // Optimistically update the status in the local UI
    dispatch(updateAppointmentStatus({ id, status: newStatus }));

    try {
      const res = await axiosInstance.put(`/api/appointment/${id}`, {
        status: newStatus,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setStatusMap((prev) => {
          const newMap = { ...prev };
          delete newMap[id]; // Reset the status change after successful API call
          return newMap;
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      // Revert the status change in case of error
      dispatch(updateAppointmentStatus({ id, status: currentStatus }));
    }
  };

  const removeAppointmentHandler = async (id) => {
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
  };

  // Get today's date to filter today's appointments
  const todayDate = new Date().toLocaleDateString("en-CA"); // Format: YYYY-MM-DD

  // Filter appointments by their status
  const groupByStatus = (appointments) => {
    return {
      Pending: appointments.filter((item) => item.status === "Pending"),
      Confirmed: appointments.filter((item) => item.status === "Confirmed"),
      Completed: appointments.filter((item) => item.status === "Completed"),
      Cancelled: appointments.filter((item) => item.status === "Cancelled"),
    };
  };

  // Filter today's appointments
  const todayAppointments = appointments.filter(
    (item) =>
      new Date(item.appointmentDate).toLocaleDateString("en-CA") === todayDate
  );

  const groupedAppointments = groupByStatus(appointments);

  return (
    <div className="w-full h-screen">
      {/* Today's Appointments Section */}
      <div className="mb-6">
        <p className="text-xl font-bold mb-3 text-center">
          Today's Appointments
        </p>
        <div className="w-full h-2 bg-red-400"></div>
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
              {todayAppointments
                .filter((item) => item.userId !== user._id) // Exclude current user's appointments if needed
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
                      <select
                        value={statusMap[item._id] || item.status} // Default value is the current status
                        onChange={(e) => handleStatusChange(e, item._id)} // Update status for this specific row
                        className="select select-bordered w-full max-w-xs bg-white"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="flex items-center gap-3">
                      {/* Status Update Button */}
                      <button
                        onClick={() =>
                          updateStatusHandler(item._id, item.status)
                        }
                        className="btn btn-sm btn-primary"
                      >
                        Change Status
                      </button>
                      {/* Delete Appointment Button */}
                      <span onClick={() => removeAppointmentHandler(item._id)}>
                        <MdDeleteSweep className="text-3xl text-red-500" />
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sections for other appointment statuses */}
      {Object.keys(groupedAppointments).map((status) => (
        <div key={status} className="mb-6 w-full">
          <p className="text-center text-lg ">{status} Appointments</p>
          <div className="w-full h-1 bg-green-400"></div>
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
                  {status === "Completed" && <th>Add Prescription</th>}
                </tr>
              </thead>
              <tbody>
                {groupedAppointments[status]
                  .filter((item) => item.userId !== user._id) // Exclude current user's appointments if needed
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
                        <select
                          value={statusMap[item._id] || item.status} // Default value is the current status
                          onChange={(e) => handleStatusChange(e, item._id)} // Update status for this specific row
                          className="select select-bordered w-full max-w-xs bg-white"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="flex items-center gap-3">
                        {/* Status Update Button */}
                        <button
                          onClick={() =>
                            updateStatusHandler(item._id, item.status)
                          }
                          className="btn btn-sm btn-primary"
                        >
                          Change Status
                        </button>
                        {/* Delete Appointment Button */}
                        <span
                          onClick={() => removeAppointmentHandler(item._id)}
                        >
                          <MdDeleteSweep className="text-3xl text-red-500" />
                        </span>
                      </td>
                      {status === "Completed" && (
                        <td>
                          <button
                            onClick={() =>
                              navigate(`/prescription/${item._id}`)
                            }
                            className="btn btn-sm btn-success me-2"
                          >
                            add priscription
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AppointmentCard;
