import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDoctors, setLoading, setError } from "../redux/doctorSlice"; // Redux actions
import axios from "axios"; // For making HTTP requests
import Rewards from "./Rewards"; // Rewards Component
import axiosInstance from "../utils/axiosInstant";
import { toast } from "react-toastify";
import PatientCard from "./PatientCard";

const AdminData = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [doctorData, setDoctorData] = useState({
    name: "",
    speciality: "",
    phone: "",
    email: "",
    address: "",
    experience: "",
    fees: "",
  });

  const [wait, setWait] = useState(false);

  // Fetching doctors from Redux store
  const { doctors, loading, error } = useSelector((state) => state.doctorKey);
  const dispatch = useDispatch();

  // Fetch doctors on component mount
  useEffect(() => {
    dispatch(setLoading(true));
    fetch("/api/doctors") // Replace with actual API endpoint
      .then((res) => res.json())
      .then((data) => dispatch(setDoctors(data)))
      .catch((err) => dispatch(setError(err.message)))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Input Changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Add Doctor Form Submission
  const handleAddDoctorSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", doctorData.name);
    formData.append("speciality", doctorData.speciality);
    formData.append("phone", doctorData.phone);
    formData.append("email", doctorData.email);
    formData.append("address", doctorData.address);
    formData.append("experience", doctorData.experience);
    formData.append("fees", doctorData.fees);

    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      setWait(true);
      const response = await axiosInstance.post("/api/doctor/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setDoctors(response.data.doctors));
        setDoctorData({
          name: "",
          speciality: "",
          phone: "",
          email: "",
          address: "",
          experience: "",
          fees: "",
        });
        setProfileImage(null);
        setPreview(null);
        setWait(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
      dispatch(setError("Error while adding doctor"));
    }
  };

  // Define Sidebar Sections
  const sections = [
    "Dashboard",
    "Appointments",
    "Patients",
    "Remainder",
    "All Doctors",
    "Add Doctor",
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <h2>Welcome to Admin Dashboard</h2>;

      case "Appointments":
        return <h2>Appointment Data (Backend Integration Needed)</h2>;

      case "Remainder":
        return <h2>Task Reminders - To Be Implemented</h2>;

      case "All Doctors":
        return <Rewards />;

      case "Patients":
        return <PatientCard />;

      case "Add Doctor":
        return (
          <div className="text-center">
            <h2>Add New Doctor</h2>
            <form className="mt-3" onSubmit={handleAddDoctorSubmit}>
              <input
                type="text"
                name="name"
                value={doctorData.name}
                className="form-control mb-2"
                placeholder="Doctor Name"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="speciality"
                value={doctorData.speciality}
                className="form-control mb-2"
                placeholder="speciality"
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="phone"
                value={doctorData.phone}
                className="form-control mb-2"
                placeholder="Phone"
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                value={doctorData.email}
                className="form-control mb-2"
                placeholder="Email"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="address"
                value={doctorData.address}
                className="form-control mb-2"
                placeholder="Address"
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="experience"
                value={doctorData.experience}
                className="form-control mb-2"
                placeholder="Experience (in years)"
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="fees"
                value={doctorData.fees}
                className="form-control mb-2"
                placeholder="Consultation Fees"
                onChange={handleInputChange}
                required
              />

              {/* Profile Image Upload */}
              <label className="form-label">Upload Profile Image</label>
              <input
                type="file"
                className="form-control mb-2"
                accept="image/*"
                onChange={handleImageChange}
                required
              />

              {/* Preview Image */}
              {preview && (
                <div className="mb-3">
                  <img
                    src={preview}
                    alt="Profile Preview"
                    className="img-fluid rounded"
                    width="150"
                  />
                </div>
              )}
              {wait ? (
                <button className="btn btn-warning">please wait...</button>
              ) : (
                <button className="btn btn-success">Add Doctor</button>
              )}
            </form>
          </div>
        );

      default:
        return <h2>Welcome to Admin Panel</h2>;
    }
  };

  return (
    <div className="d-flex vh-100 mt-3">
      {/* Sidebar */}
      <aside
        className="bg-dark text-white p-4 d-flex flex-column"
        style={{ width: "250px" }}
      >
        <h2 className="text-center mb-4">Admin Panel</h2>
        {sections.map((section) => (
          <button
            key={section}
            type="button"
            className={`btn mb-2 ${
              activeSection === section
                ? "btn-light text-dark fw-bold"
                : "btn-success text-white"
            }`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-center fs-4 fw-semibold">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminData;
