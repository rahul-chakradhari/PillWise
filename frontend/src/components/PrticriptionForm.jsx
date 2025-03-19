import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../redux/store";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstant";

const PrescriptionForm = () => {
  const { id } = useParams();
  const { appointments } = useSelector((store) => store.appointmentKey);

  const isAppointment = appointments.filter((item) => item._id === id);
  // console.log(isAppointment[0]);
  //console.log(isAppointment[0].userId?._id);

  const [prescriptionData, setPrescriptionData] = useState({
    userId: isAppointment[0]?.userId?._id,
    doctorId: isAppointment[0]?.doctorId?._id,
    prescriptionImage: "",
    notes: "",
  });

  const [preview, setPreview] = useState(null);
  const [wait, setWait] = useState(false);

  // Handle changes in text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPrescriptionData((prevData) => ({
      ...prevData,
      prescriptionImage: file,
    }));
  };

  // Handle form submission
  const handleAddPrescriptionSubmit = async (e) => {
    e.preventDefault();
    setWait(true);

    const formData = new FormData();
    formData.append("userId", prescriptionData.userId);
    formData.append("doctorId", prescriptionData.doctorId);
    formData.append("notes", prescriptionData.notes);

    formData.append("prescriptionImage", prescriptionData.prescriptionImage);

    try {
      const response = await axiosInstance.post("/api/prescription", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        toast("Prescription added successfully!");
        setPrescriptionData({
          userId: "",
          doctorId: "",
          prescriptionImage: "",
          notes: "",
        });
        setPreview(null);
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setWait(false);
    }
  };

  return (
    <div className="flex w-full justify-center">
      {isAppointment && (
        <div className="text-center ">
          <h2>Add New Prescription</h2>
          <form className="mt-3" onSubmit={handleAddPrescriptionSubmit}>
            {/* User ID */}
            <input
              type="text"
              name="userId"
              value={prescriptionData.userId}
              className="form-control mb-2"
              placeholder="User ID"
              onChange={handleInputChange}
              required
            />

            {/* Doctor ID */}
            <input
              type="text"
              name="doctorId"
              value={prescriptionData.doctorId}
              className="form-control mb-2"
              placeholder="Doctor ID"
              onChange={handleInputChange}
              required
            />

            {/* Prescription Image Upload */}
            <label className="form-label">Upload Prescription Image</label>
            <input
              type="file"
              className="form-control mb-2"
              onChange={handleImageChange}
              required
            />

            {/* Preview Image */}
            {preview && (
              <div className="mb-3">
                <img
                  src={preview}
                  alt="Prescription Preview"
                  className="img-fluid rounded"
                  width="150"
                />
              </div>
            )}

            {/* Notes */}
            <textarea
              name="notes"
              value={prescriptionData.notes}
              className="form-control mb-2"
              placeholder="Additional Notes (optional)"
              onChange={handleInputChange}
            />

            {wait ? (
              <button className="btn btn-warning" type="button" disabled>
                Please wait...
              </button>
            ) : (
              <button className="btn btn-success" type="submit">
                Add Prescription
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default PrescriptionForm;
