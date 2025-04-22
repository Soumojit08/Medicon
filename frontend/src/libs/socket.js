import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

// Basic connection logging
socket.on("connect", () => {
  console.log("Socket connected!");
});

socket.on("disconnect", () => {
  console.log("Socket disconnected!");
});

// Log all incoming events
socket.onAny((eventName, ...args) => {
  console.log(`Received event: ${eventName}`, args);
});

export default socket;
