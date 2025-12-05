"use client";

import React from "react";
import { useField, useFormikContext } from "formik";
import { motion } from "framer-motion";

interface CustomCheckboxProps {
  name: string;
  label?: string | React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
  disabled?: boolean;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  name,
  label,
  variant = "dark",
  className = "",
  disabled = false,
}) => {
  const [field, meta] = useField({ name, type: "checkbox" });
  const { setFieldValue } = useFormikContext();

  const hasError = meta.touched && meta.error;

  const styles =
    variant === "dark"
      ? {
          container: "text-white",
          checkbox: {
            checked: "bg-white border-white",
            unchecked: "bg-black/40 border-white/30",
            error: "border-red-500/50",
            disabled: "opacity-50 cursor-not-allowed",
          },
          label: "text-white/70",
          error: "text-red-400",
        }
      : {
          container: "text-gray-900",
          checkbox: {
            checked: "bg-gray-900 border-gray-900",
            unchecked: "bg-white border-gray-300",
            error: "border-red-500",
            disabled: "opacity-50 cursor-not-allowed",
          },
          label: "text-gray-700",
          error: "text-red-600",
        };

  return (
    <div className={`space-y-2 ${className}`}>
      <label
        className={`flex items-center gap-3 cursor-pointer ${disabled ? "cursor-not-allowed" : ""} ${styles.container}`}
      >
        {/* Custom Checkbox */}
        <div className="relative mt-0.5 flex-shrink-0">
          <input
            type="checkbox"
            {...field}
            checked={field.value}
            onChange={(e) => {
              if (!disabled) {
                setFieldValue(name, e.target.checked);
              }
            }}
            disabled={disabled}
            className="sr-only"
          />
          <motion.div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              field.value
                ? styles.checkbox.checked
                : styles.checkbox.unchecked
            } ${
              hasError ? styles.checkbox.error : ""
            } ${disabled ? styles.checkbox.disabled : ""} ${
              !disabled ? "cursor-pointer" : ""
            }`}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            animate={{
              scale: field.value ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {field.value && (
              <motion.svg
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={variant === "dark" ? "text-black" : "text-white"}
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.svg>
            )}
          </motion.div>
        </div>

        {/* Label */}
        {label && (
          <span className={`text-sm leading-relaxed ${styles.label} ${disabled ? "opacity-50" : ""}`}>
            {label}
          </span>
        )}
      </label>

      {/* Error Message */}
      {hasError && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs ${styles.error} ml-8`}
        >
          {meta.error}
        </motion.p>
      )}
    </div>
  );
};

export default CustomCheckbox;

