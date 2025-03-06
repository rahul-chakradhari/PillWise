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
        MediTrack <br />
        Stay on Track with MediTrack! 🚀 <br />
        Never miss a dose! ⏰ Smart medicine reminders & health tracking for a
        better you. 💊🩺 <br />
        Smart Healthcare, Smarter You! 🧠💡
        <br />
        MediTrack helps you manage your medications 💊 and stay healthy
        effortlessly. ✅<br />
        Your Health, Our Priority! ❤️
        <br />
        Get real-time medicine alerts 🔔, health analytics 📊, and doctor
        consultations 🏥 in one place. <br />
        MediTrack – Your Personal Health Assistant 🤖 <br />
        Say goodbye to missed doses! 👋 Track 📋, remind ⏳, and stay healthy 💪
        with ease.
      </div>
    </div>
  );
};

export default Home;
