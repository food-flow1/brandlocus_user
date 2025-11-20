"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  text: string;
  icon?: string | React.ReactNode;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

const SectionBadge: React.FC<SectionBadgeProps> = ({
  text,
  icon = "@",
  className,
  iconClassName,
  textClassName,
}) => {
  // Determine if icon is a string/text
  const isTextIcon = typeof icon === "string";
  
  // Check if icon is an Image component or img element
  const isImageIcon = React.isValidElement(icon) && 
    (icon.type === Image || 
     (typeof icon.type === "string" && icon.type === "img") ||
     (icon.props && typeof icon.props === "object" && icon.props !== null && "src" in icon.props));

  // Render icon based on type
  const renderIcon = () => {
    if (isTextIcon) {
      // Text/string icon - render with border circle
      return (
      <span
        className={cn(
          "inline-flex items-center justify-center text-[12px] sm:text-sm",
          iconClassName
        )}
      >
        {icon}
      </span>
      );
    }
    
    if (isImageIcon) {
      // Image icon - render without border wrapper but allow custom styling
      return (
        <span
          className={cn(
            "inline-flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 overflow-hidden",
            iconClassName
          )}
        >
          {icon}
        </span>
      );
    }
    
    // SVG or other React component - render with optional border wrapper (can be overridden via iconClassName)
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center ",
          iconClassName
        )}
      >
        {icon}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={cn("mb-6 sm:mb-8", className)}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-4 sm:px-6 py-2 text-xs sm:text-sm text-gray-700">
        {renderIcon()}
        <span className={cn("font-medium", textClassName)}>{text}</span>
      </span>
    </motion.div>
  );
};

export default SectionBadge;

