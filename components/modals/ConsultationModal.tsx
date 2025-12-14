"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowRight } from 'react-icons/fi';

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onBook: () => void;
}

const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose, onBook }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[#0A0A0A] rounded-3xl w-full max-w-lg relative border border-white/10 shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Decorative background effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none translate-y-1/2 -translate-x-1/2"></div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-20"
                        >
                            <FiX className="w-5 h-5 text-white/60 hover:text-white" />
                        </button>

                        <div className="relative z-10 px-8 py-10 flex flex-col items-center text-center">
                            {/* Title with Rocket */}
                            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                                Let's Take This Further
                                <motion.span
                                    animate={{ 
                                        y: [-2, 2, -2],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ 
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="text-3xl filter drop-shadow-lg"
                                >
                                    🚀
                                </motion.span>
                            </h2>

                            {/* Divider */}
                            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"></div>

                            {/* Description */}
                            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-md">
                                You have already explored key insights. Want a tailored 1-on-1 session to go deeper?
                            </p>

                            {/* Book Button */}
                            <button
                                onClick={onBook}
                                className="group flex items-center gap-2 pl-6 pr-5 py-3.5 bg-white text-black rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                            >
                                Book a Free Consultation
                                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                    <FiArrowRight className="w-4 h-4" />
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ConsultationModal;
