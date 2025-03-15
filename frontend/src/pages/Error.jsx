import React from "react";

const Error = ({ errorMessage }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-100">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl md:text-5xl font-semibold text-gray-800">
          {errorMessage}
        </h1>
        <div className="flex justify-center items-center text-8xl md:text-9xl font-bold text-blue-500 my-8">
          <span className="digit">4</span>
          <span className="digit">0</span>
          <span className="digit">4</span>
        </div>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you're looking for cannot be found.
        </p>
        <a
          href="/"
          className="home-button bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md inline-block"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default Error;
