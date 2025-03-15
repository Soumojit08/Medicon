// src/components/AppointmentsSection.jsx
import React from "react";
import Image from "./Image";
import RejectedStatus from "./RejectedStatus";
import ConfirmStatus from "./ConfirmedStatus";
import UpcomingStatus from "./UpcomingStatus";

const AppointmentsSection = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Appointments</h2>
        <button className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-md">
          View All
        </button>
      </div>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image />
              <div>
                <h3 className="text-lg font-bold">Dr. Michael Brown</h3>
                <p className="text-gray-600">Pediatrician</p>
                <p className="text-gray-600">March 20, 2024 at 10:30 AM</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {/* <UpcomingStatus /> */}
              {/* <RejectedStatus /> */}
              <ConfirmStatus />
              <button className="bg-yellow-200 text-orange-600 px-4 py-2 rounded-md">
                Reschedule
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsSection;
