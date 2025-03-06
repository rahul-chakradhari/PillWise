import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

const Home = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/Animation-1741159934500.json") // Public folder se fetch karo
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  return (
    <div className="container">
      <div className="image">
        {animationData && (
          <Lottie animationData={animationData} className="image-style" />
        )}
      </div>
      <div className="text">Doctor & Patient</div>
    </div>
  );
};

export default Home;
