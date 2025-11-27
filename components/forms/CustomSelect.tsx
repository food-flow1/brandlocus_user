"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";

export type CustomSelectOption = {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
};

interface CustomSelectProps {
  label?: string;
  options: CustomSelectOption[];
  selected?: CustomSelectOption | null;
  onChange: (option: CustomSelectOption) => void;
  placeholder?: string;
  variant?: "dark" | "light";
  className?: string;
  searchable?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  selected,
  onChange,
  placeholder = "Select option",
  variant = "dark",
  className = "",
  searchable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery.trim()) {
      return options;
    }
    const query = searchQuery.toLowerCase();
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(query) ||
        option.description?.toLowerCase().includes(query) ||
        option.id.toLowerCase().includes(query)
    );
  }, [options, searchQuery, searchable]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else if (!isOpen) {
      setSearchQuery("");
    }
  }, [isOpen, searchable]);

  const styles =
    variant === "dark"
      ? {
          button:
            "rounded-2xl border border-white/10 bg-black/40 text-white focus:ring-white/30",
          dropdown: "bg-black/85 border-white/15 text-white",
          labelColor: "text-white/70",
          placeholderColor: "text-white/50",
        }
      : {
          button:
            "rounded-2xl border border-gray-300 bg-white text-gray-900 focus:ring-gray-400",
          dropdown: "bg-white border-gray-200 text-gray-900",
          labelColor: "text-gray-600",
          placeholderColor: "text-gray-400",
        };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className={`block mb-2 text-sm font-medium ${styles.labelColor}`}>
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full px-4 py-3 text-sm sm:text-base flex items-center justify-between focus:outline-none focus:ring-2 ${styles.button}`}
      >
        <span className="flex items-center gap-2">
          {selected?.icon}
          <span
            className={`${
              selected ? "text-current" : styles.placeholderColor
            } font-medium`}
          >
            {selected ? selected.label : placeholder}
          </span>
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`absolute max-h-[400px] flex flex-col left-0 right-0 z-30 mt-2 rounded-2xl border overflow-hidden backdrop-blur-xl shadow-2xl ${styles.dropdown}`}
          >
            {/* Search Input */}
            {searchable && (
              <div className="p-3 border-b border-white/10">
                <div className="relative">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
                  >
                    <path
                      d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className={`w-full pl-9 pr-4 py-2 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 ${
                      variant === "dark"
                        ? "bg-black/40 border border-white/10 text-white placeholder-white/50 focus:ring-white/30"
                        : "bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-gray-400"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}

            {/* Options List */}
            <div className="overflow-y-auto max-h-[300px]">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    type="button"
                    key={option.id}
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm sm:text-base hover:bg-white/10 transition-colors ${
                      selected?.id === option.id ? "bg-white/5" : ""
                    }`}
                  >
                    {option.icon}
                    <div className="flex-1">
                      <p className="font-medium">{option.label}</p>
                      {option.description && (
                        <p className="text-xs opacity-70">{option.description}</p>
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-sm opacity-50">
                  No results found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;