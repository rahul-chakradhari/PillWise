import React, { useState } from "react";

const AdminData = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [actionType, setActionType] = useState(null);

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <h2>Welcome to Admin Dashboard</h2>;

      case "Appointments":
        return <h2>Appointment from backend</h2>;

      case "Patients":
        return (
          <div className="text-center">
            <h2>Manage Patients</h2>
            <div className="mt-3">
              <button
                className="btn btn-primary me-3"
                onClick={() => setActionType("add")}
              >
                Add New Patient
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setActionType("remove")}
              >
                Remove Patient
              </button>
            </div>

            {/* Add Patient Form */}
            {actionType === "add" && (
              <form className="mt-3">
                <h4 className="mb-3">Add New Patient</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Patient Name"
                  required
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  required
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Age"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Gender"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Blood Group"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Address"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Phone Number"
                  required
                />
                <button className="btn btn-success">Submit</button>
              </form>
            )}

            {/* Remove Patient Form */}
            {actionType === "remove" && (
              <form className="mt-3">
                <h4 className="mb-3">Remove Patient</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Patient Name"
                  required
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  required
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Age"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Gender"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Blood Group"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Address"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Phone Number"
                  required
                />
                <button className="btn btn-danger">Remove</button>
              </form>
              /* <form className="mt-3">
                <h4 className="mb-3">Remove Patient</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Patient ID"
                  required
                />
                <button className="btn btn-danger">Remove</button>
              </form>*/
            )}
          </div>
        );

      default:
        return <h2>Welcome to Admin Panel</h2>;
    }
  };

  return (
    <div className="d-flex vh-100 mt-3">
      <aside
        className="bg-dark text-white p-4 d-flex flex-column"
        style={{ width: "250px" }}
      >
        <h2 className="text-center mb-4">Admin Panel</h2>
        {[
          "Dashboard",
          "Appointments",
          "Patients",
          "Reminder",
          "All Doctors",
          "Add new doctor",
        ].map((section) => (
          <button
            key={section}
            type="button"
            className={`btn btn-success text-left mb-2 ${
              activeSection === section ? "fw-bold" : ""
            }`}
            onClick={() => {
              setActiveSection(section);
              setActionType(null);
            }}
          >
            {section}
          </button>
        ))}
      </aside>

      <main className="flex-grow-1 d-flex justify-content-center align-items-center fs-4 fw-semibold">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminData;
