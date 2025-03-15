// src/components/DoctorProfileHeader.jsx
import React from "react";
import Image from "./Image";
import QuickStats from "../components/QuickStats";

const DoctorProfileHeader = ({ doctor }) => {
  return (
    <div className="flex flex-col items-start gap-4 mb-6 shadow-md rounded-lg p-6">
      <div className="flex  items-center gap-4">
        <Image />
        <div>
          <h2 className="text-xl font-bold text-blue-500">{doctor.name}</h2>
          <p className="text-gray-600 text-sm">
            {doctor.specialization.join(", ")}
          </p>
        </div>
      </div>
      <QuickStats />
    </div>
  );
};

export default DoctorProfileHeader;
