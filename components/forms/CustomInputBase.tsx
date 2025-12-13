"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { LuEye, LuEyeClosed } from "react-icons/lu";

interface CustomInputBaseProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  label?: string;
  variant?: "dark" | "light";
  containerClassName?: string;
  error?: string;
  name?: string;
}

const CustomInputBase: React.FC<CustomInputBaseProps> = ({
  label,
  variant = "dark",
  containerClassName = "",
  className = "",
  error,
  name,
  value,
  onChange,
  type,
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputRef = useRef<HTMLInputElement>(null);

  const styles =
    variant === "dark"
      ? {
          label: "text-white/70",
          input:
            "border-white/10 bg-black/40 text-white placeholder-white/40 focus:ring-white/30",
          inputError: "border-red-500/50 focus:ring-red-500/50",
        }
      : {
          label: "text-gray-600",
          input:
            "border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-gray-400",
          inputError: "border-red-500 focus:ring-red-500",
        };

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className={`block text-sm font-medium ${styles.label}`}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...inputProps}
          ref={inputRef}
          name={name}
          value={value}
          onChange={onChange}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          data-dark={variant === "dark" ? "true" : "false"}
          className={`w-full rounded-2xl border px-4 py-3 text-sm bg-transparent sm:text-base focus:outline-none focus:ring-2 ${styles.input} ${
            error ? styles.inputError : ""
          } ${isPassword ? "pr-12" : ""} ${className}`}
        />

        {isPassword && (
          // <button
          //   type="button"
          //   onClick={() => setShowPassword(!showPassword)}
          //   className={`absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 ${
          //     variant === "dark"
          //       ? "text-white/70 hover:text-white"
          //       : "text-gray-500 hover:text-gray-700"
          //   } transition-colors`}
          // >
          //   {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          // </button>

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute cursor-pointer bg-black/40 text-white rounded-lg p-2 right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {!showPassword ? (
                 <LuEye />
                ) : (
                  <LuEyeClosed />
                )}
              </button>
        )}
      </div>
      {error && (
        <p
          className={`text-sm ${
            variant === "dark" ? "text-red-400" : "text-red-600"
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomInputBase;
