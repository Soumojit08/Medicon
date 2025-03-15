import React from "react";
import Image from "./Image";

const DashboardHeader = ({ user }) => {
  return (
    <div className="flex justify-between items-center mb-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center gap-4">
        <Image />
        <div>
          <h1 className="text-2xl font-bold">
            Welcome, {user ? user.name : "User"}
          </h1>
          <p className="text-gray-600">
            Manage your appointments and medical records
          </p>
        </div>
      </div>
      <a href="#doc">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          Book Appointment
        </button>
      </a>
    </div>
  );
};

export default DashboardHeader;
