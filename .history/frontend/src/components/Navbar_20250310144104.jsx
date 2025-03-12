import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedin = localStorage.getItem("auth-token");

  // Redirect to login if not logged in
  const handleProtectedRoute = (e, path) => {
    if (!isLoggedin) {
      e.preventDefault(); // Prevent navigation
      navigate("/login"); // Redirect to login
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/"); // Redirect to home after logout
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
              {/* Home page is always accessible */}
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>

              {/* Other pages should redirect to login if not logged in */}
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/doctors"
                  onClick={(e) => handleProtectedRoute(e, "/doctors")}
                >
                  Doctors
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/remainder"
                  onClick={(e) => handleProtectedRoute(e, "/remainder")}
                >
                  Remainder
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/history"
                  onClick={(e) => handleProtectedRoute(e, "/history")}
                >
                  History & Analytics
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/healthy"
                  onClick={(e) => handleProtectedRoute(e, "/healthy")}
                >
                  Healthy Lifestyle
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/prescription"
                  onClick={(e) => handleProtectedRoute(e, "/prescription")}
                >
                  Prescription
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/contribute"
                  onClick={(e) => handleProtectedRoute(e, "/contribute")}
                >
                  Contribute
                </Link>
              </li>
            </ul>

            {/* Login/Signup if not logged in, Logout if logged in */}
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
