import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstant";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });
      if (response.data.success) {
        toast.success(response.data?.message);
        localStorage.setItem("auth-token", response.data.token); // Token Store
        window.dispatchEvent(new Event("storage")); // Navbar Update
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-center">Login</h2>
          <h6 className="text-center text-muted">
            <i>* Come after Signing in</i>
            <br />
          </h6>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
        <div className="admin">
          <i>for admin only --></i>

          <Link className="btn btn-primary mx-2" to="/admin">
            Click here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
