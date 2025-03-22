import React from "react";
import useFetchPrescriptions from "../hooks/useFetchPrescriptions";
import { useSelector } from "react-redux";

const Prescription = () => {
  useFetchPrescriptions();
  const { user } = useSelector((store) => store.userKey);
  const { prescriptions } = useSelector((store) => store.prescriptionKey);

  const myPrescription = prescriptions.filter(
    (item) => item.userId && item.userId._id === user?._id
  );

  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">My Prescriptions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myPrescription.map((item, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-md rounded-lg hover:shadow-lg transition duration-300"
          >
            <figure className="p-3">
              <img
                src={item.prescriptionImage}
                alt="Prescription"
                className="rounded-md w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </figure>

            <div className="card-body p-4">
              <p>
                <span className="font-semibold">Doctor Name:</span>{" "}
                {item.doctorId?.name}
              </p>
              <p>
                <span className="font-semibold">Patient Name:</span>{" "}
                {item.userId?.name}
              </p>
              <p>
                <span className="font-semibold">Patient Email:</span>{" "}
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

              <div className="card-actions justify-end mt-4">
                <a
                  href={item.prescriptionImage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  View Prescription
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prescription;
