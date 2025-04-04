import React, { useState, useRef, useEffect } from "react";
import { Newspaper } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../libs/axios";

const MedicalRecords = ({ userId, userToken }) => {
  const [files, setFiles] = useState(null);
  const [fileNames, setFileNames] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const fileInputRef = useRef(null);
  const [value, setValue] = useState([]);

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
        }
      );

      console.log("Fetch Records Response:", response.data);

      if (
        response.data &&
        (response.data.success || response.data.status === "OK")
      ) {
        const files = response.data.data?.files || [];
        setRecords(files);
        setValue(response.data.data);
        if (files.length === 0) {
          toast.info("No records found");
        }
      } else {
        toast.error(response.data?.message || "Failed to fetch records");
      }
    } catch (error) {
      console.error("Error fetching medical records:", error);
      toast.error(
        error.response?.data?.message || "Failed to load medical records"
      );
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles(selectedFiles);

    // Initialize names for each file
    const names = {};
    Array.from(selectedFiles).forEach((file, index) => {
      names[index] = ""; // Empty string as default
    });
    setFileNames(names);
  };

  const handleNameChange = (index, value) => {
    setFileNames((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  // const triggerFileInput = () => {
  //   fileInputRef.current.click();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      toast.error("Please select files to upload");
      return;
    }

    // Validate all files have names
    const hasEmptyNames = Object.values(fileNames).some((name) => !name.trim());
    if (hasEmptyNames) {
      toast.error("Please provide names for all files");
      return;
    }

    if (!userId || !userToken) {
      toast.error("Authorization required");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("userId", userId);

    Array.from(files).forEach((file, index) => {
      formData.append("files", file);
      formData.append("filenames", fileNames[index]);
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

      // Log the response to see its structure
      console.log("Upload Response:", response.data);

      if (
        response.data &&
        (response.data.success || response.data.status === "OK")
      ) {
        toast.success("Medical records uploaded successfully");
        setFiles(null);
        setFileNames({});
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        // Wait a brief moment before fetching updated records
        setTimeout(() => {
          fetchMedicalRecords();
        }, 500);
      } else {
        toast.error(response.data?.message || "Failed to upload files");
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-center mb-4">
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
              onClick={() => fileInputRef.current.click()}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
            >
              Select Files
            </button>
          </div>
        </div>

        {files && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="font-semibold mb-2">Selected files:</p>
            <div className="space-y-3">
              {Array.from(files).map((file, index) => (
                <div key={index} className="flex items-center gap-4">
                  <input
                    type="text"
                    placeholder="Enter certificate name"
                    value={fileNames[index] || ""}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded-md"
                    required
                  />
                  <span className="text-sm text-gray-600">
                    ({Math.round(file.size / 1024)} KB)
                  </span>
                </div>
              ))}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`mt-4 w-full ${
                isLoading ? "bg-blue-400" : "bg-blue-600"
              } text-white px-4 py-2 rounded-md`}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
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
                      <h3 className="text-lg font-bold">{record.filename}</h3>
                      <p className="text-gray-600">
                        Uploaded on{" "}
                        {new Date(value.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={record.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border border-blue-500 text-blue-500 px-4 py-2 rounded-md"
                    >
                      View
                    </a>
                    <a
                      href={record.url}
                      download={record.name}
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
      </form>
    </div>
  );
};

export default MedicalRecords;
