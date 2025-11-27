"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenIndex?: number | null;
  className?: string;
  itemClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
  iconClassName?: string;
  animationDelay?: number;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenIndex = 0,
  className,
  itemClassName,
  questionClassName,
  answerClassName,
  iconClassName,
  animationDelay = 0.1,
}) => {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    defaultOpenIndex !== null ? new Set([defaultOpenIndex]) : new Set()
  );

  const toggleItem = (index: number) => {
    setOpenIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        if (allowMultiple) {
          newSet.add(index);
        } else {
          newSet.clear();
          newSet.add(index);
        }
      }
      return newSet;
    });
  };

  return (
    <div className={cn("space-y-3 sm:space-y-4", className)}>
      {items.map((item, index) => {
        const isOpen = openIndices.has(index);

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * animationDelay }}
            className={cn(
              "rounded-xl border border-gray-200 overflow-hidden transition-colors",
              isOpen ? "bg-gray-50" : "bg-white",
              itemClassName
            )}
          >
            {/* Question */}
            <div
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <h3
                className={cn(
                  "text-base sm:text-lg md:text-xl font-semibold text-gray-700 pr-4",
                  questionClassName
                )}
              >
                {item.question}
              </h3>
              <div className={cn("shrink-0 cursor-pointer hover:text-gray-800 transition-colors hover:bg-white rounded-full p-1.5 sm:p-2", iconClassName)}>
                {isOpen ? (
                  <FiX className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                ) : (
                  <FiPlus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
                )}
              </div>
            </div>

            {/* Answer */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-gray-200 pt-4 bg-white"
                >
                  <div className="px-4 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-6">
                    <p
                      className={cn(
                        "text-sm sm:text-base md:text-md text-gray-500 leading-relaxed",
                        answerClassName
                      )}
                    >
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Accordion;

