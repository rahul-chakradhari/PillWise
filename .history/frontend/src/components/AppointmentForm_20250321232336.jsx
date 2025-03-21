import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstant from "../utils/axiosInstant";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AppointmentForm = ({ id }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.userKey);

  // Add loading state for Redux check
  if (!user) {
    return <div>Loading...</div>;
  }

  const [formData, setFormData] = useState({
    doctorId: id,
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
    userId: user?.["_id"] || "", // Safe access using optional chaining
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData); // Debug log

    try {
      setLoading(true);
      const res = await axiosInstant.post("/api/appointment", formData);
      console.log("Server Response:", res.data); // Debug log

      if (res.data.success) {
        toast.success(res.data.message);

        // Reset form fields
        setFormData({
          userId: "",
          doctorId: "",
          appointmentDate: "",
          appointmentTime: "",
          notes: "",
        });

        // Navigate to appointment confirmation page after success
        setTimeout(() => {
          console.log("Navigating to appointment confirmation...");
          navigate("/appointments");
        }, 2000);
      } else {
        toast.error(res.data.message || "Appointment booking failed!");
      }
    } catch (error) {
      console.error("Appointment Error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Get current date for the minimum date value
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="appointment-form">
      <form onSubmit={handleSubmit}>
        <h2>Book an Appointment</h2>
        <h6>
          <i>* Please fill in the form to book your appointment.</i> <br />
          <i>
            * You will receive a confirmation once the appointment is booked.
          </i>
        </h6>

        {/* Appointment Date */}
        <div className="mb-3">
          <label className="form-label">Appointment Date</label>
          <input
            type="date"
            className="form-control"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            min={currentDate} // Ensure only future dates are allowed
          />
        </div>

        {/* Appointment Time */}
        <div className="mb-3">
          <label className="form-label">Preferred Time</label>
          <select
            className="form-select"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          >
            <option value="">Select Time</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="1:00 PM">1:00 PM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="3:00 PM">3:00 PM</option>
            <option value="4:00 PM">4:00 PM</option>
          </select>
        </div>

        {/* Additional Notes */}
        <div className="mb-3">
          <label className="form-label">Additional Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="textarea textarea-bordered w-full px-4 py-2 rounded-lg border-2 border-gray-300 bg-white text-gray-600"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
