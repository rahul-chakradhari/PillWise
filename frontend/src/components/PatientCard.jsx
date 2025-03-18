import React from "react";
import useFetchUsers from "../hooks/useFetchAllUsers";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PatientCard() {
  useFetchUsers();

  const navigate = useNavigate();
  const { users } = useSelector((store) => store.allUserKey);
  console.log(users);
  const { user } = useSelector((store) => store.userKey);
  return (
    <div className="overflow-x-auto w-full h-screen">
      <table className="table table-xs w-full">
        <thead>
          <tr>
            <th>index</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Blood Group</th>
            <th>Address</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users
              .filter((item) => item._id !== user._id) // Exclude current user
              .map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.gender}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.bloodGroup}</td>
                  <td>{item.address}</td>
                  <td>{item.isAdmin ? "Admin" : "Patient"}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/prescription/${item._id}`)}
                      className="btn btn-sm btn-success me-2"
                    >
                      add priscription
                    </button>
                    <button
                      onClick={() => removeUserHandler(item._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientCard;
