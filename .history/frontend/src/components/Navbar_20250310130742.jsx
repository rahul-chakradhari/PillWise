import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("auth-token");

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/"); // Redirect to Home after logout
  };

  return (
    <div>
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
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>

              {/* Agar logged in hai to sare features dikhao */}
              {isLoggedin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/doctors">
                      Doctors
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/remainder">
                      Remainder
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/history">
                      History & Analytics
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/healthy">
                      Healthy Lifestyle
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/prescription">
                      Prescription
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/contribute">
                      Contribute
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {/* Agar logged in hai to Logout button dikhao */}
            {isLoggedin ? (
              <button className="btn btn-danger mx-2" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary mx-2">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary mx-2">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
