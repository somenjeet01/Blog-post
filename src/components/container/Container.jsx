import React from "react";

function Container({ children, className = "", background = false }) {
  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ${
        background ? "backdrop-blur-sm rounded-lg shadow-sm" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Container;
