import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstant from "../utils/axiosInstant";
import { toast } from "react-toastify";
import { setAppointments } from "../redux/appointmentSlice";

const AppointmentForm = () => {
  const dispatch = useDispatch();

  // ✅ Redux se logged-in user ka ID fetch kar rahe hain
  const userId = useSelector((state) => state.auth.userId);
  const loading = useSelector((state) => state.appointments.loading);

  // ✅ Form State
  const [formData, setFormData] = useState({
    userId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });

  // ✅ Redux `userId` change hote hi form me update hoga
  useEffect(() => {
    setFormData((prev) => ({ ...prev, userId }));
  }, [userId]);

  // ✅ Input Change Handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axiosInstant.post("/api/appointments", formData);

      if (res.data?.success) {
        toast.success(res.data.message || "Appointment booked successfully!");
        dispatch(setAppointments(res.data.appointments));

        // ✅ Form Reset
        setFormData({
          userId,
          doctorId: "",
          appointmentDate: "",
          appointmentTime: "",
          notes: "",
        });
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      dispatch(setError(errorMsg));
      toast.error(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Book an Appointment</h2>

        {/* Doctor ID */}
        <div>
          <label className="block text-gray-700 font-semibold">Doctor ID</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Appointment Date */}
        <div>
          <label className="block text-gray-700 font-semibold">
            Appointment Date
          </label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Appointment Time */}
        <div>
          <label className="block text-gray-700 font-semibold">
            Appointment Time
          </label>
          <input
            type="time"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-gray-700 font-semibold">
            Notes (Optional)
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any additional details"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-2 rounded-md text-white font-semibold 
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={
            loading ||
            !formData.doctorId ||
            !formData.appointmentDate ||
            !formData.appointmentTime
          }
        >
          {loading ? "Please wait..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
