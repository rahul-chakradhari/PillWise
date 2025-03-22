import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyRemainders = () => {
  const [userRemainders, setUserRemainders] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const allRemainders =
      JSON.parse(localStorage.getItem("allRemainders")) || [];

    const currentUserRemainders = allRemainders.find(
      (rem) => rem.email === loggedInUser?.email
    );

    setUserRemainders(currentUserRemainders?.remainder || []);
  }, [loggedInUser]);

  const handleDelete = (id) => {
    const allRemainders =
      JSON.parse(localStorage.getItem("allRemainders")) || [];

    const updatedRemainders = allRemainders.map((user) => {
      if (user.email === loggedInUser?.email) {
        return {
          ...user,
          remainder: user.remainder.filter((rem) => rem.id !== id),
        };
      }
      return user;
    });

    localStorage.setItem("allRemainders", JSON.stringify(updatedRemainders));

    const filteredRemainders = userRemainders.filter((rem) => rem.id !== id);
    setUserRemainders(filteredRemainders);

    toast.error("❌ Remainder Deleted!");
  };

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-5">My Remainders</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userRemainders.map((rem) => (
          <div key={rem.id} className="card bg-base-100 shadow-md rounded-lg">
            <div className="card-body">
              <h3 className="text-xl font-semibold">{rem.title}</h3>
              <p>{rem.description}</p>
              <div className="card-actions justify-between mt-4">
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(rem.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {userRemainders.length === 0 && (
        <div className="text-center text-gray-500 mt-5">
          No remainders found.
        </div>
      )}
    </div>
  );
};

export default MyRemainders;
