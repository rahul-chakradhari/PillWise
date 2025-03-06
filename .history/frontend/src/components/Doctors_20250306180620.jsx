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
    <>
      <div className="doctors-container">
        <div className="doctors-content">
          <div className="doctors-text">
            <div className="title">Meet Our Doctors 👨‍⚕️👩‍⚕️</div>
            <div className="texts">
              <b>
                {" "}
                1. Your Health, Our Priority! ❤️ <br />
              </b>
              <div className="subtexts">
                Our team of expert doctors 🏥 is here to provide the best
                healthcare solutions for you.
              </div>
              <b>
                2. Connect with Specialists 🩺 <br />
              </b>
              <div className="subtexts">
                Schedule consultations 📅 and get medical advice from top
                doctors.
              </div>
              <b>
                {" "}
                3. 24/7 Medical Assistance 🚑 <br />
              </b>
              <div className="subtexts">
                Get round-the-clock support and emergency medical help when
                needed.
              </div>
              <br />
              <button className="button-64" role="button">
                <span className="text">Book appointment</span>
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
      <div>
        <div className="speci">
          <h3>Find by Speciality</h3>
        </div>
        <button class="button-92" role="button">
          General Physician
        </button>
      </div>
    </>
  );
};

export default Doctors;



<!-- HTML !-->


/* CSS */
.button-89 {
  --b: 3px;   /* border thickness */
  --s: .45em; /* size of the corner */
  --color: #373B44;
  
  padding: calc(.5em + var(--s)) calc(.9em + var(--s));
  color: var(--color);
  --_p: var(--s);
  background:
    conic-gradient(from 90deg at var(--b) var(--b),#0000 90deg,var(--color) 0)
    var(--_p) var(--_p)/calc(100% - var(--b) - 2*var(--_p)) calc(100% - var(--b) - 2*var(--_p));
  transition: .3s linear, color 0s, background-color 0s;
  outline: var(--b) solid #0000;
  outline-offset: .6em;
  font-size: 16px;

  border: 0;

  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-89:hover,
.button-89:focus-visible{
  --_p: 0px;
  outline-color: var(--color);
  outline-offset: .05em;
}

.button-89:active {
  background: var(--color);
  color: #fff;
}