"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ROUTES } from '@/constants/routes';
import { icons } from '@/constants';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import RequestServiceForm from './RequestServiceForm';
import { allServices } from '@/constants/data';

interface ServiceOffering {
    title: string;
    description: string;
}

interface OurExpertiseProps {
    title?: string;
    description?: string;
    offerings?: ServiceOffering[];
}

const OurExpertise: React.FC<OurExpertiseProps> = ({
    title = "Unlock Strategic Growth for Your Business",
    description = "Transform challenges into opportunities with tailored strategies designed to accelerate growth, optimize efficiency, and expand your market reach.",
    offerings = [
        {
            title: "Market Expansion Strategy",
            description: "Identify high-potential markets and design tailored entry plans that position your business for long-term growth."
        },
        {
            title: "Sales & Lead Optimization",
            description: "Build efficient funnels and conversion strategies that attract, nurture, and convert leads into loyal customers."
        },
        {
            title: "Strategic Partnerships & Alliances",
            description: "Forge meaningful collaborations with key industry players to amplify reach, resources, and business impact."
        },
        {
            title: "Operational Efficiency & Scalability",
            description: "Streamline workflows, reduce costs, and implement scalable systems that maximize productivity and profitability."
        },
        {
            title: "Investment Readiness & Fundraising Support",
            description: "Craft compelling investor pitches, financial strategies, and fundraising roadmaps to secure sustainable capital."
        }
    ]
}) => {
    const pathname = usePathname();

    // Filter out current service - memoized to prevent unnecessary re-computations
    const otherServices = useMemo(
        () => allServices.filter(service => service.href !== pathname),
        [pathname]
    );

    return (
        <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-x-hidden">
            <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
                <div className="grid lg:grid-cols-[55%_45%] gap-8 md:gap-12 lg:gap-16">
                    {/* Left Column - Our Expertise */}
                    <div className="space-y-6 sm:space-y-8 min-w-0">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="w-fit sm:w-full mx-auto"
                        >
                            <span className="inline-block text-xs sm:text-sm font-medium bg-gray-100 rounded-full px-3 py-1 text-gray-500 uppercase tracking-wide">
                                Our Expertise
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-xl md:text-2xl sm:text-start text-center lg:text-3xl xl:text-4xl font-bold text-gray-800 leading-tight break-words"
                        >
                            {title}
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed break-words"
                        >
                            {description}
                        </motion.p>

                        {/* Service Offerings */}
                        <div className="space-y-6 sm:space-y-8 mt-8 sm:mt-10">
                            {offerings.map((offering, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                    className="space-y-2"
                                >
                                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 break-words">
                                        {offering.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-words">
                                        {offering.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column - Other Services & Form */}
                    <div className="space-y-8 sm:space-y-10 min-w-0">
                        {/* Other Services */}
                        <div className="space-y-4 sm:space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="text-sm sm:text-base font-medium text-gray-700">
                                    Other services
                                </span>
                            </motion.div>

                            <div className="space-y-3 sm:space-y-4">
                                {otherServices.map((service, index) => (
                                    <motion.div
                                        key={service.href}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                                    >
                                        <Link
                                            href={service.href}
                                            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-shadow group"
                                        >
                                            {/* Service Icon */}
                                            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-white shrink-0">
                                                <Image
                                                    src={service.icon}
                                                    alt={service.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform"
                                                />
                                            </div>
                                            {/* Service Name */}
                                            <span className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors break-words">
                                                {service.name}
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Request This Service Form */}
                        <RequestServiceForm />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurExpertise;