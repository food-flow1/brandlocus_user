"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { images } from '@/constants';

const Desk = () => {
  const decks = [
    {
      title: "Discovery Cards (45)",
      description: "Explore new markets, test assumptions, and uncover blind spots.",
      image: images.desk1,
    },
    {
      title: "Experience Cards (10)",
      description: "Launch global payment infra with zero custodial exposure",
      image: images.desk2,
    },
    {
      title: "Think Cards (45)",
      description: "Access rapid frameworks and mental models to sharpen decisions",
      image: images.desk3,
    },
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Text Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6"
          >
            Three Decks. Endless Possibilities.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Every draw sparks fresh thinking—whether it's uncovering blind spots, learning from real-world scenarios, or applying rapid mental models.
          </motion.p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:items-stretch">
          {/* Left Large Card - Discovery Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative rounded-3xl sm:rounded-5xl overflow-hidden min-h-[400px] lg:h-full bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${decks[0].image.src || decks[0].image})`
            }}
          >
            <div className="relative w-full h-full flex flex-col items-end justify-end p-6 sm:p-8 md:p-10">
              {/* Card Info */}
              <div className="w-full text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                  {decks[0].title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed">
                  {decks[0].description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Two Stacked Cards */}
          <div className="flex flex-col gap-4 sm:gap-4 lg:h-full">
            {/* Top Right Card - Experience Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative rounded-3xl sm:rounded-5xl overflow-hidden flex-1 min-h-[300px] sm:min-h-[350px] bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: `url(${decks[1].image.src || decks[1].image})`
              }}
            >
              <div className="relative w-full h-full flex flex-col items-end justify-end">
                {/* Card Info */}
                <div className="w-full text-left relative z-10 bg-black/50 backdrop-blur-xs rounded-lg p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                    {decks[1].title}
                  </h3>
                  <p className="text-sm sm:text-base text-white leading-relaxed">
                    {decks[1].description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bottom Right Card - Think Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative rounded-3xl sm:rounded-5xl overflow-hidden flex-1 min-h-[300px] sm:min-h-[350px] bg-no-repeat bg-black bg-cover bg-center"
              style={{
                backgroundImage: `url(${decks[2].image.src || decks[2].image})`
              }}
            >
              <div className="relative w-full h-full flex flex-col items-end justify-end ">
                {/* Card Info */}
                <div className="w-full text-left relative z-10 bg-black/40 backdrop-blur-xs rounded-lg p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
                    {decks[2].title}
                  </h3>
                  <p className="text-sm sm:text-base text-white leading-relaxed">
                    {decks[2].description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Desk;
