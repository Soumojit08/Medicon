import React from "react";
import { Newspaper } from "lucide-react";

const MedicalRecords = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Medical Records</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Upload New
        </button>
      </div>
      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 text-blue-600 rounded-lg flex items-center justify-center">
                <Newspaper />
              </div>
              <div>
                <h3 className="text-lg font-bold">Blood Test Results</h3>
                <p className="text-gray-600">Uploaded on March 12, 2024</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-md">
                View
              </button>
              <button className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-md">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords;
