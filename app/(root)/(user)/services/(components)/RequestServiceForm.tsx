"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useSubmitForm } from "@/lib/api/hooks/useForms";
import CustomInput from "@/components/forms/CustomInput";
import { usePathname } from 'next/navigation';
import { getServiceFromPath, industryOptions } from '@/constants/data';
import CustomSelect, { CustomSelectOption } from '@/components/forms/CustomSelect';
import { ServiceNeededType } from "@/lib/api/types";

// Validation Schema
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  companyName: Yup.string(),
  industryName: Yup.string().required("Please select a sector"),
  message: Yup.string().required("Message is required"),
});

// Initial Values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  companyName: "",
  industryName: "",
  message: "",
};

const RequestServiceForm: React.FC = () => {
  const submitForm = useSubmitForm();
  const pathname = usePathname();
  const serviceNeeded = getServiceFromPath(pathname);
  const [selectedSector, setSelectedSector] = useState<CustomSelectOption | null>(null);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-4 sm:space-y-6"
    >
      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
        Request This Service
      </h3>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 md:p-8">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            setFormMessage(null);
            try {
              await submitForm.mutateAsync({
                ...values,
                industryName: values.industryName as ServiceNeededType,
                serviceNeeded: serviceNeeded,
              });
              setFormMessage({ type: 'success', text: "Request sent successfully! We'll be in touch soon." });
              resetForm();
              setSelectedSector(null);
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again.";
              setFormMessage({ type: 'error', text: errorMessage });
            }
          }}
        >
          {({ isSubmitting, errors, touched, values, handleChange, handleBlur, setFieldValue }) => (
            <Form className="space-y-4 sm:space-y-5">
              {/* Form Message */}
              {formMessage && (
                <div className={`p-4 rounded-xl text-sm font-medium ${
                  formMessage.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {formMessage.text}
                </div>
              )}
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CustomInput
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                  variant="light"
                />
                <CustomInput
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  variant="light"
                />
              </div>

              {/* Email */}
              <CustomInput
                name="email"
                label="Email"
                type="email"
                placeholder="Email address..."
                variant="light"
              />

              {/* Company Name */}
              <CustomInput
                name="companyName"
                label="Company Name"
                placeholder="Your Company"
                variant="light"
              />

              {/* Sector Selection */}
              <div className="space-y-2">
                <CustomSelect
                  label="Sector"
                  options={industryOptions}
                  selected={selectedSector}
                  onChange={(option) => {
                    setSelectedSector(option);
                    setFieldValue("industryName", option.id);
                  }}
                  placeholder="Select a sector"
                  variant="light"
                />
                {touched.industryName && errors.industryName && (
                  <p className="text-sm text-red-600">{errors.industryName}</p>
                )}
              </div>

              {/* Message - Custom Textarea since CustomInput doesn't support it yet */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-600">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message, description..."
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-2xl text-base focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message && touched.message
                      ? "border-red-500 focus:ring-red-500 bg-white"
                      : "border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:ring-gray-400"
                  }`}
                />
                {errors.message && touched.message && (
                  <p className="text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || submitForm.isPending}
                className="w-full bg-black text-white py-3 sm:py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  "Submit"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default RequestServiceForm;

