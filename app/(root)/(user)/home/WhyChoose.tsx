"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiTrendingUp, FiBookOpen, FiSettings, FiLink2, FiPlay } from "react-icons/fi";
import { images } from "@/constants";

const WhyChoose = () => {
  const [isVideoHovered, setIsVideoHovered] = useState(false);

  const features = [
    {
      icon: <FiBookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: "Explore Opportunities",
      description:
        "Discover untapped markets, strategies, and pathways that position your brand ahead",
    },
    {
      icon: <FiSettings className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: "Performance Systems",
      description:
        "Design processes, tools, and campaigns that keep growth measurable and sustainable.",
    },
    {
      icon: <FiLink2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
      title: "Collaborative Advantage",
      description:
        "Empower teams and partners with frameworks that enhance innovation and execution.",
    },
  ];

  return (
    <section className="w-full bg-black py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-2 sm:px-4 py-2 text-xs sm:text-sm text-black">
            <span className="text-black">
              <FiTrendingUp size={16} className="" />
            </span>
            <span className="font-medium">Growth unlocked</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-white mb-4 sm:mb-5 md:mb-6 text-center max-w-full sm:max-w-2xl mx-auto"
        >
          Why Choose Brand Locus?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-base md:text-md lg:text-lg text-[#E5E5E5] leading-relaxed max-w-full sm:max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 text-center"
        >
          We are the partner that helps you discover opportunities, strengthen
          your brand, and drive sustainable business growth.
        </motion.p>

        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-12 sm:mb-16 md:mb-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-gray-600 aspect-21/9 max-w-5xl mx-auto"
          onMouseEnter={() => setIsVideoHovered(true)}
          onMouseLeave={() => setIsVideoHovered(false)}
        >
          {/* Video Background/Thumbnail */}
          <div className="absolute inset-0">
            <Image
              src={images.empowerment}
              alt="Brand Locus team collaboration"
              fill
              className="object-cover"
              priority={false}
            />
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer z-10">
            <motion.div
              animate={{
                scale: isVideoHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.2 }}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center shadow-lg"
            >
              <FiPlay className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-black ml-1" />
            </motion.div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="space-y-4 sm:space-y-5"
            >
              {/* Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-md text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
