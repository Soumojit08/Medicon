import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter } from "lucide-react";
import axiosInstance from "../libs/axios";
import toast from "react-hot-toast";

const FindDoctors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedSpecialization, setSelectedSpecialization] = useState(
    searchParams.get("specialization") || ""
  );
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const specializations = [
    "General Physician",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
  ];

  useEffect(() => {
    fetchDoctors();
  }, [searchTerm, selectedSpecialization]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/v1/doctors", {
        params: {
          isVerified: true,
          search: searchTerm,
          specialization: selectedSpecialization,
        },
      });

      if (response.data && response.data.status === "OK") {
        setDoctors(response.data.data);
      } else {
        setError("No doctors found");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError(error.response?.data?.message || "Failed to fetch doctors");
      toast.error(error.response?.data?.message || "Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedSpecialization)
      params.set("specialization", selectedSpecialization);
    setSearchParams(params);
  }, [searchTerm, selectedSpecialization, setSearchParams]);

  const handleBookAppointment = (doctorId) => {
    // Check if user is logged in
    const userToken = localStorage.getItem("usertoken");
    if (!userToken) {
      toast.error("Please login to book an appointment");
      return;
    }
    // Navigate to appointment booking page
    window.location.href = `/book-appointment/${doctorId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            {/* Search Bar */}
            <div className="flex-1 relative mb-4 md:mb-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, specialization, or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Specialization Filter */}
            <div className="md:w-64">
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Active Filters */}
        {(searchTerm || selectedSpecialization) && (
          <div className="mb-6 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Search: {searchTerm}
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-2 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
            {selectedSpecialization && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                Specialization: {selectedSpecialization}
                <button
                  onClick={() => setSelectedSpecialization("")}
                  className="ml-2 hover:text-blue-900"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-red-500 text-center py-4">{error}</div>
        )}

        {/* Doctors Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden">
                    <img
                      src={
                        doctor.profilepic || "https://via.placeholder.com/150"
                      }
                      alt={doctor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {doctor.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {doctor.specialization.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">{doctor.address}</p>
                  <p className="text-sm text-gray-600">
                    Registration ID: {doctor.registrationId}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => handleBookAppointment(doctor._id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && doctors.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No doctors found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctors;
