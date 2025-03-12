import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("auth-token")
  );

  // Update login state when auth-token changes
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("auth-token"));
    };

    window.addEventListener("storage", checkAuth); // Listen to changes in localStorage
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Redirect to login if trying to access protected routes without login
  const handleProtectedRoute = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate("/login");
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setIsLoggedIn(false); // Update state
    navigate("/"); // Redirect to home
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
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>

            {isLoggedIn &&
              [
                { path: "/doctors", label: "Doctors" },
                { path: "/remainder", label: "Remainder" },
                { path: "/history", label: "History & Analytics" },
                { path: "/healthy", label: "Healthy Lifestyle" },
                { path: "/prescription", label: "Prescription" },
                { path: "/contribute", label: "Contribute" },
              ].map((item) => (
                <li className="nav-item" key={item.path}>
                  <Link className="nav-link active" to={item.path}>
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>

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
