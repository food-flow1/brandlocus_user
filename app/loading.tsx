"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { icons } from "@/constants";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-[#050505] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8">
        {/* Logo with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Rotating Ring Around Logo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-24 h-24 border-2 border-white/10 rounded-full"></div>
          </motion.div>
          
          {/* Pulsing Ring */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-28 h-28 border border-white/20 rounded-full"></div>
          </motion.div>

          {/* Logo */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10 w-20 h-20 md:w-24 md:h-24"
          >
            <Image
              src={icons.logo}
              alt="Brand Locus Logo"
              width={96}
              height={96}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>
        </motion.div>
        
        {/* Loading Text with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-3"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-white/70 text-sm md:text-base font-medium"
          >
            Loading...
          </motion.div>
          
          {/* Loading Dots */}
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-white/60 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Loading;
