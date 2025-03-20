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
import Medicals from "./components/Medicals";

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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admind" element={<AdminData />} />
        <Route pat
