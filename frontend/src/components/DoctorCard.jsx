import React from "react";
import { useNavigate } from "react-router-dom";
import DocImg from "../assets/2.jpg";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleVideoCall = () => {
    const roomId = `room_${doctor._id}`; // Generate room ID using doctor's ID
    navigate(`/video-call/${roomId}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xs">
      <div className="flex items-start gap-4 flex-col">
        <div className="h-20 w-20 rounded-full border-blue-600 border-2 overflow-hidden flex items-center justify-center ">
          <img
            src={doctor.profilepic || "https://via.placeholder.com/150"}
            alt={`Dr. ${doctor.name}`}
            className="mx-auto h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-black">{doctor.name}</h3>
          <p className="text-lg text-gray-600">
            {doctor.specialization.join(", ")}
          </p>
        </div>
      </div>
      <div className="mt-2 flex">
        <button
          onClick={handleVideoCall}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer transition-colors"
        >
          Start Video Call
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
