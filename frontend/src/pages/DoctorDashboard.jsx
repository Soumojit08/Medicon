// src/pages/DoctorDashboard.jsx
import React, { useEffect, useState } from "react";
import DoctorProfileHeader from "../components/DoctorProfileHeader";
import DoctorDetailsForm from "../components/DoctorDetailsForm";
import ManageSchedule from "../components/ManageSchedule";
import Footer from "../components/Footer";
import { axiosInstance } from "../libs/axios";
import { useParams, useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const { id: doctorId } = useParams();
  const [doctor, setDoctor] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (doctorId) {
      getDoctorData(doctorId);
    }
  }, [doctorId]);

  useEffect(() => {
    const doctorToken = localStorage.getItem("doctortoken");

    if (!doctorToken) {
      navigate("/loginDashboard");
    }
  }, [navigate]);

  const getDoctorData = async (doctorId) => {
    try {
      const response = await axiosInstance.get(`/api/v1/doctor/${doctorId}`);

      if (response.data && response.data.data) {
        setDoctor({
          name: response.data.data.name || "",
          address: response.data.data.address || "",
          education: response.data.data.education || "",
          facts: response.data.data.facts || "",
          languages: response.data.data.languages || [],
          phonenumber: response.data.data.phonenumber || "",
          profilepic: response.data.data.profilepic || "",
          registrationId: response.data.data.registrationId || "",
          specialization: response.data.data.specialization || [],
        });
      } else {
        console.warn("Doctor data is missing in response");
      }
    } catch (error) {
      console.error("Error fetching doctor data:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="w-full">
              <DoctorProfileHeader doctorData={doctor} />
              <DoctorDetailsForm doctorData={doctor} />
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