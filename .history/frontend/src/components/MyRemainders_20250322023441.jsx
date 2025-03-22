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
      <div>
        <div
          style={{
            padding: "0",
            margin: "0",
            position: "relative",
            top: "0",
            left: "0",
          }}
        ></div>

        <h2>future implementation</h2>
      </div>
    </div>
  );
};

export default MyRemainders;
