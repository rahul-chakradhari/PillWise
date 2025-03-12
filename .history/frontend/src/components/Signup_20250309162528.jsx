import React, { useState } from "react";

import axiosInstant from "../utils/axiosInstant";
import { toast } from "react-toastify";

const Signup = () => {
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosInstant.post("/api/user/register", formData);

      if (res.data.success) {
        toast.success(res.data.message);

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

        setTimeout(() => {
          navigate("/login"); // Navigate to login page after 2 seconds
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="signup">
      <button onClick={() => toast.success("hello")}>hello</button>
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
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-select form-select-sm"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select form-select-sm"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Transgender">Transgender</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Blood Group</label>
          <select
            className="form-select form-select-sm"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
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
          />
        </div>
        {loading ? (
          <button type="submit" className="btn btn-primary">
            plese wait ....
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default Signup;
