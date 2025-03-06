import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const Home = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/Animation - 1741159934500.json") // Public folder ka path
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  return (
    <div className="container">
      <div className="animation">
        {animationData && <Lottie animationData={animationData} loop={true} />}
      </div>
      <div className="text">Doctor & Patient</div>
    </div>
  );
};

export default Home;
