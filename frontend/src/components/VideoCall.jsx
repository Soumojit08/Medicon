import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { toast } from "react-hot-toast";
import { PhoneOff } from "lucide-react";

const VideoCall = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation(); // Access the passed state
  const meetingContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasInitialized = useRef(false);

  // Extract doctor and patient details from state
  const { doctor, patient } = state || {};

  useEffect(() => {
    // Log the received doctor and patient details
    console.log("Received in VideoCall component:", {
      doctorId: doctor?._id,
      doctorName: doctor?.name,
      patientId: patient?.id,
      patientName: patient?.name,
    });

    if (hasInitialized.current) return; // Prevent re-initialization
    hasInitialized.current = true;

    if (!roomId || !doctor || !patient) {
      toast.error("Missing data for video call");
      navigate("/patientDashboard");
      return;
    }

    const initializeVideoCall = async () => {
      try {
        // Generate ZEGOCLOUD token
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          1943313691, // Replace with your appID
          "da2ec159e961a89c0185687e37abeea9ce7af5cafe9af29f5c3b288573068ae7", // Replace with your appSign
          roomId,
          patient.id, // Use patient ID as userId
          patient.name // Use patient name as userName
        );

        // Create ZEGO instance
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // Join room
        zp.joinRoom({
          container: meetingContainerRef.current,
          sharedLinks: [
            {
              name: "Copy Link",
              url: `${window.location.origin}/video-call/${roomId}`,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
            config: {
              role: ZegoUIKitPrebuilt.Cohost,
              turnOnCameraWhenJoining: true,
              turnOnMicrophoneWhenJoining: true,
            },
          },
          onLeave: () => {
            navigate("/patientDashboard");
          },
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error starting the meeting:", error);
        toast.error("Failed to join video call");
        navigate("/patientDashboard");
      }
    };

    initializeVideoCall();
  }, []); // Empty dependency array ensures this runs only once

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Joining video call...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => navigate("/patientDashboard")}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <PhoneOff size={20} />
          <span>End Call</span>
        </button>
      </div>
      <div ref={meetingContainerRef} className="w-full h-screen" />
    </div>
  );
};

export default VideoCall;
