import React, { useState } from "react";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Particles from "./Particles"; // Import the Particles component
import TypingText from "./TypingText"

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

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (selectedSpecialization)
      params.append("specialization", selectedSpecialization);
    navigate(`/find-doctors?${params.toString()}`);
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-4 sm:px-6 lg:px-8">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={600}
          particleSpread={20}
          speed={0.3}
          particleBaseSize={300}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Find Your Preferable <TypingText/>
        </h1>
        <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
          Connect with verified healthcare professionals near you. Book
          appointments instantly and get the care you deserve.
        </p>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-4 sm:p-6 space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="w-full flex gap-6">
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
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeSearch;