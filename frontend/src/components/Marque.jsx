import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";

const Marquee = ({
  children,
  direction = "left",
  speed = 50,
  pauseOnHover = true,
  className = "",
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const contentRef = useRef(null);

  return (
    <div
      className={`overflow-hidden relative w-full ${className}`}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        ref={contentRef}
        className="flex whitespace-nowrap animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {/* Duplicate content for infinite scrolling effect */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-4">
            {children}
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes marquee {
            from { transform: translateX(0%); }
            to { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee linear infinite;
          }
        `}
      </style>
    </div>
  );
};

const ReviewCard = ({ avatar, name, rating, review }) => (
  <div className="w-80 p-4 bg-white rounded-lg border border-gray-300 shadow-sm">
    <div className="flex items-center gap-3 mb-3">
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <h3 className="font-medium text-gray-900">{name}</h3>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4"
              style={{
                fill: i < rating ? "yellow" : "gray",
                color: i < rating ? "yellow" : "gray",
              }}
            />
          ))}
        </div>
      </div>
    </div>
    <p className="text-sm text-gray-600">{review}</p>
  </div>
);

export { Marquee, ReviewCard };
