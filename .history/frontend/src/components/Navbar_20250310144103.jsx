import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("auth-token");

  // Redirect to login if not logged in
  const handleProtectedRoute = (e) => {
    if (!isLoggedIn) {
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

            {/* Protected pages */}
            {[
              { path: "/doctors", label: "Doctors" },
              { path: "/remainder", label: "Remainder" },
              { path: "/history", label: "History & Analytics" },
              { path: "/healthy", label: "Healthy Lifestyle" },
              { path: "/prescription", label: "Prescription" },
              { path: "/contribute", label: "Contribute" },
            ].map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  className="nav-link active"
                  to={item.path}
                  onClick={!isLoggedIn ? handleProtectedRoute : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          {isLoggedIn ? (
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
  );
};

export default Navbar;
