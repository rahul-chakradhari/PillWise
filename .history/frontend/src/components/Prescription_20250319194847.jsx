import React from "react";
import useFetchPrescriptions from "../hooks/useFetchPrescriptions";
import { useSelector } from "react-redux";
import { store } from "../redux/store";

const Prescription = () => {
  useFetchPrescriptions();
  const { user } = useSelector((store) => store.userKey);
  const { prescriptions } = useSelector((store) => store.prescriptionKey);

  const myPrescription = prescriptions.filter(
    (item) => item.userId._id === user._id
  );

  console.log(myPrescription);

  return (
    <div className="w-full flex flex-wrap justify-center gap-4 flex-col items-center">
      <h2>future implementation</h2>
      {myPrescription.map((item, index) => (
        <div key={index} className="card bg-base-100 shadow-sm w-full">
          <figure className="p-3">
            <img
              src={item.prescriptionImage}
              alt="Prescription"
              className="rounded-md w-full h-40 object-cover  hover:scale-200 "
            />
          </figure>
          <div className="card-body flex justify-center items-center">
            <p>
              <span className="font-semibold">Doctor Name:</span>{" "}
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
  );
};

export default Prescription;
