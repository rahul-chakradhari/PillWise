import React from "react";
import Lottie from "lottie-react";
import animationData from "/Animation - 1741159934050.json";

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
