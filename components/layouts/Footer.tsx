"use client";

import React from "react";
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
import { FaWhatsapp } from "react-icons/fa";

const Footer = () => {
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
    { icon: <FaWhatsapp className="w-4 h-4" />, href: "#", label: "WhatsApp" },
  ];

  return (
    <footer className="w-full bg-white py-8 sm:py-10 md:py-12">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Top Border */}
        <div className="border-t border-gray-300 mb-8 sm:mb-10"></div>

        {/* Logo Section */}
        <div className="flex flex-col items-center ">
          <Link href={ROUTES.HOME} className="flex flex-col items-center hover:opacity-80 transition-opacity">
            <div className="">
              <Image
                src={icons.logo}
                alt="Brand Locus Logo"
                width={80}
                height={80}
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                priority
              />
            </div>
          </Link>

          {/* Border below logo */}
          <div className=" w-full max-w-md"></div>
        </div>

        {/* Navigation and Social Links */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10">
          {/* Left Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm md:text-md text-black hover:text-gray-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                aria-label={social.label}
                className=" p-2 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              >
                {social.icon}
              </Link>
            ))}
          </div>

          {/* Right Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm md:text-md text-black hover:text-gray-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-300 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-center">
            <span className="text-gray-600">
              © 2025 Brand Locus Limited. All rights reserved.
            </span>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="hidden sm:inline text-gray-300">|</span>
              <Link
                href={ROUTES.TERMS_AND_CONDITIONS}
                className="text-gray-800 hover:text-black transition-colors"
              >
                Terms and Conditions
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                href={ROUTES.PRIVACY_POLICY}
                className="text-gray-800 hover:text-black transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
