import React, { useState } from "react";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const navigate = useNavigate();

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

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (selectedSpecialization)
      params.append("specialization", selectedSpecialization);
    navigate(`/find-doctors?${params.toString()}`);
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Find Your Perfect Doctor
        </h1>
        <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
          Connect with verified healthcare professionals near you. Book
          appointments instantly and get the care you deserve.
        </p>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-4 sm:p-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by doctor name or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Specialization Select */}
          <div className="sm:w-64">
            <div className="relative">
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            "Find Nearby Doctors",
            "Book Appointment",
            "Video Consultation",
            "Health Records",
          ].map((item) => (
            <button
              key={item}
              className="px-4 py-3 bg-white bg-opacity-10 rounded-lg text-white hover:bg-opacity-20 transition-all"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;
