import React, { useState } from "react";
import axios from "axios";

const AdminData = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [doctorAction, setDoctorAction] = useState(null);
  const [doctorData, setDoctorData] = useState({
    name: "",
    speciality: "",
    phone: "",
    email: "",
    address: "",
    available: true,
    experience: "",
    fees: "",
    profileImage: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
  };

  // Submit doctor data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/doctors/add",
        doctorData
      );
      alert(res.data.message);
      setDoctorData({
        name: "",
        speciality: "",
        phone: "",
        email: "",
        address: "",
        available: true,
        experience: "",
        fees: "",
        profileImage: "",
      });
    } catch (err) {
      alert("Error adding doctor");
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Update Doctors":
        return (
          <div className="text-center">
            <h2>Update Doctors</h2>
            <div className="mt-3">
              <button
                className="btn btn-primary me-3"
                onClick={() => setDoctorAction("add")}
              >
                Add Doctor
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setDoctorAction("remove")}
              >
                Remove Doctor
              </button>
            </div>

            {/* Add Doctor Form */}
            {doctorAction === "add" && (
              <form className="mt-3" onSubmit={handleSubmit}>
                <h4>Add Doctor</h4>
                <input
                  type="text"
                  name="name"
                  className="form-control mb-2"
                  placeholder="Doctor Name"
                  value={doctorData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="speciality"
                  className="form-control mb-2"
                  placeholder="Speciality"
                  value={doctorData.speciality}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  className="form-control mb-2"
                  placeholder="Phone"
                  value={doctorData.phone}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={doctorData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="address"
                  className="form-control mb-2"
                  placeholder="Address"
                  value={doctorData.address}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="experience"
                  className="form-control mb-2"
                  placeholder="Experience (Years)"
                  value={doctorData.experience}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="fees"
                  className="form-control mb-2"
                  placeholder="Fees (₹)"
                  value={doctorData.fees}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="profileImage"
                  className="form-control mb-2"
                  placeholder="Profile Image URL"
                  value={doctorData.profileImage}
                  onChange={handleChange}
                />
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
            )}

            {/* Remove Doctor Form */}
            {doctorAction === "remove" && (
              <form className="mt-3">
                <h4>Remove Doctor</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Doctor ID"
                />
                <button className="btn btn-danger">Remove</button>
              </form>
            )}
          </div>
        );
      default:
        return <h2>Select an option from the sidebar</h2>;
    }
  };

  return (
    <div className="d-flex vh-100 mt-3">
      {/* Sidebar */}
      <aside
        className="bg-dark text-white p-4 d-flex flex-column"
        style={{ width: "250px" }}
      >
        <h2 className="text-center mb-4">Admin Panel</h2>
        {[
          "Dashboard",
          "Appointments",
          "Update Appointments",
          "All Doctors",
          "Update Doctors",
          "Prescription",
          "Update Prescription",
          "Reminder",
          "Update Reminder",
          "Patients",
          "Update Patients",
        ].map((section) => (
          <button
            key={section}
            type="button"
            className={`btn btn-success text-left mb-2 ${
              activeSection === section ? "fw-bold" : ""
            }`}
            onClick={() => {
              setActiveSection(section);
              setDoctorAction(null);
            }}
          >
            {section}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-center fs-4 fw-semibold">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminData;
