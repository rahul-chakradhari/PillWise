import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { setDoctors, setError, setLoading } from "../redux/doctorSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstant";

const Doctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [animationData, setAnimationData] = useState(null);

  // Fetch doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axiosInstance.get("/api/doctors");

        // Make sure doctors is an array before setting it
        const doctorsData = Array.isArray(response.data) ? response.data : [];

        dispatch(setDoctors(doctorsData));
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

  const { doctors } = useSelector((store) => store.doctorKey);
  console.log(doctors);

  // // Ensure doctors is an array before mapping
  // const doctorsList = Array.isArray(doctors) ? doctors : [];

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

      {/* Rewards Section */}
      <div className="rewards-container">
        <div className="rewards-grid">
          {doctors &&
            doctors?.map((doctor) => (
              <div
                key={doctor._id}
                className="card bg-base-100 image-full max-w-sm shadow-sm items-center flex"
              >
                <img
                  src={
                    doctor.profileImage ||
                    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  }
                  alt={doctor.name}
                />
                <div className="card-body">
                  <h2 className="card-title">{doctor.name}</h2>
                  <p className="uppercase font-semibold">{doctor.speciality}</p>
                  <p>Fees: {doctor.fees} ₹</p>
                  <div>
                    <button
                      onClick={() => navigate(`/appointment/${doctor._id}`)}
                      className="bg-orange-400 px-4 py-2 rounded-xl text-2xl"
                    >
                      More Information
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Doctors;
