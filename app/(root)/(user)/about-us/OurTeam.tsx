"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionBadge from "@/components/common/SectionBadge";
import { HiUsers } from "react-icons/hi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import { images } from "@/constants";

const OurTeam = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  const [selectedMember, setSelectedMember] = useState<{ name: string; title: string; image: any; bio: string } | null>(null);

  // Placeholder image URL - using a data URI for a gray placeholder
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect fill='%23e5e7eb' width='400' height='500'/%3E%3C/svg%3E";

  const teamMembers = [
    {
      name: "Charles Adetola",
      title: "Co-Founder & Lead Strategist",
      image: images.charles,
      bio: "Charles is the brain behind Brand Locus’ strategy engine. With years of hands-on experience in business development, branding, and project execution, he helps companies cut through noise, clarify direction, and scale with purpose. He blends creativity with disciplined strategy, turning ideas into measurable results."
    },
    {
      name: "Zainab Sanni",
      title: "Communications & Client Relations",
      image: images.zee,
      bio: "Zainab holds a Master’s degree in Media, Communication, and Development, bringing a sharp blend of storytelling, strategic communication, and people-focused engagement to Brand Locus. She manages client relationships with clarity and warmth, ensuring every message is intentional and every interaction moves projects forward. Her insight strengthens how we communicate, connect, and deliver."
    },
    {
      name: "Dr. Shadrah Ajayi",
      title: "HR & Legal Advisor",
      image: "",
      bio: "Dr. Shadrah is a professional psychologist who brings clarity, structure, and people intelligence into every project. Her expertise in human behaviour, organizational culture, and workplace dynamics helps clients build teams that perform and environments where people thrive. Combined with her HR and legal advisory skills, she ensures decisions are both human-centered and strategically sound."
    },
  ];

  const [visibleCards, setVisibleCards] = React.useState(3);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Safety reset for currentIndex when visibleCards changes
  React.useEffect(() => {
    const maxIndex = Math.max(0, teamMembers.length - visibleCards);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCards, teamMembers.length, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex > teamMembers.length - visibleCards ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1;
      if (prevIndex < 0) {
        return Math.max(0, teamMembers.length - visibleCards);
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
    <section className="w-full bg-gray-50 py-12 sm:py-16 md:py-20 lg:py-24 relative">
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
              className="flex gap-6 sm:gap-8 justify-start"
              animate={{
                x: visibleCards === 1 
                  ? `calc(-${currentIndex} * (100% + 1.5rem))`
                  : visibleCards === 2
                  ? `calc(-${currentIndex} * (50% + 1rem))`
                  : `calc(-${currentIndex} * (33.333% + 1.25rem))`,
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
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden group shrink-0 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] cursor-pointer"
                  onClick={() => setSelectedMember(member)}
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
          {teamMembers?.length > visibleCards && <div className="flex justify-center items-center gap-4 mt-8 sm:mt-10">
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
          </div>}
        </div>
      </div>

      {/* Member Details Modal */}
      <AnimatePresence>
        {selectedMember && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="bg-white rounded-3xl w-full max-w-lg md:max-w-2xl max-h-[90vh] overflow-y-auto relative pointer-events-auto shadow-2xl overflow-hidden flex flex-col md:flex-row">

                {/* Close Button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white text-black shadow-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200 z-20 hover:scale-110 active:scale-95"
                  aria-label="Close modal"
                >
                  <FiX className="w-5 h-5" />
                </button>

                {/* Left Side (Image) - Mobile: Top */}
                <div className="w-full md:w-2/5 h-[320px] sm:h-[400px] md:h-auto relative bg-gray-100 shrink-0">
                  <Image
                    src={selectedMember.image || placeholderImage}
                    alt={selectedMember.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Right Side (Content) - Mobile: Bottom */}
                <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                      {selectedMember.name}
                    </h3>
                    <p className="text-sm sm:text-base font-medium text-gray-500 uppercase tracking-wide mb-6">
                      {selectedMember.title}
                    </p>
                    <div className="prose prose-sm sm:prose-base text-gray-600 leading-relaxed">
                      <p>{selectedMember.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurTeam;