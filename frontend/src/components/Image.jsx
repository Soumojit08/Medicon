import React, { useEffect, useState } from "react";
import docImg from "../assets/2.jpg";

const Image = ({ pic }) => {
  const [imgSrc, setImgSrc] = useState(docImg);

  useEffect(() => {
    if (pic) {
      setImgSrc(pic);
    } else {
      setImgSrc(docImg);
    }
  }, [pic]);

  return (
    <div className="h-20 w-20 rounded-full border-blue-600 border-4 overflow-hidden flex items-center justify-center ">
      <img
        src={pic}
        alt={"User"}
        className="mx-auto h-full w-full object-cover"
      />
    </div>
  );
};

export default Image;
