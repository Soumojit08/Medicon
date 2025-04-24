import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import payment from "../assets/payment.jpg";

const BuyMeACoffee = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 300, height: 300 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (submitted) {
      setShowConfetti(true);
      const audio = new Audio(
        "https://www.myinstants.com/media/sounds/yay.mp3"
      );
      audio.play().catch(() => {});
      setTimeout(() => setShowConfetti(false), 7000);
    }
  }, [submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-50 to-blue-100">
      <style>
        {`
          .star-rain span {
            position: absolute;
            top: -5%;
            animation: fall-stars 6s infinite linear;
            font-size: 2rem;
            opacity: 0.8;
          }

          @keyframes fall-stars {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0;
            }
            100% {
              transform: translateY(110vh) rotate(720deg);
              opacity: 1;
            }
          }

          .heart {
            font-size: 10rem;
            animation: heart-enter 1s ease-out forwards, heart-pop 0.5s ease-in-out 1.2s forwards;
            transform: scale(0);
            z-index: 30;
          }

          @keyframes heart-enter {
            to {
              transform: scale(1);
            }
          }

          @keyframes heart-pop {
            0% {
              transform: scale(1);
              color: #ff69b4;
            }
            100% {
              transform: scale(0.5) rotate(20deg);
              color: #ff4d4f;
            }
          }

          .fade-in {
            animation: fade 1.5s ease-out forwards;
            opacity: 0;
          }

          @keyframes fade {
            to {
              opacity: 1;
            }
          }
        `}
      </style>

      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} />
      )}

      {/* Falling Stars/Flowers */}
      <div className="star-rain w-full h-full absolute top-0 left-0 pointer-events-none z-10">
        {[...Array(20)].map((_, i) => (
          <span
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
            }}
          >
            {["🌸", "⭐️", "💮", "💫", "🌟", "🌼"][i % 6]}
          </span>
        ))}
      </div>

      {!submitted ? (
        <div className="z-20 flex flex-col items-center text-center p-4">
          <img
            src={payment}
            alt="Scan to pay"
            className="w-64 rounded shadow mb-4"
          />
          <h2 className="text-xl text-gray-700 font-semibold">
            After payment, enter your name
          </h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              type="submit"
              className="ml-3 px-4 py-2 bg-pink-500 text-white rounded shadow hover:bg-pink-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <>
          <div className="heart absolute top-[30%] z-30">💖</div>
          <div className="z-30 text-center mt-72 fade-in">
            <h1 className="text-4xl font-bold text-pink-600 mb-2">
              Thank you, {name}!
            </h1>
            <p className="text-xl text-gray-700">
              You just made someone's day better 💕
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default BuyMeACoffee;
