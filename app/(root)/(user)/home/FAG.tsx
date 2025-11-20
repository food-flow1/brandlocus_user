"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionBadge from "@/components/common/SectionBadge";
import Accordion, { AccordionItem } from "@/components/common/Accordion";
import { FiHelpCircle } from "react-icons/fi";

const FAG = () => {
  const faqs: AccordionItem[] = [
    {
      question: "What services does Brand Locus provide?",
      answer:
        "We specialize in business development, brand marketing, project management, and corporate retreats, helping organizations unlock growth and achieve sustainable success.",
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
  ];

  return (
    <section className="w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Badge */}
        <div className="flex justify-center">
          <SectionBadge
            text="FAQ"
            icon={<FiHelpCircle className="w-4 h-4" />}
            className="mb-2"
          />
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold leading-tight text-gray-800 mb-4 sm:mb-5 md:mb-6 text-center max-w-full sm:max-w-xl mx-auto"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
};

export default FAG;
