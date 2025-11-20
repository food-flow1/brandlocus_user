"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import SectionBadge from "@/components/common/SectionBadge";
import { FiSearch } from "react-icons/fi";
import { FiStar } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

const Reviews = () => {
  const testimonials = [
    {
      rating: 5,
      text: "They don't just consult, they partner with you. Every step felt tailored, intentional, and impactful.",
      name: "Damilare Shakrudeen",
      title: "Director",
      company: "HVC",
    },
    {
      rating: 5,
      text: "Beyond the strategies and tools, it's their genuine commitment to our success that sets them apart.",
      name: "Mrs Adeola",
      title: "Director",
      company: "WeCan Leadership Institute",
    },
    {
      rating: 5,
      text: "Professional, innovative, and reliable. Brand Locus gave us the confidence to scale with purpose.",
      name: "Oluwadamilare Afusat",
      title: "Director",
      company: "Jadesola Ltd",
    },
    {
      rating: 5,
      text: "Brand Locus transformed our approach to business development. Their expertise is unmatched.",
      name: "Zainab Sanni",
      title: "CEO",
      company: "MIT Africa",
    },
    {
      rating: 5,
      text: "Working with Brand Locus has been a game-changer for our organization. Highly recommended!",
      name: "John Doe",
      title: "Founder",
      company: "Tech Innovations",
    },
  ];

  return (
    <section className="w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Badge */}
        <div className="flex justify-center">
          <SectionBadge
            text="Reviews"
            icon={<FiSearch className="w-4 h-4" />}
            className="mb-2"
          />
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-gray-800 mb-2 sm:mb-3 md:mb-4 text-center max-w-full sm:max-w-3xl mx-auto"
        >
          What Our Clients Say About Brand Locus
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm md:text-md lg:text-lg text-gray-600 leading-relaxed max-w-full sm:max-w-xl mx-auto mb-8 sm:mb-10 md:mb-12 text-center"
        >
          We've helped brands unlock growth, improve visibility, and build stronger client connections.
        </motion.p>

        {/* Testimonials - Marquee */}
        <div className="relative overflow-hidden py-4">
          <Marquee gradient={false} speed={40} pauseOnHover className="flex gap-4 sm:gap-6 md:gap-8">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow p-4 sm:p-5 md:p-6 w-[280px] sm:w-[300px] md:w-[320px] h-[280px] sm:h-[300px] md:h-[320px] shrink-0 mx-2 sm:mx-3 flex flex-col"
              >
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-6 flex-1">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-3 mt-auto">
                  {/* Profile Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <FiUser className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  </div>

                  {/* Name, Title, Company */}
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-gray-800">
                      {testimonial.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
