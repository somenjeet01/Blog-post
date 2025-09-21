import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center" style={{ width }}>
      <svg
        className="w-8 h-8 text-blue-600 mr-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeLinecap="round" />
      </svg>
      <span className="font-bold text-xl text-blue-600 tracking-tight">
        Mega<span className="text-blue-800 font-extrabold">Blog</span>
      </span>
    </div>
  );
}

export default Logo;
