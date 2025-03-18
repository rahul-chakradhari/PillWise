import React, { useState } from "react";
import axios from "axios";

const PrescriptionForm = () => {
  const [prescriptionData, setPrescriptionData] = useState({
    userId: "",
    doctorId: "",
    medicines: [{ name: "", dosage: "", frequency: "", duration: "" }],
    prescriptionImage: null,
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

  // Handle changes in medicine fields
  const handleMedicineChange = (e, index) => {
    const { name, value } = e.target;
    const medicines = [...prescriptionData.medicines];
    medicines[index][name] = value;
    setPrescriptionData((prevData) => ({
      ...prevData,
      medicines,
    }));
  };

  // Add more medicine inputs dynamically
  const handleAddMedicine = () => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      medicines: [
        ...prevData.medicines,
        { name: "", dosage: "", frequency: "", duration: "" },
      ],
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPrescriptionData((prevData) => ({
      ...prevData,
      prescriptionImage: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleAddPrescriptionSubmit = async (e) => {
    e.preventDefault();
    setWait(true);

    const formData = new FormData();
    formData.append("userId", prescriptionData.userId);
    formData.append("doctorId", prescriptionData.doctorId);
    formData.append("notes", prescriptionData.notes);

    // Append medicines array
    prescriptionData.medicines.forEach((medicine, index) => {
      formData.append(`medicines[${index}].name`, medicine.name);
      formData.append(`medicines[${index}].dosage`, medicine.dosage);
      formData.append(`medicines[${index}].frequency`, medicine.frequency);
      formData.append(`medicines[${index}].duration`, medicine.duration);
    });

    // Append prescription image file
    formData.append("prescriptionImage", prescriptionData.prescriptionImage);

    try {
      await axios.post("/api/prescriptions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Prescription added successfully!");
      setPrescriptionData({
        userId: "",
        doctorId: "",
        medicines: [{ name: "", dosage: "", frequency: "", duration: "" }],
        prescriptionImage: null,
        notes: "",
      });
      setPreview(null);
    } catch (error) {
      console.error("Error adding prescription:", error);
      alert("There was an error adding the prescription.");
    } finally {
      setWait(false);
    }
  };

  return (
    <div className="flex w-full justify-center">
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

          {/* Medicines */}
          <div className="mb-3">
            <h5>Medicines</h5>
            {prescriptionData.medicines.map((medicine, index) => (
              <div key={index} className="medicine-form-group">
                <input
                  type="text"
                  name={`medicines[${index}].name`}
                  value={medicine.name}
                  className="form-control mb-2"
                  placeholder="Medicine Name"
                  onChange={(e) => handleMedicineChange(e, index)}
                  required
                />
                <input
                  type="text"
                  name={`medicines[${index}].dosage`}
                  value={medicine.dosage}
                  className="form-control mb-2"
                  placeholder="Dosage"
                  onChange={(e) => handleMedicineChange(e, index)}
                  required
                />
                <input
                  type="text"
                  name={`medicines[${index}].frequency`}
                  value={medicine.frequency}
                  className="form-control mb-2"
                  placeholder="Frequency"
                  onChange={(e) => handleMedicineChange(e, index)}
                  required
                />
                <input
                  type="text"
                  name={`medicines[${index}].duration`}
                  value={medicine.duration}
                  className="form-control mb-2"
                  placeholder="Duration"
                  onChange={(e) => handleMedicineChange(e, index)}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="btn btn-info"
              onClick={handleAddMedicine}
            >
              Add More Medicines
            </button>
          </div>

          {/* Prescription Image Upload */}
          <label className="form-label">Upload Prescription Image</label>
          <input
            type="file"
            className="form-control mb-2"
            accept="image/*"
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
    </div>
  );
};

export default PrescriptionForm;
