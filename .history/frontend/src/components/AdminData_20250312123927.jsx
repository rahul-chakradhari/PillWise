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
      <aside className="w-64 bg-gray-800 text-white p-5 flex flex-col space-y-2">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Panel</h2>
        {sections.map((section) => (
          <button
            key={section}
            className={`p-3 rounded-md text-left w-full font-medium transition-all duration-300 focus:outline-none 
              ${
                activeSection === section
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-700"
              }`}
            onClick={() => setActiveSection(section)}
          >
            {section}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center text-2xl font-semibold">
        {activeSection}
      </main>
    </div>
  );
};

export default AdminData;
