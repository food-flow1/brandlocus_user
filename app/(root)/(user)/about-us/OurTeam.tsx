"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionBadge from "@/components/common/SectionBadge";
import { HiUsers } from "react-icons/hi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const OurTeam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  // Placeholder image URL - using a data URI for a gray placeholder
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect fill='%23e5e7eb' width='400' height='500'/%3E%3C/svg%3E";

  const teamMembers = [
    {
      name: "Charles Adetola",
      title: "Co-Founder & Lead Strategist",
      image: "", // Empty string will trigger placeholder
    },
    {
      name: "Zainab Sanni",
      title: "Communications & Client Relations",
      image: "",
    },
    {
      name: "Dr. Sarah Ajayi",
      title: "HR & Legal Advisor",
      image: "",
    },
    {
      name: "Zainab Sanni",
      title: "Communications & Client Relations",
      image: "",
    },
    {
      name: "Zainab Sanni",
      title: "Communications & Client Relations",
      image: "",
    },
    {
      name: "Zainab Sanni",
      title: "Communications & Client Relations",
      image: "",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const cardsPerPage = 4;
      const nextIndex = prev + cardsPerPage;
      // Loop back to start if we've reached the end
      return nextIndex >= teamMembers.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const cardsPerPage = 4;
      const prevIndex = prev - cardsPerPage;
      // Move to the last valid set if we go negative
      if (prevIndex < 0) {
        const maxIndex = Math.max(0, teamMembers.length - cardsPerPage);
        return maxIndex;
      }
      return prevIndex;
    });
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const getImageSrc = (member: typeof teamMembers[0], index: number) => {
    // If image is empty, null, undefined, or has errored, use placeholder
    if (!member.image || imageErrors[index]) {
      return placeholderImage;
    }
    return member.image;
  };

  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Badge */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <SectionBadge
            text="Our Team"
            icon={<HiUsers className="w-6 h-6" />}
          />
        </div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 text-center mb-4 sm:mb-5 md:mb-6"
        >
          Meet the Experts Behind
          <br />
          Brand Locus
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-base md:text-md lg:text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-16 lg:mb-20"
        >
          A passionate team of strategists, designers, and consultants dedicated to driving business growth, brand impact, and long-term success.
        </motion.p>

        {/* Team Cards Carousel */}
        <div className="relative">
          {/* Cards Container */}
          <div className="overflow-hidden w-full">
            <motion.div
              className="flex gap-6 sm:gap-8"
              animate={{
                x: `calc(-${currentIndex} * (25% + 1.5rem))`,
              }}
              transition={{
                type: "tween",
                ease: "easeInOut",
                duration: 0.5,
              }}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={`${member.name}-${index}`}
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden group shrink-0 w-full sm:w-1/2 lg:w-[calc(25%-1.125rem)]"
                >
                  {/* Card Background with Gradient */}
                  <div className="relative h-[400px] sm:h-[450px] md:h-[500px] bg-gradient-to-b from-gray-700 to-black rounded-xl sm:rounded-2xl overflow-hidden">
                    {/* Member Image */}
                    <div className="absolute inset-0">
                      <Image
                        src={getImageSrc(member, index)}
                        alt={member.name}
                        fill
                        className="object-cover grayscale opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        onError={() => handleImageError(index)}
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    {/* Member Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm sm:text-base md:text-md text-white/90">
                        {member.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center gap-4 mt-8 sm:mt-10">
            <button
              onClick={prevSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 shadow-lg"
              aria-label="Previous team member"
            >
              <IoChevronBack className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 shadow-lg"
              aria-label="Next team member"
            >
              <IoChevronForward className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;