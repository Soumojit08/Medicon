// src/components/DoctorDetailsForm.jsx
import React, { useState } from "react";

const DoctorDetailsForm = ({ doctorData }) => {
  const [isEditing, setIsEditing] = useState(false);
  
  if (!doctorData || Object.keys(doctorData).length === 0) {
    return <p>Loading...</p>; // ✅ Avoid rendering before data is ready
  }

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
            <p className="text-gray-800">{doctorData.specialization?.join(",")}</p>
          </div>
          <div className="bg-zinc-100 py-2 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded text-base sm:text-lg">
            <label className="text-blue-600 mb-1 sm:mb-0">License No.</label>
            <p className="text-gray-800">{doctorData.registrationId}</p>
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
                value={doctorData.languages?.join(",")}
                onChange={(e) =>
                  setDetails({ ...details, languages: e.target.value })
                }
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{doctorData.languages?.join(",")}</p>
            )}
          </div>
          <div className="bg-zinc-100 py-2 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded text-base sm:text-lg">
            <label className="text-blue-600 mb-1 sm:mb-0">Education</label>
            {isEditing ? (
              <input
                type="text"
                value={doctorData.education}
                onChange={(e) =>
                  setDetails({ ...details, education: e.target.value })
                }
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{doctorData.education}</p>
            )}
          </div>
          <div className="bg-zinc-100 py-2 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded text-base sm:text-lg">
            <label className="text-blue-600 mb-1 sm:mb-0">
              Consultation Fee
            </label>
            {isEditing ? (
              <input
                type="text"
                value={doctorData.consultationFee}
                onChange={(e) =>
                  setDetails({ ...details, consultationFee: e.target.value })
                }
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{doctorData.consultationFee}</p>
            )}
          </div>

          <div className="bg-zinc-100 py-2 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded text-base sm:text-lg">
            <label className="text-blue-600 mb-1 sm:mb-0">Location</label>
            {isEditing ? (
              <input
                type="text"
                value={doctorData.address}
                onChange={(e) =>
                  setDetails({ ...details, address: e.target.value })
                }
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{doctorData.address}</p>
            )}
          </div>

          <div className="bg-zinc-100 py-2 px-4 sm:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded text-base sm:text-lg">
            <label className="text-blue-600 mb-1 sm:mb-0">Experience</label>
            {isEditing ? (
              <input
                type="text"
                value={doctorData.experience || "Not available"}
                onChange={(e) =>
                  setDetails({ ...details, experience: e.target.value })
                }
                className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-gray-800">{doctorData.experience || "Not available"}</p>
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