// src/components/AdminDoctorVerification.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../libs/axios";
import toast from "react-hot-toast";

const AdminDoctorVerification = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUnverifiedDoctors();
  }, []);

  const fetchUnverifiedDoctors = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/doctors", {
        params: { isVerified: false },
      });
      setDoctors(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching unverified doctors:", error);
      setError("Failed to fetch unverified doctors");
      setLoading(false);
    }
  };

  const handleVerify = async (doctorId) => {
    try {
      const response = await axiosInstance.post("/api/v1/verifyDoctor", {
        doctorId,
        isVerified: true,
      });

      if (response.status === 200) {
        // Remove the verified doctor from the list
        setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
        toast.success("Doctor verified successfully!");
      }
    } catch (error) {
      console.error("Error verifying doctor:", error);
      toast.error("Failed to verify doctor");
    }
  };

  const handleReject = async (doctorId) => {
    try {
      const response = await axiosInstance.post("/api/v1/verifyDoctor", {
        doctorId,
        isVerified: false,
      });

      if (response.status === 200) {
        // Remove the rejected doctor from the list
        setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
        alert("Doctor rejected successfully!");
      }
    } catch (error) {
      console.error("Error rejecting doctor:", error);
      alert("Failed to reject doctor");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {doctors.length === 0 ? (
        <p className="text-gray-500">No unverified doctors found.</p>
      ) : (
        doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="text-lg font-bold">{doctor.name}</h3>
              <p className="text-sm text-gray-600">
                {doctor.specialization.join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                Registration ID: {doctor.registrationId}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleVerify(doctor._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Verify
              </button>
              <button
                onClick={() => handleReject(doctor._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDoctorVerification;
