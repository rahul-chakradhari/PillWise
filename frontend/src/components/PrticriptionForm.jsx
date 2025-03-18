import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstant from "../utils/axiosInstant";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const PrescriptionForm = ({ doctorId }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userKey);
  const [formData, setFormData] = useState({
    doctorId: doctorId,
    userId: user?._id,
    medicines: [
      {
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
      },
    ],
    prescriptionImage: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change for form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle medicine input changes (for dynamic medicine list)
  const handleMedicineChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMedicines = [...formData.medicines];
    updatedMedicines[index] = { ...updatedMedicines[index], [name]: value };
    setFormData((prevState) => ({
      ...prevState,
      medicines: updatedMedicines,
    }));
  };

  // Handle adding a new medicine entry
  const addMedicine = () => {
    setFormData((prevState) => ({
      ...prevState,
      medicines: [
        ...prevState.medicines,
        {
          name: "",
          dosage: "",
          frequency: "",
          duration: "",
        },
      ],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting prescription data:", formData); // Debugging log

    try {
      setLoading(true);
      const res = await axiosInstant.post("/api/prescription", formData);
      console.log("Server Response:", res.data); // Debugging log

      if (res.data.success) {
        toast.success(res.data.message);

        // Reset form fields
        setFormData({
          doctorId: doctorId,
          userId: user?._id,
          medicines: [
            {
              name: "",
              dosage: "",
              frequency: "",
              duration: "",
            },
          ],
          prescriptionImage: "",
          notes: "",
        });

        // Navigate to prescriptions list or confirmation page
        setTimeout(() => {
          navigate("/prescriptions"); // You can modify this to navigate to the correct page
        }, 2000);
      } else {
        toast.error(res.data.message || "Prescription submission failed!");
      }
    } catch (error) {
      console.error("Prescription Error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prescription-form">
      <form onSubmit={handleSubmit}>
        <h2>Book a Prescription</h2>
        <h6>
          <i>* Please fill in the form to submit your prescription.</i> <br />
          <i>* You will receive a confirmation once the prescription is submitted.</i>
        </h6>

        {/* Prescription Image URL */}
        <div className="mb-3">
          <label className="form-label">Prescription Image (Optional)</label>
          <input
            type="text"
            className="form-control"
            name="prescriptionImage"
            value={formData.prescriptionImage}
            onChange={handleChange}
          />
        </div>

        {/* Medicines */}
        <h4>Medicines</h4>
        {formData.medicines.map((medicine, index) => (
          <div key={index}>
            <div className="mb-3">
              <label className="form-label">Medicine Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={medicine.name}
                onChange={(e) => handleMedicineChange(index, e)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Dosage</label>
              <input
                type="text"
                className="form-control"
                name="dosage"
                value={medicine.dosage}
                onChange={(e) => handleMedicineChange(index, e)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Frequency</label>
              <input
                type="text"
                className="form-control"
                name="frequency"
                value={medicine.frequency}
                onChange={(e) => handleMedicineChange(index, e)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Duration</label>
              <input
                type="text"
                className="form-control"
                name="duration"
                value={medicine.duration}
                onChange={(e) => handleMedicineChange(index, e)}
                required
              />
            </div>

            <hr />
          </div>
        ))}

        {/* Button to add another medicine */}
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={addMedicine}
          >
            Add Another Medicine
          </button>
        </div>

        {/* Notes */}
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
          {loading ? "Submitting..." : "Submit Prescription"}
        </button>
      </form>
    </div>
  );
};

export default PrescriptionForm;
