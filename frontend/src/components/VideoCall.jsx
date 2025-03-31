import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { toast } from "react-hot-toast";
import { PhoneOff } from "lucide-react";

const VideoCall = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const meetingContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const { doctor, patient } = state || {};

  useEffect(() => {
    console.log("Received in VideoCall component:", { doctor, patient });

    if (!roomId || !doctor || !patient || !patient.id || !patient.name) {
      console.error("Missing data for video call:", {
        roomId,
        doctor,
        patient,
      });
      toast.error("Missing data for video call");
      navigate("/patientDashboard");
      return;
    }

    const initializeVideoCall = async () => {
      try {
        const userId = patient.id || `guest_${Date.now()}`;
        const userName = patient.name || "Guest";

        console.log("Token Generation Parameters:", {
          appID: 1943313691,
          appSign:
            "da2ec159e961a89c0185687e37abeea9ce7af5cafe9af29f5c3b288573068ae7",
          roomId,
          userId,
          userName,
        });

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          1943313691,
          "da2ec159e961a89c0185687e37abeea9ce7af5cafe9af29f5c3b288573068ae7",
          roomId,
          userId,
          userName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);

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
        console.error("Error joining room:", error);
        toast.error("Failed to join the room. Please try again.");
        navigate("/patientDashboard");
      }
    };

    initializeVideoCall();
  }, [roomId, doctor, patient, navigate]);

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
