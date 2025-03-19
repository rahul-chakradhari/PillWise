import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstant";
import { setUser } from "../redux/userSlice";

// Import FontAwesome
import "@fortawesome/fontawesome-free/css/all.min.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.userKey);

  useEffect(() => {
    // Ensure correct state sync with Redux
  }, [user]);

  // Logout Function
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/api/user/logout");
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        localStorage.removeItem("auth-token");
        dispatch(setUser(null));
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          MediTrack <i className="fas fa-house-medical"></i>{" "}
          {/* FontAwesome icon */}
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-home"></i> Home
              </Link>
            </li>

            {/* Protected Routes */}
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/doctors">
                    <i className="fas fa-user-md"></i> Doctors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/remainder">
                    <i className="fas fa-bell"></i> Remainder
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/history">
                    <i className="fas fa-history"></i> History
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/prescription">
                    <i className="fas fa-file-prescription"></i> Prescription
                  </Link>
                </li>

                {/* Admin Route */}
                {user?.isAdmin && (
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white fw-bold px-3 rounded"
                      to="/admind"
                      style={{ backgroundColor: "green" }}
                    >
                      <i className="fas fa-user-shield"></i> Admin Data
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>

          {/* Login / Logout Buttons */}
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-danger mx-2 font-bold"
            >
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          ) : (
            <>
              <Link className="btn btn-primary mx-2" to="/login">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
              <Link className="btn btn-success mx-2" to="/signup">
                <i className="fas fa-user-plus"></i> Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
