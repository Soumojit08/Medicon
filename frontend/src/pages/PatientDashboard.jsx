import React from "react";
import Footer from "../components/Footer";
import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import PendingRequests from "../components/PendingRequests";
import AvailableDoctors from "../components/AvailableDoctors";
import AppointmentsSection from "../components/AppointmentsSection";
import MedicalRecords from "../components/MedicalRecords";

const PatientDashboard = () => {
  const user = { name: "John Doe" };

  return (
    <div>
      <div className="min-h-screen flex flex-col px-20">
        <div className="container mx-auto p-4 flex-grow">
          <DashboardHeader user={user} />
          <DashboardStats />
          <PendingRequests />
          <AvailableDoctors />
          <AppointmentsSection />
          <MedicalRecords />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PatientDashboard;
