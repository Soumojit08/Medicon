import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoCall = () => {
  const { roomId } = useParams(); // Extract roomId from URL
  const appID = 1943313691; // ZEGOCLOUD App ID
  const appSign =
    "da2ec159e961a89c0185687e37abeea9ce7af5cafe9af29f5c3b288573068ae7"; // ZEGOCLOUD App Sign
  const meetingContainerRef = useRef(null); // Ref for the meeting container

  // Generate a unique userId and userName
  const userId = localStorage.getItem("userId") || `guest_${Date.now()}`;
  const userName = localStorage.getItem("userName") || "Guest";

  useEffect(() => {
    if (!roomId) {
      console.error("Room ID is required but not provided.");
      return;
    }

    try {
      // Generate the kit token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        parseInt(appID), // Ensure appID is a number
        appSign,
        roomId,
        userId,
        userName
      );

      // Create the ZegoUIKitPrebuilt instance
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Join the room
      zp.joinRoom({
        container: meetingContainerRef.current,
        sharedLinks: [
          {
            name: "Copy Link",
            url: `${window.location.origin}/video-call/${roomId}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    } catch (error) {
      console.error("Error starting the meeting:", error);
    }
  }, [roomId]); // Run this effect only when roomId changes

  return (
    <div
      ref={meetingContainerRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
};

export default VideoCall;
