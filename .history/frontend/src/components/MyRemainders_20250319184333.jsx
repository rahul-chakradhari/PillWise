import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MyRemainders = () => {
  const [email, setEmail] = useState("");
  const [remainders, setRemainders] = useState([]);
  const [allRemainders, setAllRemainders] = useState([]);

  useEffect(() => {
    // 🛠️ LocalStorage se sabhi remainders fetch karo
    const savedRemainders =
      JSON.parse(localStorage.getItem("remainders")) || [];
    setAllRemainders(savedRemainders);
  }, []);

  const handleSearch = () => {
    if (!email) {
      toast.error("⚠️ Please enter an email!");
      return;
    }

    // 🛠️ Filter kar ke sirf us email wale remainder dikhao
    const userRemainders = allRemainders.filter((rem) => rem.email === email);

    if (userRemainders.length === 0) {
      toast.info("🔍 No remainders found for this email!");
    }
    setRemainders(userRemainders);
  };

  const handleDelete = (id) => {
    const updatedRemainders = allRemainders.filter((rem) => rem.id !== id);

    localStorage.setItem("remainders", JSON.stringify(updatedRemainders));
    setAllRemainders(updatedRemainders);

    // ✅ UI se bhi hatao
    const updatedUserRemainders = remainders.filter((rem) => rem.id !== id);
    setRemainders(updatedUserRemainders);

    toast.error("❌ Remainder Deleted!");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Search Remainders by Email</h2>

      {/* ✅ Email Search Input */}
      <div className="input-group mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* ✅ Remainders List */}
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
