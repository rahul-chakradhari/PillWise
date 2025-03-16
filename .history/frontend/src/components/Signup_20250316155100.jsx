import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstant from "../utils/axiosInstant";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData); // Debugging log

    try {
      setLoading(true);
      const res = await axiosInstant.post("/api/user/register", formData);
      console.log("Server Response:", res.data); // Debugging log

      if (res.data.success) {
        toast.success(res.data.message);

        // Reset form fields
        setFormData({
          name: "",
          email: "",
          password: "",
          age: "",
          gender: "",
          bloodGroup: "",
          address: "",
          phoneNumber: "",
        });

        // Navigate to login page after success
        setTimeout(() => {
          console.log("Navigating to login..."); // Debugging log
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res.data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup Error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <h6>
          <i>* Only for new Users</i> <br />
          <i>* If already signed in then login</i> <br />
          <i>* Password must be 8 characters long</i> <br />
          <i>* Use a strong password mixed with characters and letters</i>
        </h6>

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Blood Group</label>
          <select
            className="form-select"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone number</label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Must be a 10-digit number"
            required
            pattern="\d{10}"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Now go to Login page..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
