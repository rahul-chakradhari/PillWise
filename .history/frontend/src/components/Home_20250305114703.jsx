import React from "react";

const Home = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div className="w-1/2 flex items-center justify-center bg-gray-200">
        <img
          src="https://source.unsplash.com/600x400/?medicine,health"
          alt="MediTrack"
          className="w-3/4 rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side - Text Content */}
      <div className="w-1/2 flex flex-col justify-center px-12">
        <h1 className="text-5xl font-bold text-blue-600">MediTrack</h1>
        <p className="text-lg text-gray-700 mt-4">
          Stay on top of your medications with our smart reminder system. Never
          miss a dose!
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
