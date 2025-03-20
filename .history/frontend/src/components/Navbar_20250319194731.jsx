import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import dispatch and useSelector
import { Link, useNavigate } from "react-router-dom";
// Assuming you have a setUser action to update the user state
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstant";
import { setUser } from "../redux/userSlice";

const Navbar = () => {
  const dispatch = useDispatch(); // Get dispatch function
  const navigate = useNavigate();

  const { user } = useSelector((store) => store.userKey); // Access user from redux store
  const [isLoggedIn, setIsLoggedIn] = useState(!!user); // Check login state from user in redux
  //const { user } = useSelector((store) => store.userKey);

  useEffect(() => {
    // If user is logged in, check if auth-token exists
    if (user) {
      setIsLoggedIn(true);
    }
  }, [user]);

  // Logout Function
  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/api/user/logout");
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        localStorage.removeItem("auth-token"); // Clear token from localStorage
        dispatch(setUser(null)); // Clear user from redux store
        setIsLoggedIn(false); // Update local state
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand p-3" to="/">
          MediTrack<i className="fa-solid fa-house-medical"></i>
        </Link>

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
                    My remainders
                  </Link>
                </li>

                {user?.isAdmin === true && (
                  <li className="nav-item">
                    <Link
                      className="nav-link text-dark fw-bold px-3 rounded"
                      to="/admind"
                      style={{ backgroundColor: "green" }}
                    >
                      Admin Data
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
              className="btn btn-danger mx-2  font-bold"
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
