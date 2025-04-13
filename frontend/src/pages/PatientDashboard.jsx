import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import AppointmentsSection from "../components/AppointmentsSection";
import MedicalRecords from "../components/MedicalRecords";
import DoctorCard from "../components/DoctorCard";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../libs/axios";
import { toast } from "react-hot-toast";

const PatientDashboard = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [usrtoken, setUsrtoken] = useState();
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const userToken = localStorage.getItem("usertoken");
    setUsrtoken(userToken);
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
          _id: response.data.data._id || "",
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
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/api/v1/doctors", {
          params: { isVerified: true },
        });
        console.log("Fetched Doctors:", response.data.data);
        setDoctors(response.data.data || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Failed to fetch doctors.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="container mx-auto py-4 space-y-6">
          {/* Header */}
          <DashboardHeader user={user} />

          {/* Other Sections */}
          <DashboardStats />

          {/* Doctors Grid */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Available Doctors
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} user={user} />
                ))}
              </div>
            )}
          </div>

          {/* Appointments Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <AppointmentsSection user={user} userToken={usrtoken} userId={userId} />
          </div>

          {/* Medical Records Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <MedicalRecords userId={userId} userToken={usrtoken} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
