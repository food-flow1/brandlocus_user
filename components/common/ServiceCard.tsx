"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiCheck } from "react-icons/fi";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IoIosCheckmarkCircle } from "react-icons/io";

export interface ServiceCardProps {
  badge: string;
  title: string;
  description: string;
  features: string[];
  link: string;
  delay?: number;
  className?: string;
  badgeClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  linkText?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  badge,
  title,
  description,
  features,
  link,
  delay = 0,
  className,
  badgeClassName,
  titleClassName,
  descriptionClassName,
  linkText = "Learn More",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
      className={cn("space-y-4 sm:space-y-5 md:space-y-6", className)}
    >
      {/* Badge */}
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 sm:px-4 py-1 text-xs sm:text-sm text-gray-600",
          badgeClassName
        )}
      >
        {badge}
      </span>

      {/* Title */}
      <h3
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl font-bold text-black leading-tight",
          titleClassName
        )}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={cn(
          "text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-full sm:max-w-xl",
          descriptionClassName
        )}
      >
        {description}
      </p>

      {/* Features */}
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3 border border-[#E6E9EE] rounded-full p-1">
            <IoIosCheckmarkCircle size={30} className="text-black mt-0.5 shrink-0" />
            <span className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Learn More Link */}
      <Link
        href={link}
        className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-black hover:text-gray-600 transition-colors group w-max"
      >
        <span>{linkText}</span>
        <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;

