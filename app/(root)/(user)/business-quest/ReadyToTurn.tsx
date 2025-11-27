"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { icons } from "@/constants";
import { FiArrowUpRight } from "react-icons/fi";

const ReadyToTurn = () => {
  // Generate random particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <section className="bg-white py-6 sm:py-8 md:py-10 lg:py-12 relative overflow-hidden">
      <div className="w-full max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Black Rounded Container */}
        <div className="bg-black rounded-3xl sm:rounded-[3rem] relative overflow-hidden py-14 md:py-16 lg:py-20">
          {/* Background Abstract Shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gray-800/30 blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gray-800/30 blur-3xl"
              animate={{
                x: [0, -50, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 px-4 sm:px-6 md:px-8">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
          >
            Ready To Turn Meetings
            <br />
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Into Momentum
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            Limited cohorts. We'll invite randomly to keep it fair.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-4"
          >
            <button className="inline-flex items-center cursor-pointer justify-center gap-3 bg-white text-black px-8 sm:px-10 md:px-12 lg:px-14 py-3 sm:py-4 md:py-5 rounded-full font-semibold text-base sm:text-lg md:text-xl hover:bg-gray-100 transition-colors group">
              <span>Join the Playtest List</span>
              <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center">
                <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </button>
          </motion.div>

          {/* Trusted By Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4 sm:space-y-6 pt-8 sm:pt-12"
          >
            <p className="text-sm sm:text-base md:text-lg text-gray-400 uppercase tracking-wider font-medium">
              TRUSTED BY 10+ COMPANIES
            </p>

            {/* Company Logos - Marquee */}
            <div className="relative overflow-hidden py-2">
              <Marquee gradient={false} speed={40} pauseOnHover className="flex items-center gap-6 sm:gap-8 md:gap-10">
                {[icons.spot, icons.sureid, icons.dbn, icons.smedan, icons.wecan, icons.butterfly, icons.hvc].map((logoSrc, index) => (
                  <div key={index} className="flex items-center justify-center mx-2 sm:mx-3 md:mx-4 opacity-80 hover:opacity-100 transition-opacity">
                    <Image
                      src={logoSrc}
                      alt="company logo"
                      width={140}
                      height={80}
                      className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToTurn;