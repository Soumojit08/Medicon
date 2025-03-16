import React, { useEffect } from "react";
import Footer from "../components/Footer";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import PendingRequests from "../components/PendingRequests";
import AvailableDoctors from "../components/AvailableDoctors";
import AppointmentsSection from "../components/AppointmentsSection";
import MedicalRecords from "../components/MedicalRecords";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const user = { name: "John Doe" };
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("usertoken");

    if (!userToken) {
      navigate("/loginDashboard");
    }
  }, [navigate]);

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
