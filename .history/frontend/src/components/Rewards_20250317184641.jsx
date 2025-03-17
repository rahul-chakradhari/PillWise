import React from "react";

const rewards = [
  {
    title: "Rajesh Verma",
    img: "gastro1.jpg",
    description: `General Physician, MBBS. Expert in joint replacements and sports injury rehabilitation.`,
    points: "Fix Appointment on ₹2000",
  },
  {
    title: "Priya Sharma",
    img: "gyne1.jpg",
    description: `Pediatrician & Dermatologist. Specializes in acne treatment, pigmentation correction, and laser therapy.`,
    points: "Fix Appointment on ₹1200",
  },
  {
    title: "Aryan Mehta",
    img: "dyne2.webp",
    description: `Cardiologist, MBBS, MD. Expert in heart diseases, angioplasty, and cardiac surgeries.`,
    points: "Fix Appointment on ₹700",
  },
  {
    title: "Amit Joshi",
    img: "dyne2.jpg",
    description: `Dermatologist, MBBS, MD. Specializes in skincare and cosmetic treatments.`,
    points: "Fix Appointment on ₹2300",
  },
  {
    title: "Neha Kapoor",
    img: "gyne2.jpg",
    description: `Gynecologist, MBBS, MD. Specializes in maternity care and infertility treatments.`,
    points: "Fix Appointment on ₹800",
  },
  {
    title: "Anup Malik",
    img: "anmup.jpg",
    description: `Gastroenterologist, MBBS. Expert in digestive disorders and liver diseases.`,
    points: "Fix Appointment on ₹1700",
  },
];

const Rewards = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Available Doctors</h2>
      <div className="row">
        {rewards.map((reward, index) => (
          <div key={index} className="col-12 mb-3">
            {" "}
            {/* 1 row = 1 card */}
            <div className="card reward-card shadow-sm p-3 mx-auto">
              <img
                src={reward.img}
                alt={reward.title}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{reward.title}</h5>
                <p className="card-text">{reward.description}</p>
                <button className="btn btn-primary">{reward.points}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rewards;
