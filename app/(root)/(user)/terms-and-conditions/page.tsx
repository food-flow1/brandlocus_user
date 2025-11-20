"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone } from "react-icons/fi";

const TermsAndConditionsPage = () => {
  return (
    <div className="w-full min-h-screen bg-white pt-20 sm:pt-24 md:pt-28">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-3 sm:mb-4">
            Terms and Conditions
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-700">
            Effective date: 18th of March, 2025
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto space-y-8 sm:space-y-10 md:space-y-12"
        >
          {/* Introductory Paragraph */}
          <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
            Welcome to Brand Locus. By accessing or using our website and services, you agree to comply with and be bound by the following Terms & Conditions. Please read them carefully.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              1. Use of Our Services
            </h2>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-800 ml-4 sm:ml-6">
              <li>Our services, including business development, brand consulting, marketing, and corporate retreats, are provided for professional and business purposes only.</li>
              <li>You agree not to misuse our services or use them for unlawful activities.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              2. Intellectual Property
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-3 sm:mb-4">
              To use Brand Locus, you must:
            </p>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-800 ml-4 sm:ml-6">
              <li>All content on this website (text, graphics, logos, images, and materials) is the property of Brand Locus and is protected by copyright laws.</li>
              <li>You may not copy, reproduce, or distribute our content without prior written consent.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              3. Payments & Billing
            </h2>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-800 ml-4 sm:ml-6">
              <li>All service fees will be communicated clearly before engagement.</li>
              <li>Payments must be made in accordance with agreed terms (e.g., upfront, milestone-based, or subscription).</li>
              <li>Failure to pay may result in suspension of services.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              4. Confidentiality
            </h2>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-800 ml-4 sm:ml-6">
              <li>We respect the confidentiality of your business information and will not disclose it to third parties without consent, except as required by law.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              5. Limitation of Liability
            </h2>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-800 ml-4 sm:ml-6">
              <li>Brand Locus will not be held liable for indirect, incidental, or consequential damages arising from the use of our services or website.</li>
              <li>While we strive for accuracy and quality, results may vary depending on factors outside our control.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              6. Third-Party Links
            </h2>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-800 ml-4 sm:ml-6">
              <li>Our website may include links to third-party platforms or tools. We are not responsible for the content, security, or practices of these third parties.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              7. Termination
            </h2>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-800 ml-4 sm:ml-6">
              <li>We reserve the right to suspend or terminate access to our services if you violate these terms.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              8. Governing Law
            </h2>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-800 ml-4 sm:ml-6">
              <li>These Terms & Conditions are governed by the laws of the Federal Republic of Nigeria.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              9. Contact Us
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-4 sm:mb-5 leading-relaxed">
              If you have any questions about these Terms and Conditions, contact us at:
            </p>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg text-gray-800">
              <div className="flex items-center gap-3 sm:gap-4">
                <FiMail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 shrink-0" />
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  <a 
                    href="mailto:brandlocuslimited@gmail.com" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    brandlocuslimited@gmail.com
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <FiPhone className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 shrink-0" />
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  <a 
                    href="tel:+2348085134177" 
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    +23480 8513 4177
                  </a>
                </p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;

