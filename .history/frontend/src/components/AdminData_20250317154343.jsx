import React, { useState } from "react";
import { useSelector } from "react-redux";
const AdminData = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [actionType, setActionType] = useState(null);
  const { doctors } = useSelector((state) => state.doctorKey);
  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <h2>Welcome to Admin Dashboard</h2>;

      case "Appointments":
        return <h2>Appointment from backend</h2>;

      case "Remainder":
        return <h2>Needs to be done</h2>;
      case "All Doctors":
        return (
          <div className="container">
            <h2 className="text-center">All Doctors</h2>
            <div className="row">
              {doctors.map((doctor, index) => (
                <div key={index} className="col-md-4 mb-3">
                  <div className="card">
                    <img
                      src={doctor.img}
                      className="card-img-top"
                      alt={doctor.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{doctor.title}</h5>
                      <p className="card-text">{doctor.description}</p>
                      <button className="btn btn-primary">
                        {doctor.points}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
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
              <form className="mt-3" onSubmit={(e) => e.preventDefault()}>
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
                  type="password"
                  className="form-control mb-2"
                  placeholder="Password"
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

            {/* Remove Patient Action Placeholder */}
            {actionType === "remove" && (
              <form className="mt-3" onSubmit={(e) => e.preventDefault()}>
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
                  type="password"
                  className="form-control mb-2"
                  placeholder="Password"
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
            )}
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
                type="text"
                className="form-control mb-2"
                placeholder="Phone Number"
                required
              />
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                required
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Address"
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
