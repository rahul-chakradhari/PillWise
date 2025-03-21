import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RemainderPanel = () => {
  const [remainders, setRemainders] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");

  // Load remainders from local storage
  useEffect(() => {
    const savedRemainders =
      JSON.parse(localStorage.getItem("remainders")) || [];
    setRemainders(savedRemainders);
  }, []);

  // Save remainders to local storage
  const saveToLocalStorage = (newRemainders) => {
    localStorage.setItem("remainders", JSON.stringify(newRemainders));
  };

  // Add Remainder
  const handleAddRemainder = () => {
    if (!email || !message || !date) {
      toast.error("Sab fields bharna zaruri hai!");
      return;
    }

    const newRemainder = {
      id: Date.now(),
      email,
      message,
      date,
    };

    const updatedRemainders = [...remainders, newRemainder];
    setRemainders(updatedRemainders);
    saveToLocalStorage(updatedRemainders);

    toast.success("Remainder Add Ho Gaya!");
    setEmail("");
    setMessage("");
    setDate("");
  };

  // Check Remainder Time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      remainders.forEach((rem) => {
        const reminderTime = new Date(rem.date);
        if (reminderTime <= now) {
          toast.info(`📩 Remainder: ${rem.message} for ${rem.email}`);
        }
      });
    }, 60 * 1000); // Check every 1 minute

    return () => clearInterval(interval);
  }, [remainders]);

  // Delete Remainder
  const handleDelete = (id) => {
    const filteredRemainders = remainders.filter((rem) => rem.id !== id);
    setRemainders(filteredRemainders);
    saveToLocalStorage(filteredRemainders);
    toast.error("Remainder Delete Ho Gaya!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 Remainder Panel</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button onClick={handleAddRemainder}>Add</button>
      </div>

      <div>
        {remainders.length === 0 ? (
          <p>No Remainders Added</p>
        ) : (
          <ul>
            {remainders.map((rem) => (
              <li key={rem.id} style={{ marginBottom: "10px" }}>
                <strong>{rem.email}</strong> - {rem.message} <br />⏰{" "}
                {new Date(rem.date).toLocaleString()}
                <button
                  onClick={() => handleDelete(rem.id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  ❌ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RemainderPanel;
