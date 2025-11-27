"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { icons, images } from "@/constants";
import SectionBadge from "@/components/common/SectionBadge";
import { FiArrowUpRight } from "react-icons/fi";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/navigation";

const AboutUs = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Badge */}
        <SectionBadge text="About Us" icon={<Image src={icons.aboutIcon} alt="About Us" width={20} height={20} />} />

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-800 mb-6 sm:mb-8 md:mb-10 lg:mb-12"
        >
          We drive{" "}
          <span className="underline underline-offset-4 decoration-2 text-gray-500 cursor-pointer" onClick={() => router.push(ROUTES.ABOUT_US)}>
            Business Growth
          </span>{" "}
          and unlock opportunities that deliver sustainable success.
        </motion.h2>

        {/* Image and Text Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-6 xl:gap-8 items-center lg:items-end">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="w-full order-1 lg:order-1"
          >
            <div className="overflow-hidden rounded-xl sm:rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] sm:shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <Image
                src={images.aboutUs}
                alt="Two business professionals reviewing documents"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority={false}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Text Content Section */}
          <div className="w-full space-y-4 sm:space-y-5 md:space-y-6 order-2 lg:order-2 lg:pb-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-full sm:max-w-xl lg:max-w-none"
            >
              At Brand Locus, we&apos;ve mastered the art of transforming
              challenges into opportunities from brand management to trade &
              investment facilitation, and capacity building.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-full sm:max-w-xl lg:max-w-none"
            >
              <span className="font-semibold">Our solutions</span> are designed
              to help businesses adapt, grow, and thrive in today&apos;s
              fast‑changing marketplace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-2 sm:pt-3"
            >
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-white hover:bg-gray-900 transition-colors cursor-pointer w-max" onClick={() => router.push(ROUTES.ABOUT_US)}>
                <span>Learn More</span>
                <FiArrowUpRight size={26} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;



