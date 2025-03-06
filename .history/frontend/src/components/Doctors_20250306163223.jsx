import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./styles.css";

const Doctors = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/Animation - 1741258183863.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  return (
    <div className="doctors-container">
      <div className="doctors-content">
        <div className="doctors-text">
          <div className="title">Meet Our Doctors 👨‍⚕️👩‍⚕️</div>
          <div className="texts">
            1. Your Health, Our Priority! ❤️ <br />
            <div className="subtexts">
              Our team of expert doctors 🏥 is here to provide the best
              healthcare solutions for you.
            </div>
            2. Connect with Specialists 🩺 <br />
            <div className="subtexts">
              Schedule consultations 📅 and get medical advice from top doctors.
            </div>
            3. 24/7 Medical Assistance 🚑 <br />
            <div className="subtexts">
              Get round-the-clock support and emergency medical help when
              needed.
            </div>
            <br />
            <button className="button-64" role="button">
              <span className="text">Find a Doctor</span>
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
  );
};

export default Doctors;
