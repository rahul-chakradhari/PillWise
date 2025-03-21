import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctors } from "../redux/doctorSlice"; // Thunk action
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

  // Fetching doctors from Redux store
  const { doctors, loading, error } = useSelector((state) => state.doctorKey);
  const dispatch = useDispatch();

  // Redux Thunk se Doctors ko fetch karo
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

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
    setDoctorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        dispatch(fetchDoctors()); // API ke baad list refresh karo
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
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return <AdminDashboard />;

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
                placeholder="Speciality"
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
                placeholder="Experience"
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
              <label className="form-label">Upload Profile Image</label>
              <input
                type="file"
                className="form-control mb-2"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {preview && (
                <div className="mb-3">
                  <img src={preview} alt="Preview" width="150" />
                </div>
              )}
              {wait ? (
                <button className="btn btn-warning">Please wait...</button>
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

  return <>{renderContent()}</>;
};

export default AdminData;
