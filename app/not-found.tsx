"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ROUTES } from "@/constants/routes";
import { IoCheckmark } from "react-icons/io5";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Abstract Background Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left side curved line */}
        <svg
          className="absolute left-0 bottom-0 w-1/4 sm:w-1/3 h-full opacity-10 sm:opacity-20"
          viewBox="0 0 400 1000"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,1000 Q150,800 100,600 Q50,400 150,300 Q200,200 100,0"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        
        {/* Right side curved line */}
        <svg
          className="absolute right-0 bottom-0 w-1/4 sm:w-1/3 h-full opacity-10 sm:opacity-20"
          viewBox="0 0 400 1000"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M400,1000 Q250,800 300,600 Q350,400 250,300 Q200,200 300,0"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        {/* 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8 md:mb-10"
        >
          <h1 className="text-8xl sm:text-9xl md:text-[12rem] lg:text-[14rem] font-bold text-gray-400 leading-none">
            404
          </h1>
        </motion.div>

        {/* Oops Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-600 mb-4 sm:mb-6">
            Oops page not found
          </h2>
        </motion.div>

        {/* Apology Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16 leading-relaxed"
        >
          We regret to inform you that the Page you're searching for seems to be beyond our grasp. We apologize for any inconvenience this may cause.
        </motion.p>

        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center gap-3 sm:gap-4 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-black rounded-full font-medium text-sm sm:text-base md:text-lg hover:bg-gray-100 transition-colors"
          >
            <IoCheckmark className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-black" />
            <span>Back to Home Page</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

