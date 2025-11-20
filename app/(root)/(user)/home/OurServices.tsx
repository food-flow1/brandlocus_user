"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { icons, images } from "@/constants";
import SectionBadge from "@/components/common/SectionBadge";
import ServiceCard from "@/components/common/ServiceCard";
import { ROUTES } from "@/constants/routes";

const OurServices = () => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  const services = [
    {
      badge: "Growth Strategies",
      title: "Business Development",
      description:
        "Build a brand that connects, inspires, and drives results with tailored marketing strategies.",
      features: [
        "Partnership building to unlock new opportunities.",
        "Innovative models that drive profitability and growth.",
      ],
      link: ROUTES.SERVICES_BUSINESS_DEVELOPMENT,
      image: images.growth,
      imageAlt: "Business growth and development",
      imagePosition: "left" as const,
    },
    {
      badge: "Identity & Trust",
      title: "Brand Management",
      description:
        "Protect, position, and grow your brand for long-term recognition and market relevance.",
      features: [
        "Positioning strategies that build trust and loyalty.",
        "Consistent brand identity across platforms.",
      ],
      link: ROUTES.SERVICES_BRAND_MANAGEMENT,
      image: images.brandManagement,
      imageAlt: "Brand identity and management",
      imagePosition: "right" as const,
    },
    {
      badge: "Empowerment",
      title: "Capacity Building",
      description:
        "Equip leaders and teams with the skills, tools, and the confidence to drive sustainable growth.",
      features: [
        "Leadership and team training programs.",
        "Workshops to enhance organizational effectiveness.",
      ],
      link: ROUTES.SERVICES_CAPACITY_BUILDING,
      image: images.empowerment,
      imageAlt: "Capacity building and training",
      imagePosition: "left" as const,
    },
    {
      badge: "Brand Visibility",
      title: "Marketing Consulting",
      description:
        "Build a brand that connects, inspires, and drives results with tailored marketing strategies.",
      features: [
        "Strategies to maximize long term brand loyalty",
        "Multi-channel marketing tailored to your audience.",
      ],
      link: ROUTES.SERVICES_MARKETING_CONSULTING,
      image: images.identity,
      imageAlt: "Marketing consulting and strategy",
      imagePosition: "right" as const,
    },
    {
      badge: "Global Access",
      title: "Trade & Investment Facilitation",
      description:
        "Unlock international trade and investment opportunities through strategic guidance and facilitation.",
      features: [
        "Trade advisory and regulatory compliance support.",
        "Strategies for cross-border partnerships.",
      ],
      link: ROUTES.SERVICES_TRADE_INVESTMENT,
      image: images.global,
      imageAlt: "Trade and investment facilitation",
      imagePosition: "left" as const,
    },
  ];

  return (
    <section className="w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Badge */}
        <div className="flex justify-center">
          <SectionBadge
            text="Our Service"
            icon={
              <Image
                src={icons.servicesIcon}
                alt="Services"
                width={20}
                height={20}
              />
            }
          />
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold  max-w-full sm:max-w-2xl mx-auto leading-tight text-black mb-4 sm:mb-5 md:mb-6 text-center"
        >
          Expert Solutions for Business Success
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-full sm:max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 text-center"
        >
          We combine insight, strategy, and creativity to help your business
          stand out, grow faster, and operate with clarity.
        </motion.p>

        {/* Service Cards Grid */}
        <div className="space-y-12 sm:space-y-16 md:space-y-20">
          {services.map((service, index) => {
            const isImageLeft = service.imagePosition === "left";
            const imageOrder = isImageLeft ? "lg:order-1" : "lg:order-2";
            const contentOrder = isImageLeft ? "lg:order-2" : "lg:order-1";
            const imageDirection = isImageLeft ? -20 : 20;

            return (
              <div
                key={index}
                className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-6 xl:gap-8 items-center"
              >
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: imageDirection }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className={`w-full order-1 ${imageOrder}`}
                >
                  <div className="relative rounded-xl sm:rounded-2xl aspect-3/2">
                    {/* Loading Placeholder */}
                    {!loadedImages.has(index) && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl sm:rounded-2xl z-20 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin" />
                      </div>
                    )}
                    
                    {/* Image */}
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      width={1200}
                      height={800}
                      className={`w-full h-full object-contain rounded-xl sm:rounded-2xl relative z-10 transition-opacity duration-300 ${
                        loadedImages.has(index) ? "opacity-100" : "opacity-0"
                      }`}
                      priority={index === 0}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <div className={`w-full order-2 ${contentOrder}`}>
                  <ServiceCard
                    badge={service.badge}
                    title={service.title}
                    description={service.description}
                    features={service.features}
                    link={service.link}
                    delay={0.2}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
