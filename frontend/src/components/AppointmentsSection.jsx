// src/components/AppointmentsSection.jsx
import React from "react";
import Image from "./Image";
import RejectedStatus from "./RejectedStatus";
import ConfirmStatus from "./ConfirmedStatus";
import UpcomingStatus from "./UpcomingStatus";

const AppointmentsSection = () => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-bold">Your Appointments</h2>
        <button className="bg-white border border-blue-500 text-blue-500 px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base w-full sm:w-auto">
          View All
        </button>
      </div>
      <div className="space-y-4">
        <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Image />
              <div>
                <h3 className="text-base sm:text-lg font-bold">
                  Dr. Michael Brown
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Pediatrician
                </p>
                <p className="text-gray-600 text-sm sm:text-base">
                  March 20, 2024 at 10:30 AM
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-start sm:justify-end">
              <ConfirmStatus />
              <button className="bg-yellow-200 text-orange-600 px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base flex-1 sm:flex-none">
                Reschedule
              </button>
              <button className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base flex-1 sm:flex-none">
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