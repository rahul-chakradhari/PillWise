import React, { useState } from "react";

const AdminData = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [doctorAction, setDoctorAction] = useState(null);
  const [appointmentAction, setAppointmentAction] = useState(null);
  const [prescriptionAction, setPrescriptionAction] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <h2>Welcome to Admin Dashboard</h2>;
      case "All Doctors":
        return <h2>Fetching doctor data from backend...</h2>;
      case "Prescription":
        return <h2>Manage Prescriptions</h2>;
      case "Appointments":
        return <h2>Appointments Management</h2>;
      case "Patients":
        return <h2>Patient Records</h2>;
      case "Reminder":
        return <h2>Set a Reminder</h2>;

      case "Update Prescription":
        return (
          <div className="text-center">
            <h2>Manage Prescriptions</h2>
            <div className="mt-3">
              <button
                className="btn btn-primary me-3"
                onClick={() => setPrescriptionAction("add")}
              >
                Add Prescription
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setPrescriptionAction("remove")}
              >
                Remove Prescription
              </button>
            </div>

            {/* Add Prescription Form */}
            {prescriptionAction === "add" && (
              <form className="mt-3">
                <h4 className="mb-3">Add New Prescription</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="User ID"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Doctor ID"
                />
                <input
                  type="date"
                  className="form-control mb-2"
                  placeholder=" Date Issued "
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Medicine Name"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Medicine Dosage"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Medicine Frequency"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Medicine Duration"
                />

                <button className="btn btn-success">Submit</button>
              </form>
            )}

            {/* Remove Prescription Form */}
            {prescriptionAction === "remove" && (
              <form className="mt-3">
                <h4 className="mb-3">Remove Prescription</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Patient ID"
                />
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
              setAppointmentAction(null);
              setPrescriptionAction(null);
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
