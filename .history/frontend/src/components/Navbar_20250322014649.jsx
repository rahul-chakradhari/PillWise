import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstant";
import { setUser } from "../redux/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.userKey);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  useEffect(() => {
    // Update login state when user changes
    setIsLoggedIn(!!user);
  }, [user]);

  // ✅ Logout Function - Fixed double toast issue
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/api/user/logout");

      if (response?.data?.success) {
        toast.success(response?.data?.message);

        // Clear local storage and Redux store
        localStorage.removeItem("auth-token");
        dispatch(setUser(null)); // Only one dispatch
        setIsLoggedIn(false);

        // Redirect to login page
        navigate("/login");
      } else {
        toast.error("Logout failed");

        dispatch(setUser(null));
        setIsLoggedIn(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand p-3" to="/">
          MediTrack <i className="fa-solid fa-house-medical"></i>
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/medicals">
                Medicals
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
                  <Link className="nav-link" to="/history">
                    History
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/prescription">
                    Prescription
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/my-remainders">
                    My Remainders
                  </Link>
                </li>

                {user?.isAdmin && (
                  <li className="nav-item">
                    <Link
                      className="nav-link text-dark fw-bold px-3 rounded"
                      to="/admind"
                      style={{ backgroundColor: "green" }}
                    >
                      Admin Panel
                    </Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/medicals">
                    Medicals
                  </Link>
                </li>
                )}
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
            <button
              onClick={handleLogout}
              className="btn btn-danger mx-2 font-bold"
            >
              Logout Now
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
