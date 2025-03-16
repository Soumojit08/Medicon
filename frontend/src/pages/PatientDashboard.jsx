import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import PendingRequests from "../components/PendingRequests";
import AvailableDoctors from "../components/AvailableDoctors";
import AppointmentsSection from "../components/AppointmentsSection";
import MedicalRecords from "../components/MedicalRecords";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../libs/axios";

const PatientDashboard = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getUserData(userId);
    }
  }, [userId]);

  useEffect(() => {
    const userToken = localStorage.getItem("usertoken");
    if (!userToken) {
      navigate("/loginDashboard");
    }
  }, [navigate]);

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
      console.error("Error fetching doctor data:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="container mx-auto py-4 space-y-6">
          <DashboardHeader user={user} />
          <DashboardStats />
          <div className="grid grid-cols-1 gap-6">
            <PendingRequests />
            <AvailableDoctors />
          </div>
          <AppointmentsSection />
          <MedicalRecords />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
