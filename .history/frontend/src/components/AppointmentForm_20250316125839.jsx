import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstant from "../utils/axiosInstant";
import { toast } from "react-toastify";
import {
  setAppointments,
  setLoading,
  setError,
} from "../redux/appointmentSlice";

const AppointmentForm = () => {
  const dispatch = useDispatch();

  // ✅ Redux se logged-in user ka id fetch kar rahe hain
  const userId = useSelector((state) => state.auth.userId); // 🔥 Ensure auth slice has userId
  const loading = useSelector((state) => state.appointments.loading);

  const [formData, setFormData] = useState({
    userId: userId || "", // Redux se aane wala user ID
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axiosInstant.post("/api/appointments", formData);

      if (res.data.success) {
        toast.success(res.data.message);

        // ✅ Redux store me naye appointment ko add karna
        dispatch(setAppointments([...res.data.appointments]));

        // ✅ Form reset
        setFormData({
          userId: userId,
          doctorId: "",
          appointmentDate: "",
          appointmentTime: "",
          notes: "",
        });
      }
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Something went wrong")
      );
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="appointment p-4 bg-white shadow rounded w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-2">Book an Appointment</h2>

        <div className="mb-3">
          <label className="form-label">Doctor ID</label>
          <input
            type="text"
            className="form-control"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Appointment Date</label>
          <input
            type="date"
            className="form-control"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Appointment Time</label>
          <input
            type="time"
            className="form-control"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Notes (Optional)</label>
          <textarea
            className="form-control"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional details"
          ></textarea>
        </div>

        {loading ? (
          <button type="submit" className="btn btn-primary" disabled>
            Please wait...
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Book Appointment
          </button>
        )}
      </form>
    </div>
  );
};

export default AppointmentForm;
