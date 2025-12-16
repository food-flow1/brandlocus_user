"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiExternalLink, FiCalendar } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { ROUTES } from "@/constants/routes";

interface BookingCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingCalendarModal: React.FC<BookingCalendarModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleBookClick = () => {
    window.open(ROUTES.BOOK_CONSULTATION, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#1a1a1a] p-4 flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                  <HiSparkles className="w-4 h-4 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight">
                    Book Consultation
                  </h2>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/10 group"
              >
                <FiX className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col items-center text-center space-y-6">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
                <FiCalendar className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Schedule Your Session
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                  To ensure the best booking experience, we'll open our calendar in a new secure window.
                </p>
              </div>

              <div className="w-full space-y-3">
                <button
                  onClick={handleBookClick}
                  className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  <span>Open Calendar</span>
                  <FiExternalLink className="w-4 h-4" />
                </button>
                
                <button
                  onClick={handleClose}
                  className="w-full py-3 px-6 rounded-xl text-gray-500 font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BookingCalendarModal;
