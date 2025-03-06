import "./App.css";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import History from "./components/History";
import Remainder from "./components/Remainder";
import Doctors from "./components/Doctors";
import Healthy from "./components/Healthy";
import Prescription from "./components/Prescription";
import Login from "./components/Login";
function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/remainder" element={<Remainder />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/healthy" element={<Healthy />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
