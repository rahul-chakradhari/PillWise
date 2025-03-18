import React, { useState } from "react";

const AdminData = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <h2>Welcome to Admin Dashboard</h2>;
      case "All Doctors":
        return <h2>List of Doctors</h2>;
      case "Remove Doctors":
        return <h2>Remove a Doctor</h2>;
      case "Reminder":
        return <h2>Set a Reminder</h2>;
      case "Prescription":
        return <h2>Manage Prescriptions</h2>;
      case "Appointments":
        return <h2>Appointments Management</h2>;
      case "Patients":
        return <h2>Patient Records</h2>;

      case "Add Doctors":
        return (
          <div className="p-4 border rounded bg-light w-50">
            <h3 className="text-center mb-3">Add a New Doctor</h3>
            <form>
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Phone Number"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Specialization:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Specialization"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Add Doctor
              </button>
            </form>
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
          "Update  Prescription",

          "Reminder",
          "Add / Remove Reminder",
          "Patients",
          "Add / Remove Patients",
        ].map((section) => (
          <button
            key={section}
            type="button"
            className={`btn btn-success text-left mb-2 ${
              activeSection === section ? "fw-bold" : ""
            }`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-center fs-2 fw-semibold">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminData;
