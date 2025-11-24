"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { images } from '@/constants';

const HeroSection = () => {
  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-center relative">
          {/* Left Side Cards */}
          <div className="space-y-6 sm:space-y-8">
            {/* Transform Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="transition-shadow"
            >
              <div className="relative w-full sm:w-[400px] aspect-[4/3]">
                <Image
                  src={images.transformCard}
                  alt="Transform abstract strategy into hands-on decisions"
                  className='w-full h-full object-cover'
                  fill
                />
              </div>
            </motion.div>

            {/* Think Faster Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="transition-shadow"
              >
                <div className="relative w-full sm:w-[400px] aspect-[4/3]">
                  <Image
                    src={images.thinkFasterCard}
                    alt="Think faster, decide smarter"
                    className='w-full h-full object-cover'
                    fill
                  />
                </div>
            </motion.div>
          </div>

          {/* Center - 3D Cube */}
          <div className="relative order-first lg:order-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-square max-w-lg mx-auto"
            >
              <Image
                src={images.businessQuestHero}
                alt="Business Quest Cube"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Founders Card - Overlapping at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] sm:w-[85%] max-w-sm"
            >
              <div className="relative w-full aspect-[4/3] rounded-xl shadow-lg overflow-hidden">
                <Image
                  src={images.foundersCard}
                  alt="For Founder and teams"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Side - Checklist */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-4 sm:gap-6"
            >
              {/* Checklist Item */}
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-5 h-5 rounded-full bg-black flex items-center justify-center">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-base sm:text-lg font-medium text-gray-900">
                  Better meetings
                </span>
              </div>

              {/* Checklist Item */}
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-5 h-5 rounded-full bg-black flex items-center justify-center">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-base sm:text-lg font-medium text-gray-900">
                  Sharper meetings
                </span>
              </div>

              {/* Checklist Item */}
              <div className="flex items-center gap-3">
                <div className="shrink-0 w-5 h-5 rounded-full bg-black flex items-center justify-center">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-base sm:text-lg font-medium text-gray-900">
                  Kickstart leadership
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
