import React, { useState } from "react";

const AddDoctorForm = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setProfileImage(file);

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("specialty", e.target.specialty.value);
    formData.append("phone", e.target.phone.value);
    formData.append("email", e.target.email.value);
    formData.append("address", e.target.address.value);
    formData.append("available", e.target.available.value);
    formData.append("experience", e.target.experience.value);
    formData.append("fees", e.target.fees.value);
    formData.append("profileImage", profileImage);

    // Backend API call yahan kar sakte ho
    console.log("Doctor added:", formData);

    alert("Doctor added successfully!");
  };

  return (
    <div className="text-center">
      <h2>Add New Doctor</h2>
      <form className="mt-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="form-control mb-2"
          placeholder="Doctor Name"
          required
        />
        <input
          type="text"
          name="specialty"
          className="form-control mb-2"
          placeholder="Specialty"
          required
        />
        <input
          type="number"
          name="phone"
          className="form-control mb-2"
          placeholder="Phone"
          required
        />
        <input
          type="email"
          name="email"
          className="form-control mb-2"
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="address"
          className="form-control mb-2"
          placeholder="Address"
          required
        />
        <input
          type="text"
          name="available"
          className="form-control mb-2"
          placeholder="Availability"
          required
        />
        <input
          type="text"
          name="experience"
          className="form-control mb-2"
          placeholder="Experience (in years)"
          required
        />
        <input
          type="number"
          name="fees"
          className="form-control mb-2"
          placeholder="Consultation Fees"
          required
        />

        {/* Profile Image Upload */}
        <label className="form-label">Upload Profile Image</label>
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
              alt="Profile Preview"
              className="img-fluid rounded"
              width="150"
            />
          </div>
        )}

        <button className="btn btn-success">Add Doctor</button>
      </form>
    </div>
  );
};

export default AddDoctorForm;
