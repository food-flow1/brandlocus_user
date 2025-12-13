"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import CustomInput from '@/components/forms/CustomInput';
import CustomCheckbox from '@/components/forms/CustomCheckbox';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRegisterAIGuidance } from '@/lib/api';
import Navbar from '@/components/layouts/Navbar';
import ChatFooter from '../../(chatBox)/Footer';
import DecorativeBackground from '@/components/common/DecorativeBackground';

interface PasswordFormValues {
    password: string;
    confirmPassword: string;
    agreed: boolean;
}

interface RegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    industryName: string;
    businessName: string;
    businessBrief: string;
    country: string;
    state: string;
}

const SetPasswordPage = () => {
    const router = useRouter();
    const registerAIGuidance = useRegisterAIGuidance();
    const isSubmittingRef = useRef(false);
    const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);

    // Load registration data from sessionStorage on mount
    useEffect(() => {
        const storedData = sessionStorage.getItem('registrationData');
        if (storedData) {
            try {
                const parsed = JSON.parse(storedData);
                setRegistrationData(parsed);
            } catch (error) {
                console.error('Failed to parse registration data:', error);
                // Redirect back to registration if data is invalid
                router.push(ROUTES.AI_POWERED);
            }
        } else {
            // Redirect back to registration if no data
            router.push(ROUTES.AI_POWERED);
        }
    }, [router]);

    // Yup validation schema
    const validationSchema = Yup.object({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters long'),
        confirmPassword: Yup.string()
            .required('Please confirm your password')
            .oneOf([Yup.ref('password')], 'Passwords do not match'),
        agreed: Yup.boolean()
            .oneOf([true], 'You must agree to the terms to continue')
            .required('You must agree to the terms to continue'),
    });

    const initialValues: PasswordFormValues = {
        password: '',
        confirmPassword: '',
        agreed: false,
    };

    const handleSubmit = async (values: PasswordFormValues, { setSubmitting, resetForm }: any) => {
        if (isSubmittingRef.current || !registrationData) {
            return;
        }

        isSubmittingRef.current = true;
        setSubmitting(true);

        try {
            // Combine registration data with password
            const payload = {
                ...registrationData,
                password: values.password,
                agreementToReceiveAIGeneratedResponse: values.agreed,
            };

            // Call the API
            await registerAIGuidance.mutateAsync(payload);

            // Show success toast
            toast.success('Registration successful! Redirecting to chat...', {
                duration: 3000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });

            // Clear registration data from sessionStorage
            sessionStorage.removeItem('registrationData');

            // Reset form
            resetForm();

            // Redirect to chat box after a short delay
            setTimeout(() => {
                router.push(ROUTES.CHAT_BOX);
            }, 1500);

        } catch (error: any) {
            console.error('Registration error:', error);

            let errorMessage = 'An error occurred. Please try again.';
            if (error?.status === 409) {
                errorMessage = error?.message || 'User with this email already exists.';
            } else if (error?.message) {
                errorMessage = error.message;
            }

            toast.error(errorMessage, {
                duration: 5000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
        } finally {
            isSubmittingRef.current = false;
            setSubmitting(false);
        }
    };

    // Show loading state while checking for registration data
    if (!registrationData) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                        <p className="text-white/70">Loading...</p>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    className: '',
                    duration: 4000,
                    style: {
                        background: '#1a1a1a',
                        color: '#fff',
                        borderRadius: '12px',
                        padding: '16px',
                        fontSize: '14px',
                    },
                    success: {
                        iconTheme: { primary: '#10b981', secondary: '#fff' },
                    },
                    error: {
                        iconTheme: { primary: '#ef4444', secondary: '#fff' },
                    },
                }}
            />
            <Navbar />
            <div className="min-h-screen bg-[#0A0A0A] text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
                <DecorativeBackground rightText="A" leftText="Mr." />

                <div className="max-w-2xl mx-auto relative z-10">
                    {/* Header Section */}
                    <div className="text-center my-8 sm:my-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold my-4 pt-6 pb-3"
                        >
                            Create Password
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-base sm:text-md text-white/70 pb-8"
                        >
                            Secure your account with a strong password
                        </motion.p>
                    </div>

                    {/* Form Section */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Form className="space-y-6 bg-white/8 backdrop-blur-2xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-2xl sm:rounded-3xl"></div>

                                    <div className="relative z-10 space-y-6">
                                        {/* Password Fields */}
                                        <div className="grid grid-cols-1 gap-4 sm:gap-6">
                                            <CustomInput
                                                name="password"
                                                label="Password"
                                                type="password"
                                                placeholder="Enter your password"
                                                variant="dark"
                                            />
                                            <CustomInput
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                type="password"
                                                placeholder="Confirm your password"
                                                variant="dark"
                                            />
                                        </div>

                                        {/* Consent Checkbox */}
                                        <CustomCheckbox
                                            name="agreed"
                                            label="I agree to receive AI-generated advice and marketing communications."
                                            variant="dark"
                                        />

                                        {/* Submit Button */}
                                        <div className='flex flex-col items-center gap-4 pt-4'>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || registerAIGuidance.isPending}
                                                className="w-full text-black bg-white/80 font-medium rounded-full px-8 py-3 cursor-pointer text-base sm:text-lg hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting || registerAIGuidance.isPending ? 'Creating account...' : 'Start chatting with Mr. A'}
                                            </button>

                                            {/* Back Link */}
                                            <p className="text-sm text-white/60">
                                                <Link
                                                    href={ROUTES.AI_POWERED}
                                                    className="text-white/90 hover:text-white underline transition-colors"
                                                >
                                                    ← Back to details
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </Form>
                            </motion.div>
                        )}
                    </Formik>
                </div>
            </div>
            <ChatFooter />
        </>
    );
};

export default SetPasswordPage;
