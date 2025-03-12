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
      <div className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <ul>
          {sections.map((section) => (
            <li
              key={section}
              className={`p-2 cursor-pointer rounded-lg hover:bg-gray-600 ${
                activeSection === section ? "bg-gray-600" : ""
              }`}
              onClick={() => setActiveSection(section)}
            >
              {section}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold">{activeSection}</h1>
        <p className="mt-4">Content for {activeSection} section.</p>
      </div>
    </div>
  );
};

export default AdminData;
