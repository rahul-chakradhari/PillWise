import React, { useState } from "react";
import DoctorDetails from "./DoctorDetails";
import AppointmentForm from "./AppointmentForm";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Main AppointmentPage component
const AppointmentPage = () => {
  const { id } = useParams();

  return (
    <div className="flex justify-between space-x-4 p-4">
      <div className="w-1/2">
        <DoctorDetails id={id} />
      </div>
      <div className="w-1/2">
        <AppointmentForm id={id} />
      </div>
    </div>
  );
};

export default AppointmentPage;
