// src/components/DoctorDetailsForm.jsx
import React, { useState } from "react";

const DoctorDetailsForm = ({ doctor }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState({
    specialization: doctor.specialization.join(", "),
    registrationId: doctor.RegId,
    languages: "English, Spanish",
    education: "MBBS, MD",
    consultationFee: "$100",
    address: "123 Clinic St, City, Country",
    facts: "Always double-check your prescriptions.",
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Saved details:", details);
  };

  return (
    <form
      onSubmit={handleSave}
      className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
    >
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-blue-500">Details</h3>
          <button
            type="button"
            onClick={handleEdit}
            className="text-blue-500 border border-blue-500 px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors text-sm sm:text-base"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-zinc-100 py-2 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded text-base sm:text-lg">
            <label className="text-blue-600 mb-1 sm:mb-0">Specialization</label>
            <p className="text-gray-800">{details.specialization}</p>
          </div>
          <div className="bg-zinc-100 py-2 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded text-base sm:text-lg">
            <label className="text-blue-600 mb-1 sm:mb-0">License No.</label>
            <p className="text-gray-800">{details.registrationId}</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-blue-500">
            Additional Details
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-zinc-100 py-2 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded text-base sm:text-lg">
            <label className="text-blue-600 mb-1 sm:mb-0">Languages</label>
            {isEditing ? (
              <input
                type="text"
                value={details.languages}
                onChange={(e) =>
                  setDetails({ ...details, languages: e.target.value })
                }
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{details.languages}</p>
            )}
          </div>
          <div className="bg-zinc-100 py-2 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded text-base sm:text-lg">
            <label className="text-blue-600 mb-1 sm:mb-0">Education</label>
            {isEditing ? (
              <input
                type="text"
                value={details.education}
                onChange={(e) =>
                  setDetails({ ...details, education: e.target.value })
                }
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{details.education}</p>
            )}
          </div>
          <div className="bg-zinc-100 py-2 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded text-base sm:text-lg">
            <label className="text-blue-600 mb-1 sm:mb-0">
              Consultation Fee
            </label>
            {isEditing ? (
              <input
                type="text"
                value={details.consultationFee}
                onChange={(e) =>
                  setDetails({ ...details, consultationFee: e.target.value })
                }
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{details.consultationFee}</p>
            )}
          </div>

          <div className="bg-zinc-100 py-2 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded text-base sm:text-lg">
            <label className="text-blue-600 mb-1 sm:mb-0">Location</label>
            {isEditing ? (
              <input
                type="text"
                value={details.address}
                onChange={(e) =>
                  setDetails({ ...details, address: e.target.value })
                }
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">123, London</p>
            )}
          </div>

          <div className="bg-zinc-100 py-2 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded text-base sm:text-lg">
            <label className="text-blue-600 mb-1 sm:mb-0">Experience</label>
            {isEditing ? (
              <input
                type="text"
                value={details.experience}
                onChange={(e) =>
                  setDetails({ ...details, experience: e.target.value })
                }
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">10 years</p>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      )}
    </form>
  );
};

export default DoctorDetailsForm;