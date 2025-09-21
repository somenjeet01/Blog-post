import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  isLoading = false,
  ...props
}) {
  return (
    <button
      type={type}
      className={`
                px-6 py-2.5 rounded-lg font-medium ${bgColor} ${textColor} ${className}
                transition-all duration-300 ease-in-out
                shadow-md hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px]
                disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-[0px]
                flex items-center justify-center gap-2 relative overflow-hidden
                before:absolute before:inset-0 before:bg-white before:opacity-0 before:hover:opacity-10 before:transition-opacity
            `}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Processing...</span>
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
