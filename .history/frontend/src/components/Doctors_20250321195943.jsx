import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { setDoctors, setError, setLoading } from "../redux/doctorSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);

  const { doctors, loading, error } = useSelector((store) => store.doctorKey);

  useEffect(() => {
    const fetchDoctors = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get("/api/doctors");

        if (Array.isArray(response.data)) {
          dispatch(setDoctors(response.data));
        } else {
          dispatch(setError("Invalid data format received."));
        }
      } catch (error) {
        dispatch(setError("Failed to load doctors!"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchDoctors();
  }, [dispatch]);

  useEffect(() => {
    fetch("/Animation - 1741258183863.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

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

      {/* Buttons Section */}
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

      {/* Loading, Error, and Doctors Section */}
      <div className="rewards-container">
        {loading ? (
          <div className="text-center text-blue-500">Loading doctors...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : doctors.length > 0 ? (
          <div className="rewards-grid">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="card bg-base-100 image-full max-w-sm shadow-md rounded-lg hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <img
                  src={
                    doctor.profileImage ||
                    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  }
                  alt={doctor.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="card-body p-4">
                  <h2 className="card-title text-lg font-bold">
                    {doctor.name}
                  </h2>
                  <p className="text-gray-600">
                    <span className="font-semibold">Speciality:</span>{" "}
                    {doctor.speciality}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Fees:</span> ₹{doctor.fees}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => navigate(`/appointment/${doctor._id}`)}
                      className="bg-orange-400 px-4 py-2 rounded-xl text-white hover:bg-orange-500 transition"
                    >
                      More Information
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No doctors available</p>
        )}
      </div>
    </>
  );
};

export default Doctors;
