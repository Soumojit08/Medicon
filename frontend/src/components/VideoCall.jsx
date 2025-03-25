import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoCall = () => {
  const { roomId } = useParams(); // Extract roomId from URL
  const appID = 1943313691; // ZEGOCLOUD App ID
  const appSign =
    "da2ec159e961a89c0185687e37abeea9ce7af5cafe9af29f5c3b288573068ae7"; // ZEGOCLOUD App Sign
  const meetingContainerRef = useRef(null); // Ref for the meeting container
  const zpInstanceRef = useRef(null); // Ref to store the ZegoUIKitPrebuilt instance

  // Generate a unique userId and userName
  const userId = localStorage.getItem("userId") || `guest_${Date.now()}`;
  const userName = localStorage.getItem("userName") || "Guest";

  useEffect(() => {
    if (!roomId) {
      console.error("Room ID is required but not provided.");
      return;
    }

    // Ensure `joinRoom` is called only once
    if (!zpInstanceRef.current) {
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
        const zpInstance = ZegoUIKitPrebuilt.create(kitToken);
        zpInstanceRef.current = zpInstance; // Store the instance in the ref

        // Join the room
        zpInstance.joinRoom({
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
    }

    // Cleanup function to leave the room when the component unmounts
    return () => {
      if (
        zpInstanceRef.current &&
        typeof zpInstanceRef.current.leaveRoom === "function"
      ) {
        zpInstanceRef.current.leaveRoom();
        zpInstanceRef.current = null; // Reset the instance
      }
    };
  }, [roomId]); // Run this effect only when roomId changes

  return (
    <div
      ref={meetingContainerRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
};

export default VideoCall;
