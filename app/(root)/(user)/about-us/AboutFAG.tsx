"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionBadge from "@/components/common/SectionBadge";
import Accordion, { AccordionItem } from "@/components/common/Accordion";
import { FaQuestionCircle } from "react-icons/fa";

const AboutFAG = () => {
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
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">

        {/* Badge */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <SectionBadge
            text="FAQ"
            icon={<FaQuestionCircle size={20} />}
            className="mb-2"
          />
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-800 mb-4 sm:mb-6 md:mb-8 text-center"
        >
          Frequently Asked
          <br />
          Questions
        </motion.h2>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} defaultOpenIndex={0} />
        </div>
      </div>
    </section>
  );
};

export default AboutFAG;