// src/components/AdminAppointmentRequests.jsx
import React, { useState } from "react";

const AdminAppointmentRequests = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      doctorName: "Dr. Jane Smith",
      date: "2024-03-20",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      patientName: "Alice Johnson",
      doctorName: "Dr. John Doe",
      date: "2024-03-21",
      time: "11:00 AM",
      status: "Pending",
    },
  ]);

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

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment.id}
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
