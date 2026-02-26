"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import CustomInput from '@/components/forms/CustomInput';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForgotPassword } from '@/lib/api';
import Navbar from '@/components/layouts/Navbar';
import ChatFooter from '../../(chatBox)/Footer';
import DecorativeBackground from '@/components/common/DecorativeBackground';

interface ForgetPasswordFormValues {
    email: string;
}

const ForgetPasswordPage = () => {
    const router = useRouter();
    const forgotPassword = useForgotPassword();
    const isSubmittingRef = useRef(false);
    const [agreedToPolicy, setAgreedToPolicy] = useState(false);

    // Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .required('Email is required')
            .email('Please enter a valid email address'),
    });

    const initialValues: ForgetPasswordFormValues = {
        email: '',
    };

    const handleSubmit = async (values: ForgetPasswordFormValues, { setSubmitting }: any) => {
        if (isSubmittingRef.current) {
            return;
        }

        isSubmittingRef.current = true;
        setSubmitting(true);

        try {
            await forgotPassword.mutateAsync({
                email: values.email,
            });

            toast.success('Reset link sent! Check your email.', {
                duration: 4000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });
            
            // Redirect to verify token page
            router.push(`${ROUTES.VERIFY_TOKEN}?email=${encodeURIComponent(values.email)}`);

        } catch (error: any) {
            console.error('Forget password error:', error);
            
            let errorMessage = 'An error occurred. Please try again.';
            if (error?.response?.data?.message) {
                 errorMessage = error.response.data.message;
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
                            Forgot Password?
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-base sm:text-md text-white/70 pb-8"
                        >
                            Enter your email address to receive reset instructions
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

                                            {/* Submit Button */}
                                            <div className='flex flex-col items-center gap-4 pt-4'>
                                                <label className="flex items-start gap-3 cursor-pointer group w-fit mx-auto">
                                                    <input
                                                        type="checkbox"
                                                        checked={agreedToPolicy}
                                                        onChange={(e) => setAgreedToPolicy(e.target.checked)}
                                                        className="mt-0.5 flex-shrink-0 w-5 h-5 appearance-none rounded border border-white/40 bg-transparent transition-all cursor-pointer
                                                            checked:bg-white checked:border-white
                                                            group-hover:border-white/70
                                                            [&:checked]:bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M3%208l3.5%203.5%206.5-7%22%20stroke%3D%22%23000%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')]
                                                            [&:checked]:bg-center [&:checked]:bg-no-repeat [&:checked]:bg-contain"
                                                    />
                                                    <span className="text-xs text-white/50 leading-relaxed">
                                                        I agree to Brand Locus Limited&apos;s{' '}
                                                        <Link
                                                            href={ROUTES.PRIVACY_POLICY}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-white/80 hover:text-white underline transition-colors"
                                                        >
                                                            privacy policy
                                                        </Link>
                                                        {' '}by sending reset link.
                                                    </span>
                                                </label>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting || forgotPassword.isPending || !agreedToPolicy}
                                                    className="w-full text-black bg-white/80 font-medium rounded-full px-8 py-3 cursor-pointer text-base sm:text-lg hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                                >
                                                    {isSubmitting || forgotPassword.isPending ? 'Sending...' : 'Send Reset Link'}
                                                </button>

                                                {/* Back to Login Link */}
                                                <Link
                                                    href={ROUTES.LOGIN}
                                                    className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2"
                                                >
                                                    ← Back to Login
                                                </Link>
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

export default ForgetPasswordPage;