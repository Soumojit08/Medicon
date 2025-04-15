// src/components/AdminAppointmentRequests.jsx
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../libs/axios";
import { toast } from "react-hot-toast";

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
    setLoading(true);
    try {
      const response = await axiosInstance.get("/api/v1/get-all-appointments", {
        headers: {
          Authorization: `Bearer ${admintoken}`,
        },
      });
      console.log(response.data);
      setAppointments(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch appointments");
    }
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div
          key={appointment._id}
          className="flex justify-between items-start p-4 bg-gray-50 rounded-lg"
        >
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-lg font-bold">Patient Details</h3>
              <p className="text-sm text-gray-600">
                Name: {appointment.userId?.name}
              </p>
              <p className="text-sm text-gray-600">
                Email: {appointment.userId?.email}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {appointment.userId?.phonenumber}
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold">Doctor Details</h3>
              <p className="text-sm text-gray-600">
                Name: {appointment.doctorId?.name}
              </p>
              <p className="text-sm text-gray-600">
                Email: {appointment.doctorId?.email}
              </p>
              <p className="text-sm text-gray-600">
                Specialization: {appointment.doctorId?.specialization}
              </p>
              <p className="text-sm text-gray-600">
                Registration ID: {appointment.doctorId?.registrationId}
              </p>
              <p className="text-sm text-gray-600">
                Consultation Fee: ₹{appointment.doctorId?.consultationFee}
              </p>
              <p className="text-sm text-gray-600">
                Verification Status:{" "}
                <span
                  className={
                    appointment.doctorId?.isVerified
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {appointment.doctorId?.isVerified
                    ? "Verified"
                    : "Not Verified"}
                </span>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold">Appointment Details</h3>
              <p className="text-sm text-gray-600">
                Date: {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Time: {appointment.startTime} - {appointment.endTime}
              </p>
              <p
                className={`text-sm ${
                  appointment.status === "pending"
                    ? "text-yellow-500"
                    : appointment.status === "confirmed"
                    ? "text-green-500"
                    : "text-blue-500"
                }`}
              >
                Status: {appointment.status}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleApprove(appointment._id)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Approve
            </button>
            <button
              onClick={() => handleWaiting(appointment._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Waiting
            </button>
            <button
              onClick={() => handleReject(appointment._id)}
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
