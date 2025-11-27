"use client";

import React from "react";

interface CustomInputBaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
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
  error: externalError,
  name,
  value,
  onChange,
  ...inputProps
}) => {
  const error = externalError;

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
      <input
        {...inputProps}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full rounded-2xl border px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 ${styles.input} ${error ? styles.inputError : ""} ${className}`}
      />
      {error && (
        <p className={`text-sm ${variant === "dark" ? "text-red-400" : "text-red-600"}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default CustomInputBase;

