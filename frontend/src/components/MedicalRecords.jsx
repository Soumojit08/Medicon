import React, { useState, useRef, useEffect } from "react";
import { Newspaper } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../libs/axios";

const MedicalRecords = ({ userId, userToken }) => {
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userId && userToken) {
      fetchMedicalRecords();
    }
  }, [userId, userToken]);

  const fetchMedicalRecords = async () => {
    try {
      const response = await axiosInstance.get(
        "/api/v1/get-medical-certificate",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${userToken}`, // Include the user token in the Authorization header
          },
        }
      );

      if (response.data && response.data.status === "OK") {
        setRecords(response.data.data?.files || []);
      } else {
        toast.error("No records found");
      }
    } catch (error) {
      console.error("Error fetching medical records:", error);
      toast.error(
        error.response?.data?.message || "Failed to load medical records"
      );
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    if (!userId || !userToken) {
      toast.error("Authorization required");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("userId", userId);

    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axiosInstance.post(
        "/api/v1/upload-medical-certificate",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.data && response.data.status === "OK") {
        toast.success("Medical records uploaded successfully");
        setFiles(null);
        fileInputRef.current.value = "";
        // Fetch updated records
        fetchMedicalRecords();
      }
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error(
        error.response?.data?.message || "Failed to upload medical records"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (url) => {
    // Extract date from filename or use current date
    // This is a placeholder - you might need to adjust based on how your dates are stored
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Extract filename from URL
  const getFileName = (url) => {
    if (!url) return "Unnamed Document";
    const parts = url.split("/");
    return parts[parts.length - 1].substring(0, 20) + "...";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form
        method="POST"
        onSubmit={handleSubmit}
        className="flex justify-between items-center mb-4"
      >
        <h2 className="text-xl font-bold">Medical Records</h2>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
          >
            Select Files
          </button>
          <button
            type="submit"
            disabled={isLoading || !files}
            className={`${
              isLoading ? "bg-blue-400" : "bg-blue-600"
            } text-white px-4 py-2 rounded-md`}
          >
            {isLoading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </form>

      {files && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <p className="font-semibold mb-2">Selected files:</p>
          <ul className="list-disc pl-5">
            {Array.from(files).map((file, index) => (
              <li key={index} className="text-sm text-gray-600">
                {file.name} ({Math.round(file.size / 1024)} KB)
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4">
        {records.length > 0 ? (
          records.map((record, index) => (
            <div className="bg-gray-50 p-4 rounded-lg" key={index}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-300 text-blue-600 rounded-lg flex items-center justify-center">
                    <Newspaper />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{getFileName(record)}</h3>
                    <p className="text-gray-600">
                      Uploaded on {formatDate(record)}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={record}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-md"
                  >
                    View
                  </a>
                  <a
                    href={record}
                    download
                    className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-md"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-8 text-gray-500">
            No medical records uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
