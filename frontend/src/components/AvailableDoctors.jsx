import React from "react";
import DoctorCard from "./DoctorCard";

const AvailableDoctors = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8" id="doc">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Available Doctors</h2>
        <select className="bg-white border border-gray-300 px-4 py-2 rounded-md">
          <option>All Specializations</option>
          <option>General Physician</option>
          <option>Cardiology</option>
          <option>Dermatology</option>
          <option>Endocrinology</option>
          <option>Gastroenterology</option>
          <option>Hematology</option>
          <option>Neurology</option>
          <option>Nephrology</option>
          <option>Oncology</option>
          <option>Ophthalmology</option>
          <option>Orthopedics</option>
          <option>Otolaryngology (ENT)</option>
          <option>Pediatrics</option>
          <option>Psychiatry</option>
          <option>Pulmonology</option>
          <option>Radiology</option>
          <option>Rheumatology</option>
          <option>Surgery</option>
          <option>Urology</option>
          <option>Gynecology</option>
          <option>Dentistry</option>
          <option>Anesthesiology</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DoctorCard />
      </div>
    </div>
  );
};

export default AvailableDoctors;
