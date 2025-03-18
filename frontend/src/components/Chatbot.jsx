import React from "react";
import AIbot from "../assets/robot-fill-svgrepo-com.svg";

const Chatbot = () => {
  return (
    <div className="fixed bottom-8 right-8 w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 shadow-lg cursor-pointer transition-transform transform hover:scale-110 z-[9999]">
      <img src={AIbot} className="w-8 h-8 text-white invert" alt="Chatbot" />
    </div>
  );
};

export default Chatbot;
