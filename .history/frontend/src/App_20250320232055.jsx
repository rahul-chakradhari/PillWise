import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import History from "./components/History";
import Remainder from "./components/Remainder";
import Doctors from "./components/Doctors";
import MyRemainders from "./components/MyRemainders";
import Prescription from "./components/Prescription";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";

import Admin from "./components/Admin";
import AdminData from "./components/AdminData";

import AppointmentPage from "./components/AppointmentPage";
import PrescriptionForm from "./components/PrticriptionForm";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("auth-token") ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/appointment/:id" element={<AppointmentPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admind" element={<AdminData />} />

        {/* Protected Routes */}
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />

        <Route
          path="/doctors"
          element={
            <PrivateRoute>
              <Doctors />
            </PrivateRoute>
          }
        />
        <Route
          path="/prescription"
          element={
            <PrivateRoute>
              <Prescription />
            </PrivateRoute>
          }
        />
        <Route path="/prescription/:id" element={<PrescriptionForm />} />
        <Route path="*" element={<Home />} />
        <Route path="/my-remainders" element={<MyRemainders />} />
        <Route path="/add-reminder" element={<Remainder />} />
        <Route path="/medicals" element={<Medicals />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
