import React from "react";
import { useNavigate } from "react-router-dom";
import { Video, CalendarDays, BadgeCheck, Circle } from "lucide-react";
import Image from "./Image";
import { toast } from "react-hot-toast";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  const isOnline = doctor.isOnline 
  
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

    // Send request to doctor
    sendVideoCallRequest(doctor._id, roomId);
  };

  const sendVideoCallRequest = async (doctorId, roomId) => {
    try {
      // Here you would make an API call to notify the doctor
      // For now, we'll just navigate to the video call room
      navigate(`/video-call/${roomId}`);
    } catch (error) {
      console.error("Error sending video call request:", error);
      toast.error("Failed to send video call request");
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 w-full max-w-xs mb-6 overflow-hidden group">
      {/* Profile header with subtle gradient */}
      <div className="relative h-24 -mx-5 -mt-5 mb-4 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="relative mb-2 h-20 w-20 rounded-full border-[3px] border-white shadow-lg overflow-hidden bg-white group-hover:border-blue-100 transition-colors duration-300">
            <Image
              pic={doctor.profilepic}
              className="h-full w-full object-cover"
            />
            {/* Online status indicator */}
            <div
              className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              {isOnline && (
                <Circle className="w-full h-full text-white animate-ping absolute" />
              )}
            </div>
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
        <p className="text-blue-600 text-sm font-medium bg-blue-50 rounded-full py-1 px-3 inline-block">
          {doctor.specialization}
        </p>
      </div>

      {/* Doctor Details with fixed height for address */}
      <div className="space-y-3 text-sm mb-5 px-2 h-[72px]">
        {" "}
        {/* Fixed height container */}
        <div className="flex items-start gap-3 text-gray-600">
          <div className="text-blue-500 mt-0.5 flex-shrink-0">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <span className="text-gray-700 line-clamp-2 leading-tight break-words">
            {doctor.address}
          </span>
        </div>
        <div className="flex items-center gap-3 text-gray-600">
          <div className="text-blue-500">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-gray-700 truncate">{doctor.email}</span>
        </div>
      </div>

      {/* Fee and Action Buttons */}
      <div className="border-t border-gray-100 pt-4">
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
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } text-sm py-2.5 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md`}
          >
            <Video size={16} />
            <span>{isOnline ? "Video Call" : "Offline"}</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm py-2.5 px-4 rounded-lg transition-all duration-200">
            <CalendarDays size={16} />
            <span>Book</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;