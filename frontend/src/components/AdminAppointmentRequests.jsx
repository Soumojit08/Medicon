// src/components/AdminAppointmentRequests.jsx
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../libs/axios";

const AdminAppointmentRequests = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const admintoken = localStorage.getItem("admintoken");

  useEffect(() => {
    if (admintoken) {
      fetchAppointments();
    }
  }, [admintoken]);

  const handleApprove = (id) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Approved" }
          : appointment
      )
    );
    alert(`Appointment ${id} approved!`);
  };

  const handleReject = (id) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== id)
    );
    alert(`Appointment ${id} rejected.`);
  };

  const handleWaiting = (id) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Waiting" }
          : appointment
      )
    );
    alert(`Appointment ${id} marked as waiting.`);
  };

  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/get-all-appointments", {
        headers: {
          Authorization: `Bearer ${admintoken}`,
        },
      });
      console.log(response.data);
      setAppointments(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment._id}
          className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
        >
          <div>
            <h3 className="text-lg font-bold">{appointment.patientName}</h3>
            <p className="text-sm text-gray-600">
              Doctor: {appointment.doctorName}
            </p>
            <p className="text-sm text-gray-600">
              {appointment.date} at {appointment.time}
            </p>
            <p
              className={`text-sm ${
                appointment.status === "Pending"
                  ? "text-yellow-500"
                  : appointment.status === "Approved"
                  ? "text-green-500"
                  : "text-blue-500"
              }`}
            >
              {appointment.status}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleApprove(appointment.id)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Approve
            </button>
            <button
              onClick={() => handleWaiting(appointment.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Waiting
            </button>
            <button
              onClick={() => handleReject(appointment.id)}
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

export default AdminAppointmentRequests;
