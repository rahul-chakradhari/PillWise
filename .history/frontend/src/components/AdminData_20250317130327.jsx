import React, { useState } from "react";

const AdminData = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [actionType, setActionType] = useState(null);

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <h2>Welcome to Admin Dashboard</h2>;

      case "All Doctors":
        return <h2>Fetching doctor data from backend...</h2>;

      case "Appointments":
      case "Update Appointments":
        return (
          <div className="text-center">
            <h2>Manage Appointments</h2>
            <div className="mt-3">
              <button
                className="btn btn-primary me-3"
                onClick={() => setActionType("add")}
              >
                Add Appointment
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setActionType("remove")}
              >
                Remove Appointment
              </button>
            </div>

            {/* Add Appointment Form */}
            {actionType === "add" && (
              <form className="mt-3">
                <h4 className="mb-3">Add New Appointment</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="User ID"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Doctor ID"
                  required
                />
                <input type="date" className="form-control mb-2" required />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Appointment Day"
                  required
                />
                <input type="time" className="form-control mb-2" required />

                {/* Status Dropdown */}
                <select className="form-control mb-2" required>
                  <option value="Pending" selected>
                    Pending
                  </option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Notes (Optional)"
                />
                <button className="btn btn-success">Submit</button>
              </form>
            )}

            {/* Remove Appointment Form */}
            {actionType === "remove" && (
              <form className="mt-3">
                <h4 className="mb-3">Remove Appointment</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="User ID"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Doctor ID"
                  required
                />
                <input type="date" className="form-control mb-2" required />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Appointment Day"
                  required
                />
                <input type="time" className="form-control mb-2" required />

                {/* Status Dropdown for Filtering */}
                <select className="form-control mb-2">
                  <option value="Stauts">Status</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Notes (Optional)"
                />
                <button className="btn btn-danger">Remove</button>
              </form>
            )}
          </div>
        );

      case "Prescription":
      case "Reminder":
      case "Patients":
        return (
          <div className="text-center">
            <h2>{activeSection} Management</h2>
            <div className="mt-3">
              <button
                className="btn btn-primary me-3"
                onClick={() => setActionType("add")}
              >
                Add {activeSection}
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setActionType("remove")}
              >
                Remove {activeSection}
              </button>
            </div>

            {actionType === "add" && (
              <form className="mt-3">
                <h4 className="mb-3">Add {activeSection}</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder={`Enter ${activeSection} Details`}
                />
                <button className="btn btn-success">Submit</button>
              </form>
            )}

            {actionType === "remove" && (
              <form className="mt-3">
                <h4 className="mb-3">Remove {activeSection}</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder={`Enter ${activeSection} ID`}
                />
                <button className="btn btn-danger">Remove</button>
              </form>
            )}
          </div>
        );

      case "Update Doctors":
        return (
          <div className="text-center">
            <h2> Doctors Management</h2>
            <div className="mt-3">
              <button
                className="btn btn-primary me-3"
                onClick={() => setActionType("add")}
              >
                Add Doctor
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setActionType("remove")}
              >
                Remove Doctor
              </button>
            </div>

            {actionType === "add" && (
              <form className="mt-3">
                <h4 className="mb-3">Add New Doctor</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Speciality"
                />
                <button className="btn btn-success">Submit</button>
              </form>
            )}

            {actionType === "remove" && (
              <form className="mt-3">
                <h4 className="mb-3">Remove Doctor</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Doctor ID or Name"
                />
                <button className="btn btn-danger">Remove</button>
              </form>
            )}
          </div>
        );
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
          "Prescription",
          "Reminder",
          "Patients",
          "Update Doctors",
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
