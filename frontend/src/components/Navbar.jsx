import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("auth-token")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("auth-token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MediTrack <i className="fa-solid fa-house-medical"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {/* Protected Routes */}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/doctors">
                    Doctors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/remainder">
                    Remainder
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/history">
                    History & Analytics
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/healthy">
                    Healthy Lifestyle
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/prescription">
                    Prescription
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admind">
                    Admin Data
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Login / Logout Buttons */}
          {!isLoggedIn ? (
            <>
              <Link className="btn btn-primary mx-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary mx-2" to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <button className="btn btn-danger mx-2" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
