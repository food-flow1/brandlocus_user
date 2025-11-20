"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { icons } from "@/constants";
import { FiArrowUpRight } from "react-icons/fi";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Unlock = () => {
  const offerings = [
    "Brand Strategy",
    "Digital Presence",
    "Operational Growth",
  ];

  return (
    <section className=" bg-black py-8 relative overflow-hidden w-[80%] mx-auto rounded-[3rem] my-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }} />
      </div>

      <div className="w-full max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white leading-tight mb-4 sm:mb-5 md:mb-6"
          >
            Unlock business growth with Brand Locus
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm sm:text-md md:text-lg lg:text-xl text-gray-400 leading-relaxed mb-8 sm:mb-10 md:mb-12 max-w-xl mx-auto"
          >
            We will help you enhance your brand performance, optimize operations, and drive sustainable success
          </motion.p>

          {/* Key Offerings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12"
          >
            {offerings.map((offering, index) => (
              <div
                key={index}
                className="flex items-center gap-2 sm:gap-3"
              >
                <IoIosCheckmarkCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
                <span className="text-sm sm:text-base md:text-lg text-white font-medium">
                  {offering}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8 sm:mb-10 md:mb-12 lg:mb-14"
          >
            <button className="inline-flex items-center cursor-pointer justify-center gap-2 sm:gap-2.5 md:gap-3 bg-white text-black px-5 sm:px-7 md:px-9 lg:px-11 py-2.5 sm:py-3 md:py-3.5 lg:py-4 rounded-full w-full sm:w-auto sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px] mx-auto font-semibold text-xs sm:text-sm md:text-base lg:text-lg hover:bg-gray-100 transition-colors group">
              <span>Book a Free Consultation</span>
              <FiArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </motion.div>

          {/* Trusted By Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4 sm:space-y-6"
          >
            <p className="text-xs sm:text-sm md:text-base text-white/70 uppercase tracking-wider">
              Trusted By 10+ Companies
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
    </section>
  );
};

export default Unlock;
