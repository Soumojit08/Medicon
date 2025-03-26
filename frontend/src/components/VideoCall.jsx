import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { toast } from "react-hot-toast";
import { Video, PhoneOff } from "lucide-react";

const VideoCall = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const meetingContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [callStatus, setCallStatus] = useState("connecting"); // connecting, waiting, active, ended

  // ZEGOCLOUD credentials
  const appID = 1943313691;
  const appSign =
    "da2ec159e961a89c0185687e37abeea9ce7af5cafe9af29f5c3b288573068ae7";

  useEffect(() => {
    if (!roomId) {
      console.error("Room ID is required but not provided.");
      toast.error("Invalid room ID");
      navigate("/");
      return;
    }

    const initializeVideoCall = async () => {
      try {
        // Get user information from localStorage
        const userToken = localStorage.getItem("usertoken");
        const doctorToken = localStorage.getItem("doctortoken");

        // Determine user role and get appropriate user data
        let userId, userName, role;
        if (userToken) {
          // Patient
          userId = localStorage.getItem("userId");
          userName = localStorage.getItem("userName") || "Patient";
          role = "patient";
          setIsWaiting(true);
          setCallStatus("waiting");
        } else if (doctorToken) {
          // Doctor
          userId = localStorage.getItem("doctorId");
          userName = localStorage.getItem("doctorName") || "Doctor";
          role = "doctor";
          setCallStatus("active");
        } else {
          toast.error("Please login to join the video call");
          navigate("/loginDashboard");
          return;
        }

        // Generate the kit token
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          parseInt(appID),
          appSign,
          roomId,
          userId,
          userName
        );

        // Create the ZegoUIKitPrebuilt instance
        const zp = ZegoUIKitPrebuilt.create(kitToken);

        // Join the room with appropriate role
        await zp.joinRoom({
          container: meetingContainerRef.current,
          sharedLinks: [
            {
              name: "Copy Link",
              url: `${window.location.origin}/video-call/${roomId}`,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
            config: {
              role:
                role === "doctor"
                  ? ZegoUIKitPrebuilt.VideoConferenceRole.Host
                  : ZegoUIKitPrebuilt.VideoConferenceRole.Audience,
              turnOnMicrophoneWhenJoining: true,
              turnOnCameraWhenJoining: true,
              useSpeakerWhenJoining: true,
            },
          },
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error starting the meeting:", error);
        toast.error("Failed to join the video call");
        navigate("/");
      }
    };

    initializeVideoCall();
  }, [roomId, navigate]);

  const handleEndCall = () => {
    setCallStatus("ended");
    navigate("/");
  };

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

  if (isWaiting) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-white text-lg">
            Waiting for doctor to join...
          </p>
          <button
            onClick={handleEndCall}
            className="mt-6 flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            <PhoneOff size={20} />
            <span>End Call</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={handleEndCall}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          <PhoneOff size={20} />
          <span>End Call</span>
        </button>
      </div>
      <div ref={meetingContainerRef} className="w-full h-screen"></div>
    </div>
  );
};

export default VideoCall;
