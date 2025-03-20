import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  ArrowUpDown,
  X,
} from "lucide-react";
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
  const [sortBy, setSortBy] = useState("rating"); // rating, experience, name
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc
  const [filters, setFilters] = useState({
    experience: "",
    rating: "",
    availability: "",
    gender: "",
    location: "",
  });
  const [showFilters, setShowFilters] = useState(false);

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

  const experienceOptions = ["0-5 years", "5-10 years", "10+ years"];
  const ratingOptions = ["4+ stars", "3+ stars", "All ratings"];
  const availabilityOptions = ["Available today", "Available this week", "All"];
  const genderOptions = ["Male", "Female", "Any"];
  const locationOptions = [
    "Within 5 km",
    "Within 10 km",
    "Within 20 km",
    "Any",
  ];

  useEffect(() => {
    fetchDoctors();
  }, [searchTerm, selectedSpecialization, sortBy, sortOrder, filters]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/v1/doctors", {
        params: {
          isVerified: true,
          search: searchTerm,
          specialization: selectedSpecialization,
          sortBy,
          sortOrder,
          ...filters,
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

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (selectedSpecialization)
      params.set("specialization", selectedSpecialization);
    setSearchParams(params);
  }, [searchTerm, selectedSpecialization, setSearchParams]);

  const handleBookAppointment = (doctorId) => {
    const userToken = localStorage.getItem("usertoken");
    if (!userToken) {
      toast.error("Please login to book an appointment");
      return;
    }
    window.location.href = `/book-appointment/${doctorId}`;
  };

  const clearFilters = () => {
    setFilters({
      experience: "",
      rating: "",
      availability: "",
      gender: "",
      location: "",
    });
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Find Your Perfect Doctor</h1>
          <p className="text-blue-100 mb-8">
            Search from our network of qualified and verified healthcare
            professionals
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            {/* Search Bar */}
            <div className="flex-1 relative">
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

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience
                  </label>
                  <select
                    value={filters.experience}
                    onChange={(e) =>
                      setFilters({ ...filters, experience: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any Experience</option>
                    {experienceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) =>
                      setFilters({ ...filters, rating: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any Rating</option>
                    {ratingOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) =>
                      setFilters({ ...filters, availability: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any Availability</option>
                    {availabilityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={filters.gender}
                    onChange={(e) =>
                      setFilters({ ...filters, gender: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any Gender</option>
                    {genderOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any Distance</option>
                    {locationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters */}
        {(searchTerm ||
          selectedSpecialization ||
          Object.values(filters).some(Boolean)) && (
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
            {Object.entries(filters).map(([key, value]) =>
              value ? (
                <span
                  key={key}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                >
                  {key}: {value}
                  <button
                    onClick={() => setFilters({ ...filters, [key]: "" })}
                    className="ml-2 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              ) : null
            )}
          </div>
        )}

        {/* Sort Controls */}
        <div className="mb-6 flex items-center space-x-4">
          <span className="text-sm text-gray-600">Sort by:</span>
          <button
            onClick={() => toggleSort("rating")}
            className={`flex items-center px-3 py-1 rounded-md text-sm ${
              sortBy === "rating"
                ? "bg-blue-100 text-blue-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Star className="w-4 h-4 mr-1" />
            Rating
            {sortBy === "rating" && <ArrowUpDown className="w-4 h-4 ml-1" />}
          </button>
          <button
            onClick={() => toggleSort("experience")}
            className={`flex items-center px-3 py-1 rounded-md text-sm ${
              sortBy === "experience"
                ? "bg-blue-100 text-blue-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Clock className="w-4 h-4 mr-1" />
            Experience
            {sortBy === "experience" && (
              <ArrowUpDown className="w-4 h-4 ml-1" />
            )}
          </button>
          <button
            onClick={() => toggleSort("name")}
            className={`flex items-center px-3 py-1 rounded-md text-sm ${
              sortBy === "name"
                ? "bg-blue-100 text-blue-800"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Name
            {sortBy === "name" && <ArrowUpDown className="w-4 h-4 ml-1" />}
          </button>
        </div>

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
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative">
                  <img
                    src={
                      doctor.profilepic || "https://via.placeholder.com/400x200"
                    }
                    alt={doctor.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-medium text-blue-600 shadow">
                    {doctor.experience} years exp.
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        Dr. {doctor.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {doctor.specialization.join(", ")}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-600">
                        {doctor.rating || "4.5"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{doctor.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">Next available: Today</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-green-600 text-sm font-medium">
                      ₹{doctor.consultationFee || "500"} per visit
                    </div>
                    <button
                      onClick={() => handleBookAppointment(doctor._id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && doctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No doctors found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindDoctors;
