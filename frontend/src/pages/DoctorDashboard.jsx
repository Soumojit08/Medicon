// src/pages/DoctorDashboard.jsx
import React from "react";
import DoctorProfileHeader from "../components/DoctorProfileHeader";
import DoctorDetailsForm from "../components/DoctorDetailsForm";
import ManageSchedule from "../components/ManageSchedule";
import Footer from "../components/Footer";

const DoctorDashboard = () => {
  const doctor = {
    profileimage: "https://via.placeholder.com/150",
    name: "Dr. John Doe",
    specialization: ["Cardiology", "General Medicine"],
    RegId: "123456",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="w-full">
              <DoctorProfileHeader doctor={doctor} />
              <DoctorDetailsForm doctor={doctor} />
            </div>
            <div className="w-full">
              <ManageSchedule />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;