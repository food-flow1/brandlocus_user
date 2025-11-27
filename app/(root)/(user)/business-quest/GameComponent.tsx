"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { images } from '@/constants';
import { MdArrowOutward, MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';

const GameComponent = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const components = [
        {
            title: "THE DICE",
            description: "Chance is part of business. A single roll introduces constraints, opportunities, and urgency exactly like real markets.",
            image: images.dice2
        },
        {
            title: "THE CARDS",
            description: "Curated prompts designed to push strategic thinking, creative problem-solving, and consequence mapping.",
            image: images.cards
        },
        // Add more components as needed
    ];

    // Autoplay functionality
    useEffect(() => {
        if (!isPaused) {
            autoplayIntervalRef.current = setInterval(() => {
                setCurrentIndex((prev) => (prev < components.length - 1 ? prev + 1 : 0));
            }, 5000); // Change slide every 5 seconds
        }

        return () => {
            if (autoplayIntervalRef.current) {
                clearInterval(autoplayIntervalRef.current);
            }
        };
    }, [isPaused, components.length]);

    const handlePrevious = () => {
        setIsPaused(true);
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : components.length - 1));
        // Resume autoplay after 10 seconds
        setTimeout(() => setIsPaused(false), 10000);
    };

    const handleNext = () => {
        setIsPaused(true);
        setCurrentIndex((prev) => (prev < components.length - 1 ? prev + 1 : 0));
        // Resume autoplay after 10 seconds
        setTimeout(() => setIsPaused(false), 10000);
    };

    return (
        <section 
            className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 overflow-hidden">
                <div className="min-h-[500px] overflow-hidden">
                    {/* Mobile Layout - Stacked */}
                    <div className="flex flex-col lg:hidden space-y-8">
                        {/* Badge - Centered */}
                        <div className="text-center">
                            <div className="inline-block px-4 py-2 bg-gray-50 border border-gray-300 rounded-full">
                                <span className="text-sm text-gray-900 font-medium">
                                    Game Components
                                </span>
                            </div>
                        </div>

                        {/* Heading - Centered */}
                        <div className="text-center">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                                What's Inside
                                <br />
                                Business Quest
                            </h2>
                        </div>

                        {/* Large Title - Background */}
                        <div className="text-center overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.h3
                                    key={currentIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="text-[40px] sm:text-[50px] font-bold text-[#E0E0E0]"
                                    style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}
                                >
                                    {components[currentIndex].title}
                                </motion.h3>
                            </AnimatePresence>
                        </div>

                        {/* Center Image */}
                        <div className="flex justify-center overflow-hidden">
                            <div className="relative w-full max-w-[300px] h-[300px] sm:max-w-[400px] sm:h-[400px] overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src={components[currentIndex].image}
                                            alt="Business Quest Component"
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Navigation Buttons - Centered */}
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={handlePrevious}
                                className="p-4 rounded-full bg-gray-500 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="Previous"
                            >
                                <MdOutlineArrowBackIosNew size={18} />
                            </button>
                            <button
                                onClick={handleNext}
                                className="p-4 rounded-full bg-gray-500 text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
                                aria-label="Next"
                            >
                                <MdOutlineArrowForwardIos size={18} />
                            </button>
                        </div>

                        {/* Description - Centered */}
                        <div className="text-center overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="text-base text-gray-900 leading-relaxed max-w-2xl mx-auto"
                                >
                                    {components[currentIndex].description}
                                </motion.p>
                            </AnimatePresence>
                        </div>

                        {/* CTA Button - Centered */}
                        <div className="flex justify-center">
                            <button className="flex justify-center items-center gap-4 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors font-medium text-base">
                                <span>Join the Playtest List</span>
                                <div className="bg-white rounded flex items-center justify-center">
                                    <MdArrowOutward size={20} className='text-black' />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Desktop Layout - Original */}
                    <div className="hidden lg:block">
                        {/* Left Section */}
                        <section className='flex items-end justify-between overflow-hidden'>
                            <div className="space-y-6">
                                {/* Badge */}
                                <div className="inline-block px-4 py-2 bg-gray-50 border border-gray-300 rounded-full">
                                    <span className="text-sm sm:text-base text-gray-900 font-medium">
                                        Game Components
                                    </span>
                                </div>

                                {/* Heading */}
                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    What's Inside
                                    <br />
                                    Business Quest
                                </h2>
                            </div>

                            {/* Title */}
                            <div className="overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.h3
                                        key={currentIndex}
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="text-[50px] sm:text-[70px] md:text-[100px] font-bold text-[#E0E0E0]"
                                        style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}
                                    >
                                        {components[currentIndex].title}
                                    </motion.h3>
                                </AnimatePresence>
                            </div>
                        </section>

                        <section className='flex justify-between items-end'>
                            {/* Bottom Left Navigation */}
                            <div className="flex gap-4 w-[25%]">
                                <button
                                    onClick={handlePrevious}
                                    className="p-6 rounded-full bg-gray-500 cursor-pointer text-white flex items-center justify-center hover:bg-gray-700 transition-colors"
                                    aria-label="Previous"
                                >
                                    <MdOutlineArrowBackIosNew size={20} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="p-6 rounded-full bg-gray-500 text-white cursor-pointer flex items-center justify-center hover:bg-gray-700 transition-colors"
                                    aria-label="Next"
                                >
                                    <MdOutlineArrowForwardIos size={20} />
                                </button>
                            </div>

                            {/* Center Section - 3D Cube */}
                            <div className="flex justify-center w-[50%] overflow-hidden">
                                <div className="relative w-[700px] h-[700px] overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentIndex}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.6, ease: "easeInOut" }}
                                            className="relative w-full h-full"
                                        >
                                            <Image
                                                src={components[currentIndex].image}
                                                alt="Business Quest 3D Cube"
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Right Section */}
                            <div className="space-y-6 w-[25%] overflow-hidden">
                                {/* Description */}
                                <div className="overflow-hidden">
                                    <AnimatePresence mode="wait">
                                        <motion.p
                                            key={currentIndex}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                            className="text-base sm:text-lg text-gray-900 leading-relaxed"
                                        >
                                            {components[currentIndex].description}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>

                                {/* CTA Button */}
                                <button className="flex w-full justify-center items-center gap-4 px-6 py-3 sm:px-8 bg-black text-white rounded-full hover:bg-gray-900 transition-colors font-medium text-base sm:text-lg">
                                    <span>Join the Playtest List</span>
                                    <div className="bg-white rounded flex items-center justify-center">
                                        <MdArrowOutward size={20} className='text-black' />
                                    </div>
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GameComponent;