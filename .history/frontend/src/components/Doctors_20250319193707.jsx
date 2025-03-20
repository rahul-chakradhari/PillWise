import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { setDoctors, setError, setLoading } from "../redux/doctorSlice";
import useFetchDoctors from "../hooks/useFetchDoctors";
import { store } from "../redux/store";
import { useNavigate } from "react-router-dom";
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

const Doctors = () => {
  const dispatch = useDispatch();

  const [animationData, setAnimationData] = useState(null);

  //fetch doctors from redux store
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
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  useFetchDoctors();
  const navigate = useNavigate();
  const { doctors } = useSelector((store) => store.doctorKey);
  // console.log(doctors);

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
                className="card bg-base-100 image-full  max-w-sm shadow-sm items-center flex"
              >
                <img
                  src={
                    doctor.profileImage ||
                    "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  }
                  alt={doctor.name}
                />

                <div className="card-body">
                  <h2 className="card-title ">{doctor.name}</h2>
                  <p className=" uppercase font-semibold">
                    {doctor.speciality}
                  </p>
                  <p>Fees: {doctor.fees} ₹</p>
                  <div>
                    <button
                      onClick={() => navigate(`/appointment/${doctor._id}`)}
                      className=" bg-orange-400 px-4 py-2 rounded-xl text-2xl"
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
