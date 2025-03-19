import React, { useState } from "react";
import AIbot from "../assets/robo.svg";
import { X } from "lucide-react";

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages([
        ...newMessages,
        { text: "This is a bot response.", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col p-4 relative">
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={toggleChat}
          >
            <X size={20} />
          </button>
          <div className="flex-1 overflow-y-auto p-2 border-b border-gray-200">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded-md"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      )}
      <div
        className="w-14 h-14 flex items-center justify-center rounded-full bg-green-500 shadow-lg cursor-pointer transition-transform transform hover:scale-110"
        onClick={toggleChat}
      >
        <img src={AIbot} className="w-8 h-8 text-white invert" alt="Chatbot" />
      </div>
    </div>
  );
};

export default ChatInterface;
