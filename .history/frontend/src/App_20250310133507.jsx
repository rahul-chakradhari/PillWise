import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import History from "./components/History";
import Remainder from "./components/Remainder";
import Doctors from "./components/Doctors";
import Healthy from "./components/Healthy";
import Prescription from "./components/Prescription";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    setIsLoggedIn(!!localStorage.getItem("auth-token"));
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="app">
      {/* Navbar will receive login state and logout function */}
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/remainder" element={<Remainder />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/healthy" element={<Healthy />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
