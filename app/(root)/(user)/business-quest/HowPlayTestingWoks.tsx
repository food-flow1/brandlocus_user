"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PiStarFourFill } from 'react-icons/pi';

const HowPlayTestingWoks = () => {
    const steps = [
        "Sign up to the Playtest List",
        "We randomly invite cohorts for live sessions (virtual or in-person).",
        "60-90 minutes. Expect lively debate and clear takeaways",
        "We collect quick feedback; you get perks."
    ];

    return (
        <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
                <div className="max-w-3xl mx-auto text-center space-y-8 sm:space-y-10">
                    {/* Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-block px-6 py-3 bg-gray-100 border border-gray-300 rounded-full text-gray-900 font-medium text-sm sm:text-base hover:bg-gray-200 transition-colors"
                    >
                        Join the playtest list
                    </motion.button>

                    {/* Heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900"
                    >
                        How Playtesting Works
                    </motion.h2>

                    {/* Steps */}
                    <div className="space-y-4 sm:space-y-6">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                className=" border border-gray-300 rounded-3xl p-6 sm:p-8 flex items-center gap-4 text-left"
                            >
                                {/* Star Icon */}
                                <div className="shrink-0 mt-1 bg-black text-white rounded-full p-2">
                                    <PiStarFourFill size={20} className="text-white" />
                                </div>

                                {/* Step Text */}
                                <p className="text-base sm:text-lg text-gray-900 leading-relaxed flex-1">
                                    {step}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowPlayTestingWoks;