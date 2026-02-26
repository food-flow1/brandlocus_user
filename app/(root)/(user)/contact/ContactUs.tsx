"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useSubmitContactForm } from "@/lib/api/hooks/useForms";
import { serviceNeededEnum } from "@/constants/data";
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const ContactUs = () => {
  const submitForm = useSubmitContactForm();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    message: "",
    serviceNeeded: serviceNeededEnum.CONTACT,
  });
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormMessage(null);
    try {
      await submitForm.mutateAsync(formData);
      setFormMessage({ type: 'success', text: 'Message sent successfully! We\'ll be in touch soon.' });
      setFormData({ firstName: "", lastName: "", companyName: "", email: "", message: "", serviceNeeded: serviceNeededEnum.CONTACT });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setFormMessage({ type: 'error', text: errorMessage });
    }
  };

  const contactOptions = [
    {
      icon: <FiMail className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "You can email us here",
      detail: "brandlocuslimited@gmail.com",
      href: "mailto:brandlocuslimited@gmail.com",
    },

    {
      icon: <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: "Join our Channel",
      detail: "Join Whatsapp Channel",
      href: "https://whatsapp.com/channel/0029Vb6jDqO0AgWFRDkKSM1u",
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
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight"
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
                {/* Form Message */}
                {formMessage && (
                  <div className={`p-4 rounded-xl text-center text-sm sm:text-base ${
                    formMessage.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-700'
                      : 'bg-red-50 border border-red-200 text-red-700'
                  }`}>
                    {formMessage.text}
                  </div>
                )}

                {/* Name Fields - Side by Side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      required
                      className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  {/* Last Name */}
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      required
                      className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all"
                    />
                  </div>
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

                {/* Privacy Policy Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group w-full mt-4">
                    <input
                        type="checkbox"
                        checked={agreedToPolicy}
                        onChange={(e) => setAgreedToPolicy(e.target.checked)}
                        className="mt-0.5 flex-shrink-0 w-5 h-5 appearance-none rounded border border-gray-300 bg-white transition-all cursor-pointer
                            checked:bg-black checked:border-black
                            group-hover:border-gray-400
                            [&:checked]:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M3%208l3.5%203.5%206.5-7%22%20stroke%3D%22%23fff%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')]
                            [&:checked]:bg-center [&:checked]:bg-no-repeat [&:checked]:bg-contain"
                    />
                    <span className="text-xs text-gray-500 leading-relaxed">
                        I agree to Brand Locus Limited&apos;s{' '}
                        <Link
                            href={ROUTES.PRIVACY_POLICY}
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-800 hover:text-black underline transition-colors"
                        >
                            privacy policy
                        </Link>
                        {' '}by submitting this form.
                    </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitForm.isPending || !agreedToPolicy}
                  className="w-full px-6 cursor-pointer sm:px-8 py-3 sm:py-3.5 md:py-4 bg-black text-white rounded-xl text-sm sm:text-base md:text-lg font-semibold hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
                >
                  {submitForm.isPending ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Get in touch"
                  )}
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