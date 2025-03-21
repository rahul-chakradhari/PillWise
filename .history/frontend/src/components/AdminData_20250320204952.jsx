import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setDoctors, setLoading, setError } from "../redux/doctorSlice";
import Rewards from "./Rewards";
import axiosInstance from "../utils/axiosInstant";
import { toast } from "react-toastify";
import PatientCard from "./PatientCard";
import AppointmentCard from "./AppointmentCard";
import PrescriptionEdit from "./PrescriptionEdit";
import Remainder from "./Remainder";
import AdminDashboard from "./AdminDashboard";

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
  const { doctors, loading, error } = useSelector((state) => state.doctorKey);
  const dispatch = useDispatch();

  // Fetch doctors data
  const fetchDoctors = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const res = await fetch("/api/doctors");
      const data = await res.json();
      dispatch(setDoctors(data));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDoctorData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddDoctorSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(doctorData).forEach((key) => {
      formData.append(key, doctorData[key]);
    });
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      setWait(true);
      const response = await axiosInstance.post("/api/doctor/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
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
      toast.error(err?.response?.data?.message || "Error while adding doctor");
      dispatch(setError("Error while adding doctor"));
    }
  };

  const sections = [
    "Dashboard",
    "Appointments",
    "Patients",
    "Remainder",
    "All Doctors",
    "Add Doctor",
    "Prescription Edit",
    "Pharmacies",
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <AdminDashboard />;
      case "Pharmacies":
        return <h2>Pharmacies Section</h2>;
      case "Appointments":
        return <AppointmentCard />;
      case "All Doctors":
        return <Rewards />;
      case "Patients":
        return <PatientCard />;
      case "Prescription Edit":
        return <PrescriptionEdit />;
      case "Remainder":
        return <Remainder />;
      case "Add Doctor":
        return (
          <div className="text-center">
            <h2>Add New Doctor</h2>
            <form className="mt-3" onSubmit={handleAddDoctorSubmit}>
              {Object.keys(doctorData).map((key) => (
                <input
                  key={key}
                  type={key === "phone" || key === "fees" ? "number" : "text"}
                  name={key}
                  value={doctorData[key]}
                  className="form-control mb-2"
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  onChange={handleInputChange}
                  required
                />
              ))}
              <label className="form-label">Upload Profile Image</label>
              <input
                type="file"
                className="form-control mb-2"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid rounded"
                  width="150"
                />
              )}
              <button className="btn btn-success" disabled={wait}>
                {wait ? "Please wait..." : "Add Doctor"}
              </button>
            </form>
          </div>
        );
      default:
        return <h2>Welcome to Admin Panel</h2>;
    }
  };

  return (
    <div className="d-flex vh-100 mt-3">
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
      <main className="flex-grow-1 d-flex justify-content-center align-items-center fs-4 fw-semibold">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminData;
