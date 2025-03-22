import React from "react";
import useFetchPrescriptions from "../hooks/useFetchPrescriptions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstant";
import { setPrescription } from "../redux/prescriptionSlice";
import { useNavigate } from "react-router-dom";

const PrescriptionEdit = () => {
  useFetchPrescriptions();
  const dispatch = useDispatch();
  const { prescriptions } = useSelector((store) => store.prescriptionKey);
  const navigate = useNavigate();
  const deletePrescription = async (id) => {
    const confirmDelete = window.confirm(
      ` Are you sure you want to delete prescription?`
    );
    if (!confirmDelete) return;
    try {
      const response = await axiosInstance.delete(`/api/prescription/${id}`);
      if (response.data.success) {
        toast.success("Prescription deleted successfully");
        dispatch(setPrescription([...prescriptions]));
      }
    } catch (error) {
      console.error("Error deleting prescription :", error);
      toast.error("An error occurred while deleting the prescription");
    } finally {
      dispatch(setPrescription([...prescriptions]));
    }
  };

  return (
    <div className="w-full flex flex-col   justify-center gap-4 items-center h-screen">
      <div>
        <h2>Current Prescriptions</h2>
      </div>
      <div className="flex  gap-3">
        {prescriptions.map((item, index) => (
          <div key={index} className="card bg-base-100 shadow-sm w-full">
            <figure className="p-3">
              <img
                src={item.prescriptionImage}
                alt="Prescription"
                className="rounded-md w-full h-40 object-cover"
              />
            </figure>
            <div className="card-body flex justify-center items-center">
              <p>
                <span className="font-semibold">Doctor Name:</span>
                {item.doctorId?.name}
              </p>

              <p>
                <span className="font-semibold">Patient Name:</span>{" "}
                {item.userId?.name}
              </p>
              <p>
                <span className="font-semibold">Patient email:</span>{" "}
                {item.userId?.email}
              </p>
              <p>
                <span className="font-semibold">Issued On:</span>{" "}
                {new Date(item.dateIssued).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Notes:</span>{" "}
                {item.notes || "N/A"}
              </p>
              <div className="card-actions justify-end">
                <a
                  href={item.prescriptionImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View Prescription
                </a>
                <button
                  onClick={() => deletePrescription(item._id)}
                  href={item.prescriptionImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-danger"
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrescriptionEdit;
