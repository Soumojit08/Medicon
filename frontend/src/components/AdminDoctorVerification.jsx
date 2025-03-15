// src/components/AdminDoctorVerification.jsx
import React, { useState } from "react";

const AdminDoctorVerification = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. John Doe",
      specialization: "Cardiology",
      status: "Pending",
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialization: "Dermatology",
      status: "Pending",
    },
  ]);

  const handleVerify = (id) => {
    setDoctors((prev) =>
      prev.map((doctor) =>
        doctor.id === id ? { ...doctor, status: "Verified" } : doctor
      )
    );
    alert(`Doctor ${id} verified successfully!`);
  };

  const handleReject = (id) => {
    setDoctors((prev) => prev.filter((doctor) => doctor.id !== id));
    alert(`Doctor ${id} rejected.`);
  };

  return (
    <div className="space-y-4">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <h3 className="text-lg font-bold">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.specialization}</p>
            <p
              className={`text-sm ${
                doctor.status === "Pending"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {doctor.status}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleVerify(doctor.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Verify
            </button>
            <button
              onClick={() => handleReject(doctor.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminDoctorVerification;
