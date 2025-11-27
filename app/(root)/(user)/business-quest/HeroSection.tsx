"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { images } from '@/constants';

const HeroSection = () => {
  return (
    <section className="w-full pt-4 sm:py-8 md:py-10 lg:py-12 overflow-x-hidden ">
      <div className="max-width-container mx-auto sm:px-3 md:px-4 lg:px-6 xl:px-10 ">
        <div className="relative h-[400px] sm:h-[500px]">
          {/* Left Side Cards - Desktop: left side, Mobile: below cube */}
          <div className="absolute left-1/2 -translate-x-1/2 lg:left-[6%] lg:translate-x-0 top-[-10%] lg:top-1/3 lg:-translate-y-1/2 w-full max-w-[450px] lg:max-w-none lg:w-auto z-30 space-y-4 lg:space-y-2">
            {/* Transform Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: [0, -5, 0]
              }}
              transition={{ 
                opacity: { duration: 0.6 },
                x: { duration: 0.6 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }
              }}
              className="relative w-full lg:w-[450px] mx-auto lg:mx-0"
            >
              <Image
                src={images.transformCard}
                alt="Transform abstract strategy into hands-on decisions"
                className='w-full h-full object-cover bg-transparent'
                style={{ background: 'transparent' }}
              />
            </motion.div>

            {/* Think Faster Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: [0, -5, 0]
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.1 },
                x: { duration: 0.6, delay: 0.1 },
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7
                }
              }}
              className="relative w-full lg:w-[450px] mx-auto lg:mx-0 hidden lg:block"
            >
              <Image
                src={images.thinkFasterCard}
                alt="Think faster, decide smarter"
                className='w-full h-full object-cover bg-transparent'
                style={{ background: 'transparent' }}
              />
            </motion.div>
          </div>

          {/* Center - 3D Cube */}
          <div className="absolute left-1/2 top-0 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 w-full max-w-lg z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -10, 0]
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.2 },
                scale: { duration: 0.8, delay: 0.2 },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }
              }}
              className="relative w-full aspect-square"
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
              animate={{ 
                opacity: 1, 
                y: [0, -8, 0]
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.4 },
                y: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }}
              className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[90%]"
            >
              <div className="relative w-full aspect-[4/1] overflow-hidden">
                <Image
                  src={images.foundersCard}
                  alt="For Founder and teams"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Side - Checklist - Desktop: right side, Mobile: at bottom */}
          <div className="absolute hidden lg:block left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-[20%] top-auto lg:top-1/3 bottom-0 lg:bottom-auto lg:-translate-y-1/2 w-full max-w-[200px] lg:max-w-none lg:w-auto z-30">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: [0, -6, 0]
              }}
              transition={{ 
                opacity: { duration: 0.6, delay: 0.3 },
                x: { duration: 0.6, delay: 0.3 },
                y: {
                  duration: 3.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }
              }}
              className="relative w-full lg:w-[200px] mx-auto lg:mx-0"
            >
              <Image
                src={images.betterCard}
                alt="Better meetings checklist"
                className='w-full h-full object-cover bg-transparent'
                style={{ background: 'transparent' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
