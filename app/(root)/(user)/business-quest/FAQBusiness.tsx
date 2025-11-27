"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Accordion, { AccordionItem } from '@/components/common/Accordion';

const FAQBusiness = () => {
  const faqs: AccordionItem[] = [
    {
      question: "Is this physical or digital?",
      answer: "Physical cards + dice. Digital facilitator kit optional."
    },
    {
      question: "How many players?",
      answer: "Business Quest is designed for 2-8 players, making it perfect for small teams, workshops, or larger group sessions."
    },
    {
      question: "How long is a session?",
      answer: "A typical session lasts 60-90 minutes, depending on the complexity of the scenario and group discussion."
    },
    {
      question: "Age range?",
      answer: "Business Quest is designed for professionals and teams. Recommended for ages 18+ due to business strategy complexity."
    },
    {
      question: "Do playtesters pay?",
      answer: "No, playtesters participate for free. In exchange for your feedback, you'll receive exclusive perks and early access."
    }
  ];

  return (
    <section className="w-full bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black rounded-full">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                <span className="text-black text-xs font-bold">?</span>
              </div>
              <span className="text-white text-sm font-medium">FAQ</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center"
          >
            Frequently Asked Questions
          </motion.h2>

          {/* FAQ Items */}
          <Accordion
            items={faqs}
            defaultOpenIndex={0}
            itemClassName="bg-gray-100 border-gray-300"
            questionClassName="text-gray-900"
            answerClassName="text-gray-600"
          />
        </div>
      </div>
    </section>
  );
};

export default FAQBusiness;