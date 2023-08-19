import React from "react";

const Wrapper = ({ children, className }) => {
  return (
    <div
      className={`w-full max-w-[1280px] md:px-10 px-5 mx-auto ${
        className || ""
      }`}>
      {children}
    </div>
  );
};

export default Wrapper;
