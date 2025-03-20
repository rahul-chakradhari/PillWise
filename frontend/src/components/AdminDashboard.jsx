import React from "react";
import { useSelector } from "react-redux";

function AdminDashboard() {
  const appointments = useSelector(
    (state) => state.appointmentKey.appointments
  );
  const users = useSelector((state) => state.userKey.user);
  const doctors = useSelector((state) => state.doctorKey.doctors);

  return (
    <div className="w-[80%] h-screen flex flex-col  ">
      <div className="stats shadow">
        {/* Total Users */}
        <div className="stat">
          <div className="stat-figure text-primary"></div>

          <p>Total User</p>
          <div className="stat-value text-primary">{users?.length || 0}</div>
        </div>

        {/* Total Appointments */}
        <div className="stat">
          <p>Total Appointments</p>
          <div className="stat-value text-secondary">
            {appointments?.length || 0}
          </div>
        </div>

        {/* Total Doctors */}
        <div className="stat flex flex-col items-center justify-center">
          <div className="stat-figure text-accent"></div>
          <div>Total Doctors</div>
          <div className="stat-value">{doctors?.length || 0}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
