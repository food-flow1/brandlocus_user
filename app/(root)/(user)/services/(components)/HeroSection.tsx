"use client";

import { images } from '@/constants'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface HeroSectionProps {
    title?: string;
    description?: string;
    image?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
    title = "Business Development",
    description = "Our Business Development services are designed to help you expand market reach, enhance operational efficiency, and increase profitability. Let's build sustainable systems that support long-term growth",
    image = images.businessDevelopment
}) => {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    return (
        <div className="relative w-full aspect-video bg-black/80 sm:aspect-21/9 lg:h-[70vh] md:h-[60vh] sm:h-[50vh] h-[40vh] lg:aspect-auto overflow-hidden mx-auto">
            {/* Skeleton Loader */}
            <AnimatePresence>
                {isImageLoading && !imageError && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-pulse"
                    >
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
                                <p className="text-gray-600 text-sm font-medium">Loading image...</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Image */}
            <Image
                src={image}
                alt={title}
                fill
                className={`object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                sizes="100vw"
                priority
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                    setIsImageLoading(false);
                    setImageError(true);
                }}
            />

            {/* Placeholder for error state */}
            {imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                    <p className="text-white/80 text-sm">Failed to load image</p>
                </div>
            )}

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />

            {/* Content - Bottom Left */}
            <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 pb-6 md:pb-8 lg:pb-6">
                <div className="max-width-container mx-auto flex flex-col items-center text-center justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-sm md:text-md lg:text-lg text-white/90 leading-relaxed max-w-3xl"
                    >
                        {description}
                    </motion.p>
                </div>
            </div>
        </div>
    )
}

export default HeroSection