"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const contactOptions = [
    {
      icon: <FiMail className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "You can email us here",
      detail: "brandlocuslimited@gmail.com",
      href: "mailto:brandlocuslimited@gmail.com",
    },
    {
      icon: <FiPhone className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Give us a call",
      detail: "Book a Call",
      href: "tel:+1234567890",
    },
    {
      icon: <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Join our Channel",
      detail: "Join Whatsapp Channel",
      href: "#",
    },
  ];

  return (
    <section className="w-full pt-12 pb-2 sm:pt-16 sm:pb-6 md:pt-20 md:pb-8 lg:pt-24 lg:pb-10">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Main Card Container */}
        <div className=" ">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            {/* Left Column - Contact Options */}
            <div className="space-y-6 sm:space-y-8">
              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight"
              >
                Let's Build Something Great Together
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm sm:text-base md:text-md lg:text-lg text-gray-600 leading-relaxed"
              >
                Reach out for consultations, collaborations, or general inquiries
              </motion.p>

              {/* Contact Options */}
              <div className="space-y-4 sm:space-y-5 mt-8 sm:mt-10 ">
                {contactOptions.map((option, index) => (
                  <motion.a
                    key={index}
                    href={option.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="flex items-center justify-between p-4 sm:p-5 md:p-6 bg-gray-50 border border-gray-200 rounded-xl hover:shadow-md transition-shadow cursor-pointer group"
                  >
                    <div className="flex items-center gap-4 sm:gap-5">
                      {/* Icon */}
                      <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full text-gray-700 group-hover:text-gray-900 transition-colors">
                        {option.icon}
                      </div>

                      {/* Text */}
                      <div>
                        <h3 className="text-sm sm:text-base md:text-md font-semibold text-gray-800 mb-1">
                          {option.title}
                        </h3>
                        <p className="text-xs sm:text-sm md:text-base text-gray-600">
                          {option.detail}
                        </p>
                      </div>
                    </div>

                    {/* Arrow Button */}
                    <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full group-hover:bg-gray-300 transition-colors shrink-0">
                      <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="space-y-6 sm:space-y-8 shadow-md rounded-xl p-4 sm:p-6 md:p-8 lg:p-10">
              {/* Form Heading */}
              <div>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4"
                >
                  Send Us a Message
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-sm sm:text-base md:text-md text-gray-600 leading-relaxed"
                >
                  Use our convenient contact form to reach out with questions, feedback, or collaboration inquiries.
                </motion.p>
              </div>

              {/* Contact Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                onSubmit={handleSubmit}
                className="space-y-4 sm:space-y-5"
              >
                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type your message here..."
                    required
                    rows={5}
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full px-6 sm:px-8 py-3 sm:py-3.5 md:py-4 bg-black text-white rounded-xl text-sm sm:text-base md:text-lg font-semibold hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl"
                >
                  Get in touch
                </button>
              </motion.form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;