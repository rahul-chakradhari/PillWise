import React, { useState } from "react";

const AdminData = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const sections = [
    "Dashboard",
    "All Doctors",
    "Modify Doctors",
    "User Details",
    "Reminder",
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5 flex flex-col space-y-4">
        <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
        {sections.map((section) => (
          <button
            key={section}
            className={`p-2 rounded-md text-left transition-all duration-300 w-full ${
              activeSection === section ? "bg-blue-500" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center text-2xl font-semibold">
        {activeSection}
      </div>
    </div>
  );
};

export default AdminData;
