// src/components/PendingRequests.jsx
import React from "react";

const PendingRequests = () => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-xl font-bold">Pending Requests</h2>
        <div className="flex flex-wrap gap-2 sm:space-x-2">
          <button className="bg-blue-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base">
            All
          </button>
          <button className="bg-white border border-blue-500 text-blue-500 px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base">
            Sent
          </button>
          <button className="bg-white border border-blue-500 text-blue-500 px-3 py-1 sm:px-4 sm:py-2 rounded-md text-sm sm:text-base">
            Received
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="bg-zinc-100 p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex justify-between items-start flex-col">
            <div>
              <span className="bg-yellow-200 text-orange-400 px-2 py-1 rounded-full text-xs sm:text-sm">
                Pending
              </span>
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                March 15, 2024
              </p>
            </div>
            <h3 className="text-base sm:text-lg font-bold mt-2">
              Appointment Request with Dr. Smith
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              General checkup and consultation for recurring headaches
            </p>
          </div>
          <div className="flex w-full sm:w-auto justify-center sm:justify-start py-8">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto">
                Accept
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto">
                Decline
              </button>
              <button className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-md text-sm sm:text-base w-full sm:w-auto">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingRequests;