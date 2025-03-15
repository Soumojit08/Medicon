import React from "react";
import docImg from "../assets/2.jpg";

const Image = () => {
  return (
    <div className="h-20 w-20 rounded-full border-blue-600 border-4 overflow-hidden flex items-center justify-center ">
      <img
        src={docImg}
        alt={"User"}
        className="mx-auto h-full w-full object-cover"
      />
    </div>
  );
};

export default Image;
