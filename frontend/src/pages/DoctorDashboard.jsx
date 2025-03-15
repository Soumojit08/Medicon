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
    <div>
      <div className="min-h-screen flex flex-col px-20">
        <div className="container mx-auto p-4 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <DoctorProfileHeader doctor={doctor} />
              <DoctorDetailsForm doctor={doctor} />
            </div>
            <div>
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
