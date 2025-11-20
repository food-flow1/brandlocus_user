"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { icons } from "@/constants";
import { ROUTES } from "@/constants/routes";
import { 
  FiFacebook, 
  FiTwitter, 
  FiInstagram, 
  FiLinkedin,
  FiYoutube
} from "react-icons/fi";
import { FaWhatsapp, FaPinterest } from "react-icons/fa";

const PrivacyPolicyPage = () => {
  const leftLinks = [
    { label: "Home", href: ROUTES.HOME },
    { label: "About Us", href: ROUTES.ABOUT_US },
    { label: "Business Quest", href: ROUTES.BUSINESS_QUEST },
  ];

  const rightLinks = [
    { label: "Services", href: ROUTES.SERVICES },
    { label: "Insight", href: ROUTES.BLOG },
    { label: "Contact Us", href: ROUTES.CONTACT },
  ];

  const socialLinks = [
    { icon: <FiFacebook className="w-4 h-4" />, href: "#", label: "Facebook" },
    { icon: <FiTwitter className="w-4 h-4" />, href: "#", label: "Twitter" },
    { icon: <FiInstagram className="w-4 h-4" />, href: "#", label: "Instagram" },
    { icon: <FiLinkedin className="w-4 h-4" />, href: "#", label: "LinkedIn" },
    { icon: <FiYoutube className="w-4 h-4" />, href: "#", label: "YouTube" },
    { icon: <FaPinterest className="w-4 h-4" />, href: "#", label: "Pinterest" },
  ];

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
            Privacy Policy
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
            At Brand Locus, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website, services, or team.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              1. Information We Collect
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-3 sm:mb-4">
              We collect the following information when you engage with our services:
            </p>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-800 ml-4 sm:ml-6">
              <li>Personal details (name, email, phone number, business sector).</li>
              <li>Business information shared through forms or consultations.</li>
              <li>Website usage data (cookies, analytics, and browsing behavior).</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              2. How We Use Your Data
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-3 sm:mb-4">
              Your information helps us:
            </p>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-800 ml-4 sm:ml-6">
              <li>Provide tailored business development and brand consulting solutions.</li>
              <li>Respond to inquiries and offer personalized recommendations.</li>
              <li>Improve our website, services, and communication.</li>
              <li>Share updates, newsletters, or offers (only with your consent).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              3. Data Sharing & Security
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-3 sm:mb-4">
              You're always in control.
            </p>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-800 ml-4 sm:ml-6">
              <li>We do not sell or rent your personal information to third parties.</li>
              <li>Data is shared only with trusted partners or service providers essential to delivering our services.</li>
              <li>We use secure systems and protocols to protect your information from unauthorized access.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              4. Cookies & Tracking
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed">
              Our website may use cookies and analytics tools to enhance your experience and track performance. You can manage or disable cookies via your browser settings.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              5. Your Rights
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-3 sm:mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-800 ml-4 sm:ml-6">
              <li>Request access to the personal data we hold about you.</li>
              <li>Ask for corrections, updates, or deletion of your data.</li>
              <li>Withdraw consent for receiving marketing communications.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-4 sm:mb-5">
              6. Contact Us
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-4 sm:mb-5 leading-relaxed">
              If you have any questions about this Privacy Policy or how your data is handled, contact us at:
            </p>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base md:text-lg text-gray-800">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <a 
                  href="mailto:brandlocuslimited@gmail.com" 
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  brandlocuslimited@gmail.com
                </a>
              </p>
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
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;