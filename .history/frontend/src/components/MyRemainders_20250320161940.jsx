import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyRemainders = () => {
  const [userRemainders, setUserRemainders] = useState();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const allRemainders =
      JSON.parse(localStorage.getItem("allRemainders")) ||;

    // ✅ Filter remainders based on logged-in user's email
    const currentUserRemainders = allRemainders.filter(
      (rem) => rem.email === loggedInUser?.email
    );

    setUserRemainders(currentUserRemainders);
  }, [loggedInUser]);

  const handleDelete = (id) => {
    const allRemainders =
      JSON.parse(localStorage.getItem("allRemainders")) ||;

    // ✅ Filter out the remainder to be deleted
    const updatedRemainders = allRemainders.filter((rem) => rem.id !== id);

    localStorage.setItem("allRemainders", JSON.stringify(updatedRemainders));

    // ✅ Update the state to reflect the deletion
    const filteredRemainders = userRemainders.filter((rem) => rem.id !== id);
    setUserRemainders(filteredRemainders);

    toast.error("❌ Remainder Deleted!");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">My Remainders</h2>
      {userRemainders.length === 0 ? (
        <p className="text-center">No remainders found.</p>
      ) : (
        <ul className="list-group">
          {userRemainders.map((rem) => (
            <li key={rem.id} className="list-group-item">
              <strong>{rem.message}</strong> - {new Date(rem.date).toLocaleString()}
              <button
                onClick={() => handleDelete(rem.id)}
                className="btn btn-danger btn-sm float-end"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRemainders;