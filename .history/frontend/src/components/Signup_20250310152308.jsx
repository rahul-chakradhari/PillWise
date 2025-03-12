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
          navigate("/login");
        }, 2000);
      } else {
        toast.error(res.data.message || "Signup failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ width: "400px", marginTop: "20px" }}
      >
        <h2 className="text-center">Signup</h2>
        <h6 className="text-center text-muted">
          <i>* Only for new Users</i> <br />
          <i>* If already signed in then login</i> <br />
          <i>* Password must be 8 characters long</i> <br />
          <i>* Use a strong password mixed with characters and letters</i>
        </h6>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Name", type: "text", name: "name" },
            { label: "Email address", type: "email", name: "email" },
            {
              label: "Password",
              type: "password",
              name: "password",
              minLength: "8",
            },
            { label: "Age", type: "number", name: "age" },
            { label: "Address", type: "text", name: "address" },
            {
              label: "Phone number",
              type: "text",
              name: "phoneNumber",
              placeholder: "Must be a 10-digit number",
              pattern: "\\d{10}",
            },
          ].map((field, index) => (
            <div className="mb-3" key={index}>
              <label className="form-label">{field.label}</label>
              <input
                type={field.type}
                className="form-control"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                {...(field.minLength && { minLength: field.minLength })}
                {...(field.placeholder && { placeholder: field.placeholder })}
                {...(field.pattern && { pattern: field.pattern })}
              />
            </div>
          ))}

          {[
            {
              label: "Gender",
              name: "gender",
              options: ["Select", "Male", "Female", "Transgender"],
            },
            {
              label: "Blood Group",
              name: "bloodGroup",
              options: [
                "Select",
                "A+",
                "A-",
                "B+",
                "B-",
                "O+",
                "O-",
                "AB+",
                "AB-",
              ],
            },
          ].map((field, index) => (
            <div className="mb-3" key={index}>
              <label className="form-label">{field.label}</label>
              <select
                className="form-select"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
              >
                {field.options.map((option, idx) => (
                  <option key={idx} value={option === "Select" ? "" : option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
