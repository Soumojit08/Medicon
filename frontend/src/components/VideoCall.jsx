import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { toast } from "react-hot-toast";
import axiosInstance from "../libs/axios";

const VideoCall = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { doctor } = state || {};
  const [isLoading, setIsLoading] = useState(true);
  const zegoRef = useRef(null);

  const appId = 1506791970;
  const serverSecret = "9b64224b2e9a099575e998495f402395";

  useEffect(() => {
    let mounted = true;

    const initializeVideoCall = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId || !roomId || !doctor) {
          toast.error("Missing required data for video call");
          navigate("/patientDashboard");
          return;
        }

        // Get user data
        const response = await axiosInstance.get(`/api/v1/users/${userId}`);
        const userData = response.data?.data;

        if (!userData) {
          toast.error("Failed to fetch user data");
          navigate("/patientDashboard");
          return;
        }

        // Generate token and initialize call
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appId,
          serverSecret,
          roomId,
          userData._id,
          userData.name
        );

        // Only create and join room if not already done
        if (!zegoRef.current && mounted) {
          const zp = ZegoUIKitPrebuilt.create(kitToken);
          zegoRef.current = zp;

          // Join room with ZegoCloud's default UI
          zp.joinRoom({
            container: document.querySelector("#video-container"),
            scenario: {
              mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            showPreJoinView: true,
            showLeavingView: true,
            onLeave: () => {
              zegoRef.current = null;
              navigate("/patientDashboard");
            },
            showUserList: true,
            turnOnMicrophoneWhenJoining: true,
            turnOnCameraWhenJoining: true,
            showMyCameraToggleButton: true,
            showMyMicrophoneToggleButton: true,
            showAudioVideoSettingsButton: true,
            showScreenSharingButton: true,
            showTextChat: true,
            showUserList: true,
            maxUsers: 2,
            layout: "Grid",
            showLayoutButton: true,
            showSetupScreen: true,
          });
        }

        if (mounted) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error in video call:", error);
        if (mounted) {
          toast.error("Failed to initialize video call");
          navigate("/patientDashboard");
        }
      }
    };

    initializeVideoCall();

    // Cleanup function
    return () => {
      mounted = false;
      if (zegoRef.current) {
        zegoRef.current.destroy();
        zegoRef.current = null;
      }
    };
  }, [roomId, doctor, navigate]);

  return (
    <div className="relative min-h-screen bg-zinc-100">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
        </div>
      ) : null}
      <div id="video-container" className="h-screen w-full" />
    </div>
  );
};

export default VideoCall;
