import React, { useState } from "react";

const AdminData = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [doctorAction, setDoctorAction] = useState(null);
  const [appointmentAction, setAppointmentAction] = useState(null);
  const [prescriptionAction, setPrescriptionAction] = useState(null);
  const [reminderAction, setReminderAction] = useState(null);
  const [patientAction, setPatientAction] = useState(null);

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <h2>Welcome to Admin Dashboard</h2>;
      case "Update Doctors":
        return renderDoctorSection();
      case "Update Appointments":
        return renderAppointmentSection();
      case "Update Prescription":
        return renderPrescriptionSection();
      case "Update Reminder":
        return renderReminderSection();
      case "Update Patients":
        return renderPatientSection();
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
      {doctorAction && renderGenericForm("Doctor", doctorAction)}
    </div>
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
      {appointmentAction && renderGenericForm("Appointment", appointmentAction)}
    </div>
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
      {prescriptionAction &&
        renderGenericForm("Prescription", prescriptionAction)}
    </div>
  );

  const renderReminderSection = () => (
    <div className="text-center">
      <h2>Manage Reminders</h2>
      <button
        className="btn btn-primary me-3"
        onClick={() => setReminderAction("add")}
      >
        Add Reminder
      </button>
      <button
        className="btn btn-warning me-3"
        onClick={() => setReminderAction("update")}
      >
        Update Reminder
      </button>
      <button
        className="btn btn-danger"
        onClick={() => setReminderAction("remove")}
      >
        Remove Reminder
      </button>
      {reminderAction && renderGenericForm("Reminder", reminderAction)}
    </div>
  );

  const renderPatientSection = () => (
    <div className="text-center">
      <h2>Manage Patients</h2>
      <button
        className="btn btn-primary me-3"
        onClick={() => setPatientAction("add")}
      >
        Add Patient
      </button>
      <button
        className="btn btn-warning me-3"
        onClick={() => setPatientAction("update")}
      >
        Update Patient
      </button>
      <button
        className="btn btn-danger"
        onClick={() => setPatientAction("remove")}
      >
        Remove Patient
      </button>
      {patientAction && renderGenericForm("Patient", patientAction)}
    </div>
  );

  const renderGenericForm = (type, action) => (
    <form className="mt-3">
      <h4>
        {action === "add"
          ? `Add New ${type}`
          : action === "update"
          ? `Update ${type} Info`
          : `Remove ${type}`}
      </h4>
      <input
        type="text"
        className="form-control mb-2"
        placeholder={`${type} ID`}
      />
      {action !== "remove" && (
        <>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Full Name"
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Details"
          />
        </>
      )}
      <button
        className={`btn btn-${action === "remove" ? "danger" : "success"}`}
      >
        {action === "remove" ? "Remove" : "Submit"}
      </button>
    </form>
  );

  return <div className="container mt-3">{renderContent()}</div>;
};

export default AdminData;
