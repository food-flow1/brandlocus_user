"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { icons, images } from "@/constants";
import SectionBadge from "@/components/common/SectionBadge";

interface CountUpNumberProps {
  value: string;
  duration?: number;
  startCounting: boolean;
}

const CountUpNumber: React.FC<CountUpNumberProps> = ({ value, duration = 2, startCounting }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Extract numeric value and suffix from strings like "50+", "97%", "10+ Years", "93+"
  const extractNumberAndSuffix = (val: string) => {
    const match = val.match(/^(\d+)(.*)$/);
    if (match) {
      return {
        number: parseInt(match[1], 10),
        suffix: match[2].trim(),
      };
    }
    return { number: 0, suffix: "" };
  };

  const { number: targetNumber, suffix } = extractNumberAndSuffix(value);

  useEffect(() => {
    if (!startCounting || hasStarted) return;

    setHasStarted(true);
    let startTime: number | null = null;
    const startValue = 0;
    const endValue = targetNumber;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000; // Convert to seconds
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [startCounting, hasStarted, targetNumber, duration]);

  return (
    <span>
      {count}{suffix && ` ${suffix}`}
    </span>
  );
};

const HeroSection = () => {
  const metricsSectionRef = useRef(null);
  const isMetricsInView = useInView(metricsSectionRef, { once: true, amount: 0.3 });
  const [isImageLoading, setIsImageLoading] = useState(true);

  const metrics = [
    {
      number: "50+",
      title: "Brands Transformed",
      description: "Helping businesses build stronger identities and achieve measurable growth.",
    },
    {
      number: "97%",
      title: "Client satisfaction",
      description: "Trusted by clients for delivering solutions that drive real results.",
    },
    {
      number: "10+ Years",
      title: "Industry Experience",
      description: "Proven expertise in business development, brand consulting, and marketing.",
    },
    {
      number: "93+",
      title: "Successful Projects",
      description: "From startups to established firms, we empower growth across industries.",
    },
  ];

  return (
    <section className="w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Badge */}
        <div className="mb-6 sm:mb-8">
          <SectionBadge
            text="About Us"
            icon={<Image src={icons.aboutIcon} alt="About Us" width={20} height={20} />}
          />
        </div>

        {/* Headline and Description Grid */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 ">
          {/* Left Side - Headline */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xl md:text-2xl lg:text-3xl xl:text-4xl w-full lg:w-[70%] font-bold leading-tight text-gray-800 mb-4 sm:mb-5 md:mb-6 lg:mb-0"
            >
              Your Partner in Business Growth & Brand Success
            </motion.h1>
          </div>

          {/* Right Side - Description */}
          <div className="flex items-center lg:items-start">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base md:text-md lg:text-[1.05rem] text-gray-700 leading-relaxed"
            >
              At Brand Locus, we believe every business has untapped potential waiting to be discovered. Our journey began with a simple mission to help organizations grow through innovative business development, brand management, marketing, and strategic capacity building.
            </motion.p>
          </div>
        </div>

        {/* Main Team Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 sm:mb-6 md:mb-10 lg:mb-6 overflow-hidden mt-4"
        >
          <div className="relative w-full aspect-video sm:aspect-21/9 lg:aspect-video xl:aspect-16/10 max-w-full mx-auto">
            {/* Loading Placeholder */}
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-500">Loading image...</p>
                </div>
              </div>
            )}
            
            {/* Image */}
            <Image
              src={images.aboutUsPageHero}
              alt="Brand Locus team members standing behind a glass table"
              fill
              className={`object-contain transition-opacity duration-300 ${isImageLoading ? "opacity-0" : "opacity-100"}`}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 85vw"
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
          </div>
        </motion.div>

        {/* Success Metrics Section */}
        <div ref={metricsSectionRef} className="space-y-8 sm:space-y-10 md:space-y-12">
          {/* Section Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center"
          >
            Numbers that showcase our success
          </motion.h2>

          {/* Metrics Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center space-y-3 sm:space-y-4"
              >
                {/* Number */}
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black">
                  <CountUpNumber value={metric.number} duration={2} startCounting={isMetricsInView} />
                </h3>

                {/* Title */}
                <h4 className="text-md sm:text-lg md:text-xl font-semibold text-gray-600">
                  {metric.title}
                </h4>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-md text-gray-600 leading-relaxed max-w-sm mx-auto">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
