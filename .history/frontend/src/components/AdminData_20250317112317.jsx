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
      case "Update Doctors":
        return renderDoctorSection();
      case "Update Appointments":
        return renderAppointmentSection();
      case "Update Prescription":
        return renderPrescriptionSection();
      default:
        return <h2>Select an option from the sidebar</h2>;
    }
  };

  const renderDoctorSection = () => (
    <div className="text-center">
      <h2>Manage Doctors</h2>
      <button
        className="btn btn-primary me-3"
        onClick={() => setDoctorAction("add")}
      >
        Add Doctor
      </button>
      <button
        className="btn btn-warning me-3"
        onClick={() => setDoctorAction("update")}
      >
        Update Doctor
      </button>
      <button
        className="btn btn-danger"
        onClick={() => setDoctorAction("remove")}
      >
        Remove Doctor
      </button>

      {doctorAction === "add" && renderDoctorForm("Add New Doctor")}
      {doctorAction === "update" && renderDoctorForm("Update Doctor Info")}
      {doctorAction === "remove" && renderDoctorRemovalForm()}
    </div>
  );

  const renderDoctorForm = (title) => (
    <form className="mt-3">
      <h4>{title}</h4>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Doctor ID"
      />
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
      <input type="text" className="form-control mb-2" placeholder="Phone" />
      <input type="email" className="form-control mb-2" placeholder="Email" />
      <input type="text" className="form-control mb-2" placeholder="Address" />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Experience (in years)"
      />
      <input type="number" className="form-control mb-2" placeholder="Fees" />
      <button className="btn btn-success">Submit</button>
    </form>
  );

  const renderDoctorRemovalForm = () => (
    <form className="mt-3">
      <h4>Remove Doctor</h4>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Doctor ID or Email"
      />
      <button className="btn btn-danger">Remove</button>
    </form>
  );

  const renderAppointmentSection = () => (
    <div className="text-center">
      <h2>Manage Appointments</h2>
      <button
        className="btn btn-primary me-3"
        onClick={() => setAppointmentAction("add")}
      >
        Add Appointment
      </button>
      <button
        className="btn btn-warning me-3"
        onClick={() => setAppointmentAction("update")}
      >
        Update Appointment
      </button>
      <button
        className="btn btn-danger"
        onClick={() => setAppointmentAction("remove")}
      >
        Remove Appointment
      </button>

      {appointmentAction === "add" &&
        renderAppointmentForm("Add New Appointment")}
      {appointmentAction === "update" &&
        renderAppointmentForm("Update Appointment Info")}
      {appointmentAction === "remove" && renderAppointmentRemovalForm()}
    </div>
  );

  const renderAppointmentForm = (title) => (
    <form className="mt-3">
      <h4>{title}</h4>
      <input type="text" className="form-control mb-2" placeholder="User ID" />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Doctor ID"
      />
      <input type="date" className="form-control mb-2" placeholder="Date" />
      <input type="time" className="form-control mb-2" placeholder="Time" />
      <button className="btn btn-success">Submit</button>
    </form>
  );

  const renderAppointmentRemovalForm = () => (
    <form className="mt-3">
      <h4>Remove Appointment</h4>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Appointment ID"
      />
      <button className="btn btn-danger">Remove</button>
    </form>
  );

  const renderPrescriptionSection = () => (
    <div className="text-center">
      <h2>Manage Prescriptions</h2>
      <button
        className="btn btn-primary me-3"
        onClick={() => setPrescriptionAction("add")}
      >
        Add Prescription
      </button>
      <button
        className="btn btn-warning me-3"
        onClick={() => setPrescriptionAction("update")}
      >
        Update Prescription
      </button>
      <button
        className="btn btn-danger"
        onClick={() => setPrescriptionAction("remove")}
      >
        Remove Prescription
      </button>

      {prescriptionAction === "add" &&
        renderPrescriptionForm("Add New Prescription")}
      {prescriptionAction === "update" &&
        renderPrescriptionForm("Update Prescription Info")}
      {prescriptionAction === "remove" && renderPrescriptionRemovalForm()}
    </div>
  );

  const renderPrescriptionForm = (title) => (
    <form className="mt-3">
      <h4>{title}</h4>
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
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Medication Details"
      />
      <button className="btn btn-success">Submit</button>
    </form>
  );

  return <div className="container mt-3">{renderContent()}</div>;
};

export default AdminData;
