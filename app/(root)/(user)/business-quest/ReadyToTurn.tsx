"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { icons } from "@/constants";
import { FiArrowUpRight } from "react-icons/fi";
import CustomInput from "@/components/forms/CustomInput";
import CustomSelect, { CustomSelectOption } from "@/components/forms/CustomSelect";
import { useSubmitForm } from "@/lib/api/hooks/useForms";
import { ServiceNeededType } from "@/lib/api/types";

// Service options for the select dropdown
const serviceOptions: CustomSelectOption[] = [
  { id: "BRAND_DEVELOPMENT", label: "Brand Development" },
  { id: "BUSINESS_DEVELOPMENT", label: "Business Development" },
  { id: "CAPACITY_BUILDING", label: "Capacity Building" },
  { id: "MARKETING_CONSULTING", label: "Marketing Consulting" },
  { id: "TRADE_INVESTMENT", label: "Trade & Investment" },
];

// Form validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required").min(2, "First name must be at least 2 characters"),
  lastName: Yup.string().required("Last name is required").min(2, "Last name must be at least 2 characters"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  serviceNeeded: Yup.string().required("Please select a service"),
  companyName: Yup.string().required("Company name is required").min(2, "Company name must be at least 2 characters"),
  message: Yup.string().required("Message is required").min(10, "Message must be at least 10 characters"),
});

// Initial form values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  serviceNeeded: "" as ServiceNeededType | "",
  companyName: "",
  message: "",
};

const ReadyToTurn = () => {
  const submitForm = useSubmitForm();
  const [selectedService, setSelectedService] = useState<CustomSelectOption | null>(null);

  // Generate random particles
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  return (
    <section className="bg-white py-6 sm:py-8 md:py-10 lg:py-12 relative overflow-hidden">
      <div className="w-full max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Black Rounded Container */}
        <div className="bg-black rounded-3xl sm:rounded-[3rem] relative overflow-hidden py-14 md:py-16 lg:py-20">
          {/* Background Abstract Shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gray-800/30 blur-3xl"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gray-800/30 blur-3xl"
              animate={{
                x: [0, -50, 0],
                y: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>

          {/* Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 px-4 sm:px-6 md:px-8">
              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
              >
                Ready To Turn Meetings
                <br />
                <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                  Into Momentum
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed"
              >
                Tell us about your business challenges and let&apos;s start the conversation.
              </motion.p>

              {/* Form Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pt-4"
              >
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={async (values, { resetForm }) => {
                    if (!values.serviceNeeded) return;
                    await submitForm.mutateAsync({
                      firstName: values.firstName,
                      lastName: values.lastName,
                      email: values.email,
                      serviceNeeded: values.serviceNeeded as ServiceNeededType,
                      companyName: values.companyName,
                      message: values.message,
                    });
                    resetForm();
                    setSelectedService(null);
                  }}
                >
                  {({ isSubmitting, setFieldValue, values, errors, touched }) => (
                    <Form className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-5 text-left">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <CustomInput
                          name="firstName"
                          label="First Name"
                          type="text"
                          placeholder="e.g. Tolu"
                          variant="dark"
                        />
                        <CustomInput
                          name="lastName"
                          label="Last Name"
                          type="text"
                          placeholder="e.g. David"
                          variant="dark"
                        />
                        <CustomInput
                          name="email"
                          label="Email"
                          type="email"
                          placeholder="e.g. tolu.david@example.com"
                          variant="dark"
                        />
                        <CustomInput
                          name="companyName"
                          label="Company Name"
                          type="text"
                          placeholder="e.g. InfoTech"
                          variant="dark"
                        />
                        <div className="sm:col-span-2">
                          <CustomSelect
                            label="Service Needed"
                            options={serviceOptions}
                            selected={selectedService}
                            onChange={(option) => {
                              setSelectedService(option);
                              setFieldValue("serviceNeeded", option.id);
                            }}
                            placeholder="Select a service"
                            variant="dark"
                          />
                          {touched.serviceNeeded && errors.serviceNeeded && (
                            <p className="text-red-400 text-xs mt-1">{errors.serviceNeeded}</p>
                          )}
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm text-white/70 mb-2">Message</label>
                          <textarea
                            name="message"
                            value={values.message}
                            onChange={(e) => setFieldValue("message", e.target.value)}
                            placeholder="How can we help you grow your brand?"
                            rows={4}
                            className="w-full px-4 py-3 text-sm sm:text-base rounded-2xl border border-white/10 bg-black/40 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 resize-none"
                          />
                          {touched.message && errors.message && (
                            <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                          )}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="flex justify-center pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting || submitForm.isPending}
                          className="inline-flex items-center cursor-pointer justify-center gap-3 bg-white text-black px-8 sm:px-10 md:px-12 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-100 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span>{submitForm.isPending ? "Submitting..." : "Get Started"}</span>
                          <div className="w-6 h-6 rounded bg-black text-white flex items-center justify-center">
                            <FiArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </div>
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </motion.div>

              {/* Trusted By Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-4 sm:space-y-6 pt-8 sm:pt-12"
              >
                <p className="text-sm sm:text-base md:text-lg text-gray-400 uppercase tracking-wider font-medium">
                  TRUSTED BY 10+ COMPANIES
                </p>

                {/* Company Logos - Marquee */}
                <div className="relative overflow-hidden py-2">
                  <Marquee gradient={false} speed={40} pauseOnHover className="flex items-center gap-6 sm:gap-8 md:gap-10">
                    {[icons.spot, icons.sureid, icons.dbn, icons.smedan, icons.wecan, icons.butterfly, icons.hvc].map((logoSrc, index) => (
                      <div key={index} className="flex items-center justify-center mx-2 sm:mx-3 md:mx-4 opacity-80 hover:opacity-100 transition-opacity">
                        <Image
                          src={logoSrc}
                          alt="company logo"
                          width={140}
                          height={80}
                          className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
                        />
                      </div>
                    ))}
                  </Marquee>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyToTurn;