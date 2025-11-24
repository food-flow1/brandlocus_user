"use client";

import React from "react";
import { motion } from "framer-motion";
import Accordion, { AccordionItem } from "@/components/common/Accordion";
import { FaQuestionCircle } from "react-icons/fa";

interface FAQServiceProps {
  items?: AccordionItem[];
}

const FAQService: React.FC<FAQServiceProps> = ({
  items = [
    {
      question: "What services does Brand Locus provide?",
      answer:
        "We specialize in business development, brand marketing, project management, and corporate retreats, helping organizations unlock growth and achieve sustainable success",
    },
    {
      question: "How do I know which service is right for my business?",
      answer:
        "Our team offers free consultations to assess your business needs and recommend the most suitable services. We'll work with you to identify opportunities and create a tailored solution.",
    },
    {
      question: "Can you customize solutions for my industry?",
      answer:
        "Yes, we understand that each industry has unique challenges. We customize our services to meet your specific industry needs and business objectives.",
    },
    {
      question: "Do you work with businesses outside Nigeria?",
      answer:
        "Yes, we work with clients globally. While we're based in Nigeria, we provide services to businesses across Africa and internationally.",
    },
    {
      question: "How can I get started?",
      answer:
        "Getting started is easy! Simply contact us through our contact form, email, or schedule a consultation. Our team will reach out to discuss your needs and outline next steps.",
    },
  ],
}) => {
  return (
    <section className="w-full bg-white py-4 sm:py-16 md:py-10 lg:py-12 overflow-x-hidden">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-400 px-4 py-2">
            <FaQuestionCircle className="w-5 h-5 text-black" />
            <span className="text-xs sm:text-sm font-medium text-black uppercase tracking-wide">
              FAQ
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-800 mb-8 sm:mb-10 md:mb-12 text-center"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          <Accordion
            items={items}
            defaultOpenIndex={0}
            itemClassName="bg-gray-100"
            questionClassName="text-gray-800 font-semibold"
            answerClassName="text-gray-700"
            iconClassName="bg-gray-200"
            className="space-y-3 sm:space-y-4"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQService;
