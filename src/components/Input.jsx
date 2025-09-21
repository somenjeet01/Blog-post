import React, { useId, useState } from "react";

const Input = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    error = "",
    icon,
    required = false,
    ...props
  },
  ref
) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 mb-1"
          htmlFor={id}
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        className={`
                relative rounded-lg shadow-sm
                ${
                  error
                    ? "ring-2 ring-red-500 shadow-red-100"
                    : isFocused
                    ? "ring-2 ring-blue-500 shadow-blue-100"
                    : "ring-1 ring-blue-200 hover:ring-blue-300"
                }
                transition-all duration-300
            `}
      >
        {/* Icon */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{icon}</span>
          </div>
        )}

        {/* Input */}
        <input
          type={showPassword ? "text" : type}
          className={`
                        block w-full rounded-lg
                        ${icon ? "pl-10" : "pl-4"} pr-4 py-3
                        bg-white text-blue-900 placeholder:text-blue-300 placeholder:font-light
                        text-base focus:outline-none
                        disabled:bg-blue-50 disabled:text-blue-300
                        ${className}
                    `}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={ref}
          {...props}
          id={id}
        />

        {/* Password Toggle */}
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <span className="text-gray-500">👁️</span>
            ) : (
              <span className="text-gray-500">👁️‍🗨️</span>
            )}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
});

export default Input;
