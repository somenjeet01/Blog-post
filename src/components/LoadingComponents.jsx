import React from "react";

// Loading spinner component
export const LoadingSpinner = ({ size = "md", color = "blue-600" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <svg
      className={`animate-spin ${sizeClasses[size]} text-${color}`}
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
  );
};

// Full screen loading overlay
export const LoadingOverlay = ({
  message = "Loading...",
  show = true,
  variant = "default", // default, auth, post
}) => {
  if (!show) return null;

  const getVariantContent = () => {
    switch (variant) {
      case "auth":
        return {
          title: "Authenticating...",
          subtitle: "Please wait while we sign you in",
          icon: (
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          ),
        };
      case "post":
        return {
          title: "Processing Post...",
          subtitle: "Saving your content",
          icon: (
            <div className="relative">
              <div className="w-16 h-16 border-4 border-green-200 rounded-full animate-spin border-t-green-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
            </div>
          ),
        };
      default:
        return {
          title: message,
          subtitle: "Please wait a moment",
          icon: <LoadingSpinner size="xl" />,
        };
    }
  };

  const content = getVariantContent();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm mx-4 text-center">
        <div className="flex justify-center mb-6">{content.icon}</div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {content.title}
        </h3>

        <p className="text-gray-600 text-sm">{content.subtitle}</p>

        {/* Animated dots */}
        <div className="flex justify-center items-center mt-4 space-x-1">
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Page loading skeleton
export const PageLoadingSkeleton = ({ type = "posts" }) => {
  if (type === "posts") {
    return (
      <div className="w-full min-h-screen bg-gradient-to-bl from-blue-100 via-blue-50 to-blue-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            {/* Header skeleton */}
            <div className="bg-white/50 h-12 rounded-xl w-64"></div>

            {/* Featured post skeleton */}
            <div className="bg-white/50 h-72 rounded-2xl w-full"></div>

            {/* Posts grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-white/50 h-64 rounded-xl flex flex-col p-6"
                >
                  <div className="bg-gray-300/50 h-32 rounded-lg mb-4"></div>
                  <div className="bg-gray-300/50 h-4 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-300/50 h-3 rounded w-1/2 mb-4"></div>
                  <div className="bg-gray-300/50 h-3 rounded w-full mb-1"></div>
                  <div className="bg-gray-300/50 h-3 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-bl from-blue-100 via-blue-50 to-blue-100 py-8 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
