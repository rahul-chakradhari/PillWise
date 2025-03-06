import React from "react";
import Lottie from "lottie-react";
import animationData from "F:hackathonMediTrack-Smart-Medicine-Reminder-Tracker\frontendpublicAnimation - 1741159934500.json";

const Home = () => {
  return (
    <div className="container">
      <div className="animation">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <div className="text">Doctor & Patient</div>
    </div>
  );
};

export default Home;
