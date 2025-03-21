import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import AppointmentsSection from "../components/AppointmentsSection";
import MedicalRecords from "../components/MedicalRecords";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../libs/axios";
import { toast } from "react-hot-toast";

const PatientDashboard = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const userToken = localStorage.getItem("usertoken");
    if (!userToken) {
      navigate("/loginDashboard");
    }
  }, [navigate]);

  // Fetch user data
  useEffect(() => {
    if (userId) {
      getUserData(userId);
    }
  }, [userId]);

  const getUserData = async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/v1/users/${userId}`);
      if (response.data && response.data.data) {
        setUser({
          name: response.data.data.name || "",
          phonenumber: response.data.data.phonenumber || "",
          profilepic: response.data.data.profilepic || "",
          email: response.data.data.email || "",
        });
      } else {
        console.warn("User data is missing in response");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch available doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/doctors", {
          params: { isVerified: true },
        });
        console.log("Fetched Doctors:", response.data.data); // Debugging log
        setDoctors(response.data.data || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Failed to fetch doctors.");
      }
    };

    fetchDoctors();
  }, []);

  // Handle appointment booking
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !date) {
      toast.error("Please fill all fields.");
      return;
    }

    console.log("Selected Doctor ID:", selectedDoctor); // Debugging log
    console.log("Selected Date:", date); // Debugging log

    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/v1/appoint/book", {
        doctorId: selectedDoctor,
        userId,
        date,
      });

      if (response.status === 201) {
        toast.success("Appointment booked successfully!");
      } else {
        toast.error(response.data.message || "Booking failed.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("An error occurred while booking the appointment.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctor(doctorId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="container mx-auto py-4 space-y-6">
          {/* Header */}
          <DashboardHeader user={user} />

          {/* Appointment Booking Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg w-full mx-auto mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Book an Appointment
            </h2>
            <form onSubmit={handleBooking} className="space-y-6">
              {/* Doctor Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Select Doctor
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-5 py-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 flex items-center justify-between text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition"
                  >
                    {selectedDoctor
                      ? doctors.find((doctor) => doctor._id === selectedDoctor)
                          ?.name
                      : "Select a doctor"}
                    <span className="ml-3 text-gray-500">&#9662;</span>
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-80 overflow-y-auto">
                      {doctors.map((doctor) => (
                        <li
                          key={doctor._id}
                          onClick={() => handleDoctorSelect(doctor._id)}
                          className="flex items-center gap-4 px-5 py-4 hover:bg-blue-50 cursor-pointer transition"
                        >
                          <img
                            src={
                              doctor.profilepic ||
                              "https://via.placeholder.com/50"
                            }
                            alt={doctor.name}
                            className="w-10 h-10 rounded-full border border-gray-300"
                          />
                          <div>
                            <p className="text-lg font-semibold text-gray-800">
                              {doctor.name.toLowerCase().includes("dr.")
                                ? doctor.name
                                : `Dr. ${doctor.name}`}
                            </p>
                            <p className="text-sm text-gray-500">
                              {doctor.specialization.join(", ")}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Date Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  {isLoading ? "Booking..." : "Book Appointment"}
                </button>
              </div>
            </form>
          </div>

          {/* Other Sections */}
          <DashboardStats />
          <AppointmentsSection />
          <MedicalRecords />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientDashboard;