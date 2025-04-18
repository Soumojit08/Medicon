import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Video,
  CalendarDays,
  BadgeCheck,
  Mail,
  MapPinHouse,
  Star,
} from "lucide-react";
import Image from "./Image";
import { toast } from "react-hot-toast";
import axiosInstance from "../libs/axios";
import AppointmentModal from "./AppointmentModal";

const DoctorCard = ({ doctor, user }) => {
  const navigate = useNavigate();
  const isOnline = doctor.isOnline;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoCallStatus = async (isBusy) => {
    const doctorToken = localStorage.getItem("doctortoken");
    const doctorId = localStorage.getItem("doctorId");

    if (doctorToken && doctorId) {
      try {
        await axiosInstance.post(
          "/api/v1/update-doctor-status",
          {
            doctorId,
            isBusy,
          },
          {
            headers: {
              Authorization: `Bearer ${doctorToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Error updating busy status:", error);
      }
    }
  };

  const handleVideoCall = () => {
    // Check if user is logged in
    const userToken = localStorage.getItem("usertoken");

    if (!userToken) {
      toast.error("Please login to start a video call");
      navigate("/userLogin");
      return;
    }

    // Generate a unique room ID
    const roomId = `room_${doctor._id}_${Date.now()}`;

    // Log the doctor and user details
    console.log("Navigating to VideoCall with:", {
      doctorId: doctor._id,
      doctorName: doctor.name,
      patientId: user._id,
      patientName: user.name,
    });

    // Navigate to the VideoCall component with doctor and patient details
    navigate(`/video-call/${roomId}`, {
      state: {
        doctor,
        patient: {
          id: user._id,
          name: user.name,
        },
      },
    });
  };

  // const sendVideoCallRequest = async (doctorId, roomId) => {
  //   try {
  //     // Here you would make an API call to notify the doctor
  //     // For now, we'll just navigate to the video call room
  //     navigate(`/video-call/${roomId}`);
  //   } catch (error) {
  //     console.error("Error sending video call request:", error);
  //     toast.error("Failed to send video call request");
  //   }
  // };

  const openModal = () => {
    const userToken = localStorage.getItem("usertoken");
    if (!userToken) {
      toast.error("Please login to book appointment");
      navigate("/userLogin");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 w-full mb-6 overflow-hidden group ">
        {/* Profile header with subtle gradient */}
        <div className="relative h-18 -mx-5 -mt-5 mb-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="relative mb-2 h-20 w-20 rounded-full border-[3px] border-white shadow-lg overflow-hidden bg-white group-hover:border-blue-100 transition-colors duration-300">
              <Image
                pic={doctor.profilepic}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Doctor Information */}
        <div className="text-center mt-6 mb-4 space-y-1">
          <h2 className="text-xl font-bold text-blue-500">
            {doctor.name}
            {doctor.isVerified && (
              <BadgeCheck
                className="inline-block ml-2 text-green-500"
                size={20}
              />
            )}
          </h2>
          <p className="text-blue-600 text-sm font-medium bg-blue-50 rounded-full py-1 px-3 inline-flex max-w-full">
            {doctor.specialization.length > 2 ? (
              <span className="truncate">
                {doctor.specialization.slice(0, 2).join(", ")} +
                {doctor.specialization.length - 2} more
              </span>
            ) : (
              doctor.specialization.join(", ")
            )}
          </p>
        </div>

        {/* Doctor Details with fixed height for address */}
        <div className="space-y-3 text-sm mb-5 px-2 h-[72px]">
          
          <div className="flex items-start gap-3 text-gray-600">
            <div className="text-blue-500 mt-0.5 flex-shrink-0">
              <MapPinHouse size={16} />
            </div>
            <span className="text-gray-700 line-clamp-2 leading-tight break-words">
              {doctor.address}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <div className="text-blue-500">
              <Mail size={16} />
            </div>
            <span className="text-gray-700 truncate">{doctor.email}</span>
          </div>

          <div className="flex items-start gap-3 text-gray-600">
            <div className="text-blue-500 mt-0.5 flex-shrink-0">
              <CalendarDays size={16} />
            </div>
            <span className="text-gray-700 line-clamp-2 leading-tight break-words">
              {doctor.experience
                ? `${Number(doctor.experience)} years`
                : "No Experience Mentioned"}
            </span>
          </div>

          <div className="flex items-start gap-3 text-gray-600">
            <div className="text-blue-500 mt-0.5 flex-shrink-0">
              <Star size={16} />
            </div>
            <span className="text-gray-700 line-clamp-2 leading-tight break-words">
              {doctor.averageRating
                ? `${Number(doctor.averageRating).toFixed(1)}`
                : "No rating yet"}
            </span>
          </div>
        </div>

        {/* Fee and Action Buttons */}
        <div className="pt-8">
          <p className="text-center font-medium text-gray-800 mb-4">
            <span className="text-blue-600 text-lg font-semibold">
              {doctor.consultationFee || 0} INR
            </span>
            <span className="text-sm text-gray-500 ml-1">consultation</span>
          </p>

          <div className="flex gap-3">
            <button
              onClick={handleVideoCall}
              disabled={!isOnline}
              className={`flex-1 flex items-center justify-center gap-2 ${
                isOnline
                  ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } text-sm py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md`}
            >
              <Video size={16} />
              <span>{isOnline ? "Video Call" : "Offline"}</span>
            </button>
            <button
              onClick={openModal}
              className="cursor-pointer flex-1 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm py-2.5 px-4 rounded-lg transition-all duration-200"
            >
              <CalendarDays size={16} />
              <span>Book</span>
            </button>
          </div>
        </div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctor={doctor}
        user={user}
      />
    </>
  );
};

export default DoctorCard;
