"use client";

import React from 'react';
import { motion } from 'framer-motion';

const WhyItWorks = () => {
  const features = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="6" r="2" fill="white"/>
          <circle cx="12" cy="6" r="2" fill="white"/>
          <circle cx="18" cy="6" r="2" fill="white"/>
          <circle cx="6" cy="18" r="2" fill="white"/>
          <circle cx="12" cy="18" r="2" fill="white"/>
          <circle cx="18" cy="18" r="2" fill="white"/>
        </svg>
      ),
      title: "Realistic Pressure",
      description: "The dice adds uncertainty, just like real business challenges."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 4H16C17.1 4 18 4.9 18 6V10C18 11.1 17.1 12 16 12H14V16C14 17.1 13.1 18 12 18H8C6.9 18 6 17.1 6 16V6C6 4.9 6.9 4 8 4Z" fill="white"/>
          <circle cx="12" cy="8" r="1.5" fill="black"/>
        </svg>
      ),
      title: "Structured thinking",
      description: "Cards channel frameworks into action."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Consequences",
      description: "A built-in debrief makes the learning stick."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 4V10H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 20V14H17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20.49 9C19.89 6.52 18.17 4.35 15.66 3.06C13.15 1.77 10.24 1.5 7.5 2.29L1 4M23 20L16.5 21.71C13.76 22.5 10.85 22.23 8.34 20.94C5.83 19.65 4.11 17.48 3.51 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Repeatability",
      description: "No two sessions are the same."
    }
  ];

  return (
    <section className="w-full bg-white py-4 sm:py-6 md:py-8 lg:py-10">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left Side */}
          <div className="space-y-6">
            {/* Badge Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900"/>
              </svg>
              <span className="text-sm sm:text-base text-gray-900 font-medium">
                Why It Works
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight sm:w-[80%]"
            >
              What Makes Business Quest Different
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg text-gray-600 leading-relaxed sm:w-[80%]"
            >
              Business Quest blends chance with structure to create real, lasting impact.
            </motion.p>
          </div>

          {/* Right Side - Feature Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-gray-100 rounded-xl p-6 sm:p-8"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-md font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyItWorks;