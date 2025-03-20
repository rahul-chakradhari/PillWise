import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { setDoctors, setError, setLoading } from "../redux/doctorSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const rewards = [
  {
    title: "Rajesh Verma",
    img: "/gastro1.jpg",
    description: `(General Physician) MBBS\n\nDr. Rajesh Verma is an expert orthopedic surgeon known for his proficiency in joint replacements, fracture treatments, and sports injury rehabilitation. He emphasizes personalized care and modern surgical techniques for faster recovery.`,
    points: "Fix Appointment on 2000 ₹",
  },
  {
    title: "Priya Sharma",
    img: "/gyne1.jpg",
    description: `(Pediatrician) Specialized in skin treatments and cosmetic dermatology. Dr. Priya Sharma provides advanced skin care treatments, including acne management, pigmentation correction, and laser therapies.`,
    points: "Fix Appointment on 1200 ₹",
  },
  {
    title: "Aryan Mehta",
    img: "/dyne2.webp",
    description: `MBBS, MD (Cardiology)\n\nDr. Aryan Mehta, Cardiologist, is an expert in heart diseases, angioplasty, and cardiac surgeries.`,
    points: "Fix Appointment on 700 ₹",
  },
  {
    title: "Amit Joshi",
    img: "/dyne2.jpg",
    description: `MBBS, MD (Dermatology)\n\nDr. Amit Joshi specializes in maternity care, infertility treatments, and hormone-related disorders.`,
    points: "Fix Appointment on 2300 ₹",
  },
  {
    title: "Neha Kapoor",
    img: "/gyne2.jpg",
    description: `MBBS, MD (Gynecology)\n\nDr. Neha Kapoor specializes in maternity care, infertility treatments, and hormone-related disorders.`,
    points: "Fix Appointment on 800 ₹",
  },
  {
    title: "Anup Malik",
    img: "/anmup.jpg",
    description: `(Gastroenterologist) MBBS\n\nDr. Anup Malik is an expert orthopedic surgeon known for joint replacements, fracture treatments, and sports injury rehabilitation.`,
    points: "Fix Appointment on 1700 ₹",
  },
];

const Doctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { doctors, loading, error } = useSelector((state) => state.doctorKey);

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get("/api/doctors");
        dispatch(setDoctors(response.data));
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
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  return (
    <div className="doctors-container">
      {/* Animation Section */}
      <div className="animation-wrapper">
        {animationData && <Lottie animationData={animationData} />}
      </div>

      {/* Rewards Section */}
      <div className="rewards-container">
        <h2 className="text-3xl font-bold mb-4">Featured Doctors</h2>
        <div className="rewards-grid">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg rounded-lg p-4"
            >
              <img
                src={reward.img}
                alt={reward.title}
                className="w-full h-48 object-cover"
              />
              <div className="card-body">
                <h3 className="card-title text-xl font-bold">{reward.title}</h3>
                <p className="text-sm">{reward.description}</p>
                <p className="text-lg font-semibold">{reward.points}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doctors Section */}
      <div className="doctors-section mt-8">
        <h2 className="text-3xl font-bold mb-4">Available Doctors</h2>
        {loading ? (
          <p>Loading doctors...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="doctors-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="card bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={doctor.profileImage || "/placeholder.jpg"}
                  alt={doctor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.speciality}</p>
                  <p className="text-lg font-semibold">Fees: {doctor.fees} ₹</p>
                  <button
                    onClick={() => navigate(`/appointment/${doctor._id}`)}
                    className="bg-orange-400 text-white px-4 py-2 mt-3 rounded-lg hover:bg-orange-500 transition"
                  >
                    More Information
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
