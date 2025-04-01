import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { toast } from "react-hot-toast";
import axiosInstance from "../libs/axios";

const VideoCall = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation(); // Access the passed state
  const videoContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null); // State to store user data

  const appId = 1506791970; // Replace with your actual appId
  const serverSecret = "9b64224b2e9a099575e998495f402395"; // Replace with your actual serverSecret

  // Extract doctor details from state
  const { doctor } = state || {};

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId"); // Retrieve userId from localStorage
        if (!userId) {
          toast.error("User ID is missing. Please log in again.");
          navigate("/userLogin");
          return;
        }

        const response = await axiosInstance.get(`/api/v1/users/${userId}`);
        if (response.data && response.data.data) {
          setUser(response.data.data); // Set user data
        } else {
          console.error("User data is missing in response");
          toast.error("Failed to fetch user data. Please try again.");
          navigate("/patientDashboard");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data. Please try again.");
        navigate("/patientDashboard");
      }
    };

    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (!roomId || !doctor || !user) {
      console.error("Missing data for video call:", { roomId, doctor, user });
      return;
    }

    const initializeVideoCall = async () => {
      try {
        // Generate a unique token for the user
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appId,
          serverSecret,
          roomId,
          user._id, // Use the user's ID as the unique identifier
          user.name // Use the user's name
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
          container: videoContainerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall, // Correct mode for 1-on-1 calls
          },
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing video call:", error);
        toast.error("Failed to join the room. Please try again.");
        navigate("/patientDashboard");
      }
    };

    initializeVideoCall();
  }, [roomId, doctor, user, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Joining video call...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-blue-400 p-6">
      <h1 className="text-white text-2xl font-bold mb-6 shadow-md">
        🔹 Room: {roomId}
      </h1>
      <h2 className="text-white text-lg mb-4">
        Connected with Dr. {doctor.name}
      </h2>
      <div
        ref={videoContainerRef}
        className="w-full max-w-4xl h-[500px] bg-black rounded-lg shadow-lg overflow-hidden flex items-center justify-center"
      ></div>
      <button
        onClick={() => navigate("/patientDashboard")}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition-all"
      >
        End Call
      </button>
    </div>
  );
};

export default VideoCall;
