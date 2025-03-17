import React, { useState } from "react";

const AdminData = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [actionType, setActionType] = useState(null);

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <h2>Welcome to Admin Dashboard</h2>;

      case "Appointments":
      case "Prescription":
      case "Reminder":
      case "Patients":
        return (
          <div className="text-center">
            <h2>Manage {activeSection}</h2>
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

            {/* Add Forms */}
            {actionType === "add" && activeSection === "Reminder" && (
              <form className="mt-3">
                <h4 className="mb-3">Add New Reminder</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="User ID"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Medicine Name"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Dosage (e.g., 500mg)"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Frequency (e.g., 3 times a day)"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Specific Days (e.g., Mon, Wed, Fri)"
                  required
                />
                <input type="time" className="form-control mb-2" required />
                <input
                  type="date"
                  className="form-control mb-2"
                  placeholder="Start Date"
                  required
                />
                <input
                  type="date"
                  className="form-control mb-2"
                  placeholder="End Date"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Notes (Optional)"
                />
                <button className="btn btn-success">Submit</button>
              </form>
            )}

            {/* Remove Forms */}
            {actionType === "remove" && activeSection === "Reminder" && (
              <form className="mt-3">
                <h4 className="mb-3">Remove Reminder</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="User ID"
                  required
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Medicine Name"
                  required
                />
                <button className="btn btn-danger">Remove</button>
              </form>
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
          "Prescription",
          "Reminder",
          "Patients",
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
