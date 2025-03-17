import React, { useState } from "react";
import axiosInstant from "../utils/axiosInstant";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    userId: "", // Should be set automatically from logged-in user
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstant.post("/api/appointments", formData);

      if (res.data.success) {
        toast.success(res.data.message);

        setFormData({
          userId: "",
          doctorId: "",
          appointmentDate: "",
          appointmentTime: "",
          notes: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
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
