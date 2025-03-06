import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import "./styles.css";
const Home = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/Animation - 1741159934500.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

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
        <h3>
          * Stay on Track with MediTrack! 🚀 <br />
        </h3>
        Never miss a dose! ⏰ Smart medicine reminders & health tracking for a
        better you. 💊🩺 <br />
        <h3>* Smart Healthcare, Smarter You! 🧠💡</h3>
        <br />
        MediTrack helps you manage your medications 💊 and stay healthy
        effortlessly. ✅<br />
        <h3> * Your Health, Our Priority! ❤️</h3>
        <br />
        Get real-time medicine alerts 🔔, health analytics 📊, and doctor
        consultations 🏥 in one place. <br />
        * MediTrack – Your Personal Health Assistant 🤖 <br />
        Say goodbye to missed doses! 👋 Track 📋, remind ⏳, and stay healthy 💪
        with ease.
      </div>
    </div>
  );
};

export default Home;
