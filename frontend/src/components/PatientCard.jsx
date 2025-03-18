import React from "react";
import useFetchUsers from "../hooks/useFetchAllUsers";
import { useSelector } from "react-redux";

function PatientCard() {
  useFetchUsers();
  const { users } = useSelector((store) => store.allUserKey);
  console.log(users);
  const { user } = useSelector((store) => store.userKey);
  return (
    <div className="w-full">
      {users &&
        users
          .filter((item) => item._id !== user._id)
          .map((item, index) => {
            return (
              <div className="w-full">
                <ul className="rounded-box shadow-md" key={index}>
                  <li className="flex items-center justify-between gap-4 p-4">
                    <div>
                      <div className="text-sm ">
                        <div>Age: {item.age}</div>
                        <div>Gender: {item.gender}</div>
                        <div>Email: {item.email}</div>
                        <div>Phone: {item.phoneNumber}</div>
                        <div>Blood Group: {item.bloodGroup}</div>
                        <div>
                          Address: <span> {item.address}</span>{" "}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <img
                          className="size-10 rounded-box"
                          src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
                          alt="Profile"
                        />
                      </div>
                      <div>
                        <div>{item.name}</div>
                        <div className="text-xs uppercase font-semibold opacity-60">
                          {item.isAdmin ? "Admin" : "Patient"}
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
    </div>
  );
}

export default PatientCard;
