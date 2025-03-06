import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./styles.css";

const rewards = [
  {
    title: "Rajesh Verma ",
    img: "/gastro1.jpg",
    description: ` ( Gastroenterologis) MBBS, \n\n
  Dr. Rajesh Verma is an expert orthopedic surgeon known for his proficiency in joint replacements, fracture treatments, and sports injury rehabilitation. He emphasizes personalized care and modern surgical techniques for faster recovery.\n\n
`,
    points: " 1st appointment on 2000 ",
  },

  {
    title: "Priya Sharma",
    img: "/Helmet.jpg",
    description: `( Gynecologist ) Specialized in skin treatments and cosmetic dermatology , Dr. Priya Sharma: With extensive experience in dermatology, Dr. Priya Sharma provides advanced skin care treatments, including acne management, pigmentation correction, and laser therapies. She is dedicated to helping patients achieve healthy and radiant skin.\n\n `,
    points: 800,
  },
  {
    title: "A Small Plant",
    img: "/tree.jpg",
    description: "Use this plant in your home, give it sunlight and water.",
    points: 200,
  },
  {
    title: "Branded Kurti (All Sizes)",
    img: "/kurti.jpg",
    description: "Redeem our standard quality kurti made of pure cotton.",
    points: 1000,
  },
  {
    title: "Happy Stickers",
    img: "/happy.jpg",
    description: "Use these stickers in your accessories & spread happiness.",
    points: 300,
  },
  {
    title: "1L Water Bottle",
    img: "/bottle.jpg",
    description: "Use this water bottle while traveling, schooling, etc.",
    points: 250,
  },
];

const Doctors = () => {
  const [animationData, setAnimationData] = useState(null);

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
                <button className="btn btn-primary">
                  {reward.points} <i className="fa-solid fa-coins"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Doctors;
