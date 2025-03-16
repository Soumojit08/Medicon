// src/pages/DoctorDashboard.jsx
import React, { useEffect, useState } from "react";
import DoctorProfileHeader from "../components/DoctorProfileHeader";
import DoctorDetailsForm from "../components/DoctorDetailsForm";
import ManageSchedule from "../components/ManageSchedule";
import Footer from "../components/Footer";
import { axiosInstance } from "../libs/axios";
import { useParams } from "react-router-dom";

const DoctorDashboard = () => {
  const doctorId = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (doctorId) {
      console.log("doctorId", doctorId)
      getDoctorData(doctorId);
    }
  }, [doctorId]);

  const getDoctorData = async (doctorId) => {
    try {
      const response = await axiosInstance.get(`/api/v1/doctor/${doctorId}`);
      const data = response.data;

      console.log(data);
    } catch (error) {}
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="w-full">
              {/* <DoctorProfileHeader />
              <DoctorDetailsForm /> */}
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