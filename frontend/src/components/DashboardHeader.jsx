import React from "react";
import Image from "./Image";

const DashboardHeader = ({ user }) => {
  if (!user || Object.keys(user).length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 p-4 sm:p-6 bg-white rounded-lg shadow-md gap-4">
      <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
        <Image pic={user.profilepic} />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Welcome, {user ? user.name : "User"}
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage your appointments and medical records
          </p>
        </div>
      </div>
      <a to="#doc">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full sm:w-auto">
          Book Appointment
        </button>
      </a>
    </div>
  );
};

export default DashboardHeader;