import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyRemainders = () => {
  const [userRemainders, setUserRemainders] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const allRemainders =
      JSON.parse(localStorage.getItem("allRemainders")) || [];

    // ✅ Sirf logged-in user ke remainders filter karo
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
    <div className="container mt-5">
      <h2 className="text-center">My Remainders</h2>

      {userRemainders.length === 0 ? (
        <p>No Remainders Found!</p>
      ) : (
        <div className="row">
          {userRemainders.map((rem) => (
            <div key={rem.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5>{rem.title}</h5>
                  <p>
                    {rem.date} - {rem.time}
                  </p>
                  <p>{rem.message}</p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(rem.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRemainders;
