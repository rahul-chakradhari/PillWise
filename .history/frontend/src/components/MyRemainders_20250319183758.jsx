import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyRemainders = () => {
  const [remainders, setRemainders] = useState([]);
  const navigate = useNavigate();

  // 🛠️ Fetch user data from localStorage (replace this with context if you have it)
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const savedRemainders =
      JSON.parse(localStorage.getItem("remainders")) || [];

    // 🛠️ Sirf logged-in user ke remainders filter karo
    const userRemainders = savedRemainders.filter(
      (rem) => rem.email === user.email
    );

    setRemainders(userRemainders);
  }, [user, navigate]);

  const handleDelete = (id) => {
    const allRemainders = JSON.parse(localStorage.getItem("remainders")) || [];

    // 🛠️ Sirf current user ka remainder delete karo
    const updatedAllRemainders = allRemainders.filter(
      (rem) => !(rem.id === id && rem.email === user.email)
    );

    localStorage.setItem("remainders", JSON.stringify(updatedAllRemainders));

    // UI se bhi remove karo
    const updatedUserRemainders = remainders.filter((rem) => rem.id !== id);
    setRemainders(updatedUserRemainders);

    toast.error("❌ Remainder Deleted!");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">My Remainders</h2>

      {remainders.length === 0 ? (
        <p>No Remainders Found!</p>
      ) : (
        <div className="row">
          {remainders.map((rem) => (
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
