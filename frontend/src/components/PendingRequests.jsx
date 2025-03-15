// src/components/PendingRequests.jsx
import React from "react";

const PendingRequests = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Pending Requests</h2>
        <div className="flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            All
          </button>
          <button className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-md">
            Sent
          </button>
          <button className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-md">
            Received
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="bg-zinc-100 p-4 rounded-lg flex justify-between">
          <div className="flex justify-between items-start flex-col">
            <div>
              <span className="bg-yellow-200 text-orange-400 px-2 py-1 rounded-full text-sm">
                Pending
              </span>
              <p className="text-gray-600 text-sm">March 15, 2024</p>
            </div>
            <h3 className="text-lg font-bold">
              Appointment Request with Dr. Smith
            </h3>
            <p className="text-gray-600">
              General checkup and consultation for recurring headaches
            </p>
          </div>
          <div className="flex space-x-2 mt-4">
            <div className="flex items-center justify-evenly gap-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Accept
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                Decline
              </button>
              <button className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-md">
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
