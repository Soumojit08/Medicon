// src/components/AppointmentsSection.jsx
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  MessageSquare,
  Search,
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const AppointmentsSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // Static data for appointments
  const appointmentsData = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      date: "2024-03-25",
      time: "10:00 AM",
      type: "Video Call",
      status: "upcoming",
      duration: "30 mins",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialization: "Neurologist",
      date: "2024-03-24",
      time: "2:30 PM",
      type: "In Person",
      status: "completed",
      duration: "45 mins",
    },
    {
      id: 3,
      doctor: "Dr. Emily Brown",
      specialization: "Pediatrician",
      date: "2024-03-23",
      time: "11:00 AM",
      type: "Video Call",
      status: "cancelled",
      duration: "30 mins",
    },
    {
      id: 4,
      doctor: "Dr. David Wilson",
      specialization: "Orthopedist",
      date: "2024-03-26",
      time: "3:00 PM",
      type: "In Person",
      status: "upcoming",
      duration: "45 mins",
    },
  ];

  const [appointments, setAppointments] = useState(appointmentsData);

  const getStatusColor = (status) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "upcoming":
        return <AlertCircle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredAppointments = appointments
    .filter((appointment) => {
      const matchesSearch =
        appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.specialization
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || appointment.status === filterStatus;
      const matchesType =
        filterType === "all" || appointment.type === filterType;
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      setAppointments(appointmentsData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
        <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="Video Call">Video Call</option>
            <option value="In Person">In Person</option>
          </select>
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`text-gray-600 ${isLoading ? "animate-spin" : ""}`}
              size={20}
            />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <span className="text-blue-600 font-medium">
                  {appointment.doctor.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">
                  {appointment.doctor}
                </h3>
                <p className="text-sm text-gray-500">
                  {appointment.specialization}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {new Date(appointment.date).toLocaleDateString()}
                  </span>
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {appointment.time}
                  </span>
                  <span className="text-sm text-gray-500">
                    • {appointment.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(
                  appointment.status
                )}`}
              >
                {getStatusIcon(appointment.status)}
                <span className="text-sm font-medium capitalize">
                  {appointment.status}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {appointment.type === "Video Call" && (
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Video className="w-5 h-5 text-blue-500" />
                  </button>
                )}
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <MessageSquare className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No appointments found</p>
        </div>
      )}

      <div className="mt-6 text-center">
        <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors">
          Book New Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentsSection;