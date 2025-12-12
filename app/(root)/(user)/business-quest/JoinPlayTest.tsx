"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomSelect, { CustomSelectOption } from "@/components/forms/CustomSelect";
import CustomInput from "@/components/forms/CustomInput";
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
    serviceNeeded: Yup.string().required("Please select a sector"),
    companyName: Yup.string().required("Company name is required").min(2, "Company name must be at least 2 characters"),
    message: Yup.string().required("Business brief is required").min(10, "Business brief must be at least 10 characters"),
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

const JoinPlayTest = () => {
    const submitForm = useSubmitForm();
    const [selectedService, setSelectedService] = useState<CustomSelectOption | null>(null);
    const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    return (
        <section className="w-full bg-[#050505] text-white py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute -left-32 -top-20 w-80 h-80 rounded-full bg-white/15 blur-[120px] mix-blend-screen"
                    animate={{ y: ["0%", "25%", "-15%"], x: [0, 20, -10], scale: [1, 1.15, 0.95] }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute right-0 top-1/3 w-96 h-96 rounded-full bg-white/10 blur-[140px] mix-blend-screen"
                    animate={{ y: ["0%", "-20%", "15%"], x: [0, -30, 20], scale: [1, 0.9, 1.1], rotate: [0, 25, -15, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                    className="absolute -bottom-24 left-1/4 w-72 h-72 rounded-full border border-white/30 blur-[80px] opacity-70"
                    animate={{ y: ["0%", "30%", "-10%"], rotate: [0, -20, 20, 0], scale: [1, 1.2, 0.9] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            <div className="max-w-4xl mx-auto relative z-10 space-y-8">
                {/* Badge */}
                <div className="flex justify-center">
                    <button className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-sm sm:text-base font-medium">
                        <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-white text-black text-xs">
                            ✦
                        </span>
                        Be the first to play
                    </button>
                </div>

                {/* Heading */}
                <div className="text-center space-y-3">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                        Join Playtest List
                    </h2>
                </div>

                {/* Form */}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        if (!values.serviceNeeded) return;
                        setFormMessage(null);
                        try {
                            await submitForm.mutateAsync({
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                                serviceNeeded: values.serviceNeeded as ServiceNeededType,
                                companyName: values.companyName,
                                message: values.message,
                            });
                            setFormMessage({ type: 'success', text: 'Form submitted successfully! We\'ll be in touch soon.' });
                            resetForm();
                            setSelectedService(null);
                        } catch (error) {
                            const errorMessage = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
                            setFormMessage({ type: 'error', text: errorMessage });
                        }
                    }}
                >
                    {({ isSubmitting, setFieldValue, values, errors, touched }) => (
                        <Form className="bg-white/5 border border-white/10 rounded-[3rem] p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6">
                            {/* Form Message */}
                            {formMessage && (
                                <div className={`p-4 rounded-2xl text-center text-sm sm:text-base ${
                                    formMessage.type === 'success'
                                        ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                                        : 'bg-red-500/20 border border-red-500/30 text-red-400'
                                }`}>
                                    {formMessage.text}
                                </div>
                            )}
                            <p className="text-sm sm:text-base text-white/70 text-center pb-6">
                                We&apos;ll only use your info for Business Quest updates. No resale.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
                                        label="Sector"
                                        options={serviceOptions}
                                        selected={selectedService}
                                        onChange={(option) => {
                                            setSelectedService(option);
                                            setFieldValue("serviceNeeded", option.id);
                                        }}
                                        placeholder="Select a sector"
                                        variant="dark"
                                    />
                                    {touched.serviceNeeded && errors.serviceNeeded && (
                                        <p className="text-red-400 text-xs mt-1">{errors.serviceNeeded}</p>
                                    )}
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm text-white/70 mb-2">Tell us about your business (A business brief)</label>
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
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || submitForm.isPending}
                                    className="inline-flex items-center gap-3 bg-white text-black font-medium rounded-full px-8 sm:px-12 py-2 cursor-pointer sm:py-3 text-base sm:text-lg shadow-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitForm.isPending ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Join the Playtest List
                                            <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-black text-white text-xs">
                                                ↗
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
};

export default JoinPlayTest;
