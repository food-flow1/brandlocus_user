"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import CustomInput from '@/components/forms/CustomInput';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLogin } from '@/lib/api';
import Navbar from '@/components/layouts/Navbar';
import ChatFooter from '../../(chatBox)/Footer';
import DecorativeBackground from '@/components/common/DecorativeBackground';

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginPage = () => {
    const router = useRouter();
    const login = useLogin();
    const isSubmittingRef = useRef(false);
    const formRef = useRef<HTMLFormElement>(null);

    // Clear any autofilled values on mount and ensure inputs are editable
    useEffect(() => {
        const clearAutofill = () => {
            // Find all inputs in the form
            const inputs = document.querySelectorAll('input[type="email"], input[type="password"], input[type="text"]');
            inputs.forEach((input) => {
                const htmlInput = input as HTMLInputElement;
                // Ensure input is not disabled or readonly
                htmlInput.disabled = false;
                htmlInput.readOnly = false;
                // Force editable state
                htmlInput.style.pointerEvents = 'auto';
                htmlInput.style.userSelect = 'text';
                (htmlInput.style as any).webkitUserSelect = 'text';
                htmlInput.style.cursor = 'text';
                // Clear any autofilled value if it exists
                if (htmlInput.value && htmlInput.matches(':-webkit-autofill')) {
                    htmlInput.value = '';
                }
            });
        };

        // Clear on mount
        clearAutofill();
        
        // Also clear after a short delay to catch late autofill
        const timeout = setTimeout(clearAutofill, 100);
        
        // Listen for autofill events
        const handleAutofill = () => {
            clearAutofill();
        };
        
        window.addEventListener('load', handleAutofill);
        document.addEventListener('DOMContentLoaded', handleAutofill);
        
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('load', handleAutofill);
            document.removeEventListener('DOMContentLoaded', handleAutofill);
        };
    }, []);

    // Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Email is required')
            .email('Please enter a valid email address'),
        password: Yup.string()
            .required('Password is required'),
    });

    const initialValues: LoginFormValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: LoginFormValues, { setSubmitting }: any) => {
        // Prevent double submission
        if (isSubmittingRef.current) {
            return;
        }

        isSubmittingRef.current = true;
        setSubmitting(true);

        try {
            // Call the API
            await login.mutateAsync({
                email: values.email,
                password: values.password,
            });

            // Show success toast
            toast.success('Login successful! Redirecting...', {
                duration: 2000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });

            // Redirect to chat box after a short delay
            setTimeout(() => {
                router.push(ROUTES.CHAT_BOX);
            }, 1500);

        } catch (error: any) {
            console.error('Login error:', error);

            // Handle specific error cases
            let errorMessage = 'An error occurred. Please try again.';
            
            if (error?.status === 401) {
                errorMessage = 'Invalid email or password. Please try again.';
            } else if (error?.status === 404) {
                errorMessage = 'User not found. Please check your email.';
            } else if (error?.message) {
                errorMessage = error.message;
            } else if (error?.errors) {
                errorMessage = Object.values(error.errors).flat().join(', ');
            }

            // Show error toast
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
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
            <Navbar />
            <div className="min-h-screen bg-[#0A0A0A] text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
                {/* Background Decorative Elements */}
                <DecorativeBackground rightText="A" leftText="Mr." />

                <div className="max-w-2xl mx-auto relative z-10">
                    {/* Header Section */}
                    <div className="text-center my-8 sm:my-12">
                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold my-4 pt-6 pb-3"
                        >
                            Welcome Back
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-base sm:text-md text-white/70 pb-8"
                        >
                            Sign in to continue your business journey
                        </motion.p>
                    </div>

                    {/* Form Section */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => {
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <Form 
                                        ref={formRef}
                                        className="space-y-6 bg-white/8 backdrop-blur-2xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden"
                                        autoComplete="off"
                                        noValidate
                                    >
                                        {/* Glass effect overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-2xl sm:rounded-3xl"></div>
                                        {/* Glass effect content wrapper */}
                                        <div className="relative z-10 space-y-6">
                                            {/* Email Input */}
                                            <CustomInput
                                                name="email"
                                                label="Email"
                                                type="email"
                                                placeholder="Enter your email"
                                                variant="dark"
                                            />

                                            {/* Password Input */}
                                            <CustomInput
                                                name="password"
                                                label="Password"
                                                type="password"
                                                placeholder="Enter your password"
                                                variant="dark"
                                            />

                                            {/* Submit Button */}
                                            <div className='flex flex-col items-center gap-4 pt-4'>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting || login.isPending}
                                                    className="w-full text-black bg-white/80 font-medium rounded-full px-8 py-3 cursor-pointer text-base sm:text-lg hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isSubmitting || login.isPending ? 'Logging in...' : 'Sign In'}
                                                </button>
                                                
                                                {/* Register Link */}
                                                <p className="text-sm text-white/60">
                                                    Don't have an account?{' '}
                                                    <Link 
                                                        href={ROUTES.AI_POWERED}
                                                        className="text-white/90 hover:text-white underline transition-colors"
                                                    >
                                                        Sign up
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </Form>
                                </motion.div>
                            );
                        }}
                    </Formik>
                </div>
            </div>
            <ChatFooter />
        </>
    );
};

export default LoginPage;
