import React from "react";
import DocImg from "../assets/2.jpg";

const DoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xs">
      <div className="flex items-start gap-4 flex-col">
        <div className="h-20 w-20 rounded-full border-blue-600 border-2 overflow-hidden flex items-center justify-center ">
          <img
            src={DocImg}
            alt={`Dr. name`}
            className="mx-auto h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-xl font-bold text-black">Dr. Name</h3>
          <p className="text-lg text-gray-100">General Physican</p>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-start gap-2 flex-col">
          <span className="text-base">Experience</span>
        </div>
        <div className="flex gap-2 mt-2 flex-col">
          <div className="flex items-center text-base">
            <span>Location</span>
          </div>
          <div className="flex items-center text-base gap-2">
            Consulting Fee : <span> ₹100</span>
          </div>
        </div>
      </div>
      <div className="mt-2 flex">
        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer transition-colors">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
