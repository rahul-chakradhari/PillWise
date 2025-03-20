import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { store } from "../redux/store";

const Home = () => {
  const [animationData, setAnimationData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/Animation - 1741159934500.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  const { user } = useSelector((store) => store.userKey);

  return (
    <div className="container">
      <div className="image">
        {animationData && (
          <Lottie
            animationData={animationData}
            loop={true}
            className="animation-style"
          />
        )}
      </div>
      <div className="text">
        <div className="title">MediTrack</div>
        <div className="texts">
          <b>
            {" "}
            1. Stay on Track with MediTrack! 🚀 <br />
          </b>
          <div className="subtexts">
            Never miss a dose! ⏰ Smart medicine reminders & health tracking for
            a better you. 💊🩺 <br />
          </div>
          <b> 2. Smart Healthcare, Smarter You! 🧠💡</b>
          <br />
          <div className="subtexts">
            MediTrack helps you manage your medications 💊 and stay healthy
            effortlessly. ✅<br />
          </div>
          <b>3. Your Health, Our Priority! ❤️</b>
          <br />
          <div className="subtexts">
            Get real-time medicine alerts 🔔, health analytics 📊, and doctor
            consultations 🏥 in one place.
          </div>
          <b>
            4. MediTrack – Your Personal Health Assistant 🤖 <br />
          </b>
          <div className="subtexts">
            Say goodbye to missed doses! 👋 Track 📋, remind ⏳, and stay
            healthy 💪 with ease.
          </div>
          <br />

          {user ? (
            <div className="button-container">
              <button
                className="button-64"
                role="button"
                onClick={() => navigate("/doctors")}
              >
                <span className="text">
                  Welcome To Our Platform <br />
                  Click For Appointment{" "}
                </span>
              </button>

              <div className="arrowii">
                <img
                  src="/2754-arrow-big-up.png"
                  alt="Arrow Up"
                  className="arrow-image"
                  style={{
                    width: "100px",
                    height: "100px",
                    marginLeft: "20px",
                  }}
                />
              </div>
            </div>
          ) : (
            <button
              className="button-64"
              role="button"
              onClick={() => navigate("/login")}
            >
              <span className="text">Get Started</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
