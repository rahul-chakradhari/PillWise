import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDoctors, setLoading, setError } from "../redux/doctorSlice"; // Redux actions

const AdminData = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  // Redux store se doctors fetch kar rahe hain
  const { doctors, loading, error } = useSelector((state) => state.doctorKey);
  const dispatch = useDispatch();
  const rewards = [
    {
      title: "Rajesh Verma ",
      img: "/gastro1.jpg",
      description: ` ( Gentral Phytsician ) MBBS, \n\n
    Dr. Rajesh Verma is an expert orthopedic surgeon known for his proficiency in joint replacements, fracture treatments, and sports injury rehabilitation. He emphasizes personalized care and modern surgical techniques for faster recovery.\n\n
  `,
      points: " Fix  Appointment on 2000 ₹ ",
    },
  
    {
      title: "Priya Sharma",
      img: "/gyne1.jpg",
      description: `( Pediatrician ) Specialized in skin treatments and cosmetic dermatology , Dr. Priya Sharma: With extensive experience in dermatology, Dr. Priya Sharma provides advanced skin care treatments, including acne management, pigmentation correction, and laser therapies. She is dedicated to helping patients achieve healthy and radiant skin.\n\n `,
      points: " Fix Appointment on 1200 ₹",
    },
    {
      title: "Aryan Mehta ",
      img: "/dyne2.webp",
      description: `MBBS, MD (Dermatology)  Dermatologist, \n\nDr. Aryan Mehta, Cardiologist, MBBS, MD (Cardiology), +91 9876543210, aryan.mehta@example.com, securePass123, Mumbai, India, 12 years, Expert in heart diseases, angioplasty, and cardiac surgeries.`,
      points: "Fix Appointment on 700 ₹",
    },
    {
      title: "Amit Joshi",
      img: "/dyne2.jpg",
      description: ` MBBS, MD (Dermatologist) \n\nAs a leading dermatologist, Dr. Amit Joshi specializes in maternity care, infertility treatments, and hormone-related disorders..`,
      points: "Fix Appointment on 2300 ₹",
    },
    {
      title: "Neha Kapoor",
      img: "/gyne2.jpg",
      description: `Verified
  MBBS, MD (Gynecology)  Gynecologist \n\n As a leading gynecologist, Dr. Neha Kapoor specializes in maternity care, infertility treatments, and hormone-related disorders.`,
      points: "Fix Appointment on 800 ₹",
    },
    {
      title: "Dr Anup Malik",
      img: "/anmup.jpg",
      description: ` ( Gastroenterologis) MBBS \n\n
    Dr. Anup Malik is an expert orthopedic surgeon known for his proficiency in joint replacements, fracture treatments, and sports injury rehabilitation. He emphasizes personalized care and modern surgical techniques for faster recovery.\n\n
  `,
      points: "Fix Appointment on 1700 ₹",
    },
  ];
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
              <button className="btn btn-primary me-3">Add New Patient</button>
              <button className="btn btn-danger">Remove Patient</button>
            </div>
          </div>
        );

      case "All Doctors":
        return (
          <div className="container text-center">
            <h2 className="mb-4">All Registered Doctors</h2>

            {/* 🟢 Show Loading Spinner if data is being fetched */}
            {loading ? (
              <p>Loading doctors...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : doctors.length > 0 ? (
              <div className="row">
                {doctors.map((doctor) => (
                  <div key={doctor._id} className="col-md-4 mb-3">
                    <div className="card shadow-sm p-3">
                      {/* 🟢 If image is not available, show default image */}
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
                ))}
              </div>
            ) : (
              <p>No doctors found!</p>
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
            onClick={() => setActiveSection(section)}
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
     {/* Rewards Section */}
     <div className="rewards-container">
     <div className="rewards-grid">
       {rewards.map((reward, index) => (
         <div className="card" key={index}>
           <img
             src={reward.img}
             className="card-img-top"
             alt={reward.title}
           />
           <div className="card-body">
             <h5 className="card-title">{reward.title}</h5>
             <p className="card-text">{reward.description}</p>
             <button className="btn btn-primary">{reward.points}</button>
           </div>
         </div>
       ))}
     </div>
   </div>
  );
};

export default AdminData;
