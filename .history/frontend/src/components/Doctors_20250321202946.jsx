import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./styles.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFetchDoctors from "../hooks/useFetchDoctors"; // Import hook

const Doctors = () => {
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);

  // Fetch doctors using custom hook
  useFetchDoctors();

  // Load Lottie animation
  useEffect(() => {
    fetch("/Animation - 1741258183863.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  // Access doctors from Redux store
  const { doctors, loading, error } = useSelector((store) => store.doctorKey);

  // Ensure doctors is an array
  const doctorsList = Array.isArray(doctors) ? doctors : [];

  return (
    <>
      <div className="doctors-container">
        <div className="doctors-content">
          <div className="doctors-text">
            <div className="title">Meet Our Doctors 👨‍⚕️👩‍⚕️</div>
            <div className="texts">
              <b>1. Your Health, Our Priority! ❤️</b>
              <div className="subtexts">
                Our expert doctors 🏥 provide the best healthcare solutions.
              </div>
              <b>2. Connect with Specialists 🩺</b>
              <div className="subtexts">
                Schedule consultations 📅 and get medical advice.
              </div>
              <b>3. 24/7 Medical Assistance 🚑</b>
              <div className="subtexts">
                Get round-the-clock support & emergency help.
              </div>
              <br />
              <button className="button-64">
                <span className="text">Book Appointment</span>
              </button>
              <div className="arrow">
                <img
                  src="/green-arrow-outline-pointing-down-animation.gif"
                  alt="Arrow GIF"
                  style={{ width: "110px", height: "110px", marginTop: "12px" }}
                />
              </div>
            </div>
          </div>
          <div className="doctors-image">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                className="animation-style"
              />
            )}
          </div>
        </div>
      </div>

      {/* Speciality Buttons */}
      <div className="speci">
        <h3>Find by Speciality</h3>
      </div>
      <div className="stylish">
        <button className="button-92">General Physician</button>
        <button className="button-92">Gynecologist</button>
        <button className="button-92">Dermatologist</button>
        <button className="button-92">Pediatricians</button>
        <button className="button-92">Cardiologist</button>
      </div>

      {/* Doctor Cards */}
      <div className="rewards-container">
        {loading ? (
          <p>Loading doctors...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="rewards-grid">
            {doctorsList.length > 0 ? (
              doctorsList.map((doctor) => (
                <div
                  key={doctor._id}
                  className="card bg-base-100 image-full max-w-sm shadow-md flex flex-col items-center"
                >
                  <img
                    src={
                      doctor.profileImage ||
                      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    }
                    alt={doctor.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="card-body p-4">
                    <h2 className="card-title">{doctor.name}</h2>
                    <p className="uppercase font-semibold">
                      {doctor.speciality}
                    </p>
                    <p>Fees: {doctor.fees} ₹</p>
                    <button
                      onClick={() => navigate(`/appointment/${doctor._id}`)}
                      className="bg-orange-400 px-4 py-2 rounded-xl text-2xl mt-2"
                    >
                      More Information
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No doctors available</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Doctors;
