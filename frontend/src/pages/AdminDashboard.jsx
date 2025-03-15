// src/pages/AdminDashboard.jsx
import React from "react";
import AdminDoctorVerification from "../components/AdminDoctorVerification";
import AdminAppointmentRequests from "../components/AdminAppointmentRequests";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-500 mb-6">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Doctor Verification Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-500 mb-4">
              Doctor Verification
            </h2>
            <AdminDoctorVerification />
          </div>

          {/* Appointment Requests Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-blue-500 mb-4">
              Appointment Requests
            </h2>
            <AdminAppointmentRequests />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
