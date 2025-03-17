import React, { useState } from "react";

const AdminData = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [doctorAction, setDoctorAction] = useState(null);
  const [appointmentAction, setAppointmentAction] = useState(null);
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

      case "Update Doctors":
        return (
          <div className="text-center">
            <h2>Manage Doctors</h2>
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
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Phone"
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Address"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Experience (in years)"
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Fees"
                />

                {/* Profile Image Upload */}
                <div className="mb-3">
                  <label className="form-label">Profile Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                {/* Show Image Preview */}
                {previewImage && (
                  <div className="mb-3">
                    <p>Preview:</p>
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className="img-thumbnail"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}

                <button className="btn btn-success">Submit</button>
              </form>
            )}

            {/* Remove Doctor Form */}
            {doctorAction === "remove" && (
              <form className="mt-3">
                <h4>Remove Doctor</h4>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Doctor's Email or Name"
                />
                <button className="btn btn-danger">Remove</button>
              </form>
            )}
          </div>
        );
      case "Update Appointments":
        return (
          <div className="text-center">
            <h2>Manage Appointments</h2>
            <div className="mt-3">
              <button
                className="btn btn-primary me-3"
                onClick={() => setAppointmentAction("add")}
              >
                Add Appointment
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setAppointmentAction("remove")}
              >
                Remove Appointment
              </button>
            </div>
            {/* Add Appointment Form */}
            {appointmentAction === "add" && (
              <form className="mt-3">
                <h4 className="mb-3">Add New Appointment</h4>
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
                  placeholder="Appointment Date"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Appointment Day"
                />
                <input
                  type="time"
                  className="form-control mb-2"
                  placeholder="Appointment Time"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Status(Pending/Confirmed/Cancelled/Completed)"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Notes"
                />
                <button className="btn btn-success">Submit</button>
              </form>
            )}

            {/* Remove Appointment Form */}
            {appointmentAction === "remove" && (
              <form className="mt-3">
                <h4 className="mb-3">Remove Appointment</h4>
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
                  placeholder="Appointment Date"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Appointment Day"
                />
                <input
                  type="time"
                  className="form-control mb-2"
                  placeholder="Appointment Time"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Status(Pending/Confirmed/Cancelled/Completed)"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Notes"
                />
                <button className="btn btn-success">Submit</button>
              </form>
            )}
          </div>
        );
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
