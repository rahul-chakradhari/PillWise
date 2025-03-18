import React, { useState } from "react";
import { useSelector } from "react-redux";

const AdminData = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [actionType, setActionType] = useState(null);

  // Redux Store se doctors fetch kar rahe hain
  const { doctors } = useSelector((state) => state.doctorKey);

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <h2>Welcome to Admin Dashboard</h2>;

      case "Appointments":
        return <h2>Appointment from backend</h2>;

      case "Remainder":
        return <h2>Needs to be done</h2>;

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
          </div>
        );

      case "All Doctors":
        return (
          <div className="container text-center">
            <h2 className="mb-4">All Registered Doctors</h2>
            <div className="row">
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <div key={doctor._id} className="col-md-4 mb-3">
                    <div className="card shadow-sm p-3">
                      <img
                        src={doctor.image || "/default-doctor.png"}
                        alt={doctor.name}
                        className="card-img-top rounded-circle"
                        style={{
                          width: "150px",
                          height: "150px",
                          margin: "auto",
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{doctor.name}</h5>
                        <p className="card-text">
                          <b>Specialty:</b> {doctor.specialty} <br />
                          <b>Experience:</b> {doctor.experience} years <br />
                          <b>Consultation Fee:</b> ₹{doctor.fee}
                        </p>
                        <button className="btn btn-danger">
                          Remove Doctor
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No doctors found!</p>
              )}
            </div>
          </div>
        );

      case "Add Doctor":
        return (
          <div className="text-center">
            <h2>Add New Doctor</h2>
            <form className="mt-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Doctor Name"
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Specialty"
                required
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Experience (Years)"
                required
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Consultation Fees"
                required
              />
              <button className="btn btn-success">Add Doctor</button>
            </form>
          </div>
        );

      default:
        return <h2>Welcome to Admin Panel</h2>;
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
          "Patients",
          "Remainder",
          "All Doctors",
          "Add Doctor",
        ].map((section) => (
          <button
            key={section}
            type="button"
            className={`btn mb-2 ${
              activeSection === section
                ? "btn-light text-dark fw-bold"
                : "btn-success text-white"
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

      {/* Main Content */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-center fs-4 fw-semibold">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminData;
