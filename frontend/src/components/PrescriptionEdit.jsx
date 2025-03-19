import React from "react";
import useFetchPrescriptions from "../hooks/useFetchPrescriptions";
import { useSelector } from "react-redux";

const PrescriptionEdit = () => {
  useFetchPrescriptions();

  const { prescriptions } = useSelector((store) => store.prescriptionKey);

  return (
    <div className="w-full flex flex-wrap justify-center gap-4 items-center">
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
              <a
                href={item.prescriptionImage}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-danger"
              >
                delete
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrescriptionEdit;
