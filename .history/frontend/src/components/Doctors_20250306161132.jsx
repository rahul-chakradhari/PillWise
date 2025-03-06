import React from "react";
import "./styles.css";

const Doctors = () => {
  return (
    <div className="doctors-container">
      <div className="doctors-content">
        <div className="doctors-image">
          {/* Add Lottie animation or image here */}
        </div>
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
      </div>
    </div>
  );
};

export default Doctors;
