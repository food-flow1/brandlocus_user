"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import CustomInput from '@/components/forms/CustomInput';
import { ROUTES } from '@/constants/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/lib/api/services/authService';
import Navbar from '@/components/layouts/Navbar';
import ChatFooter from '../../(chatBox)/Footer';
import DecorativeBackground from '@/components/common/DecorativeBackground';
import Link from 'next/link';

interface ResetPasswordFormValues {
    newPassword: string;
    confirmNewPassword: string;
}

const ResetPasswordPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    // Modal state
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Redirect if no email
    useEffect(() => {
        if (!email) {
            router.push(ROUTES.FORGET_PASSWORD);
        }
    }, [email, router]);

    const initialValues: ResetPasswordFormValues = {
        newPassword: '',
        confirmNewPassword: '',
    };

    const validationSchema = Yup.object({
        newPassword: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmNewPassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
    });

    const handleSubmit = async (values: ResetPasswordFormValues, { setSubmitting }: any) => {
        if (!email) return;

        try {
            await authService.confirmResetPassword({
                email,
                newPassword: values.newPassword,
                confirmNewPassword: values.confirmNewPassword,
            });

            setShowSuccessModal(true);

        } catch (error: any) {
            console.error('Reset password error:', error);
            const errorMessage = error?.response?.data?.message || 'Failed to reset password. Please try again.';
            toast.error(errorMessage, {
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleModalClose = () => {
        setShowSuccessModal(false);
        router.push(ROUTES.LOGIN);
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
                <DecorativeBackground rightText="&" leftText="*" />

                <div className="max-w-2xl mx-auto relative z-10">
                    <div className="text-center my-8 sm:my-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold my-4 pt-6 pb-3"
                        >
                            Reset Password
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-base sm:text-md text-white/70 pb-8"
                        >
                            Create a new strong password for your account
                        </motion.p>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Form
                                    className="space-y-6 bg-white/8 backdrop-blur-2xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden"
                                    autoComplete="off"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-2xl sm:rounded-3xl"></div>
                                    <div className="relative z-10 space-y-6">

                                        <CustomInput
                                            name="newPassword"
                                            label="New Password"
                                            type="password"
                                            placeholder="Enter new password"
                                            variant="dark"
                                        />

                                        <div className="space-y-1">
                                            <CustomInput
                                                name="confirmNewPassword"
                                                label="Confirm Password"
                                                type="password"
                                                placeholder="Confirm new password"
                                                variant="dark"
                                            />
                                        </div>

                                        <div className="flex flex-col items-center gap-4 pt-4">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full text-black bg-white/80 font-medium rounded-full px-8 py-3 cursor-pointer text-base sm:text-lg hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? 'Resetting...' : 'Reset Password'}
                                            </button>
                                            <Link
                                                href={ROUTES.LOGIN}
                                                className="text-white/60 text-center hover:text-white text-sm transition-colors flex items-center gap-2"
                                            >
                                                ← Back to Login
                                            </Link>
                                        </div>


                                    </div>
                                </Form>
                            </motion.div>
                        )}
                    </Formik>
                </div>
            </div>

            <ChatFooter />

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={handleModalClose}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-[#1A1A1A] border border-white/10 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-2">Password Reset!</h3>
                            <p className="text-white/60 mb-8">
                                Your password has been successfully reset. You can now login with your new password.
                            </p>

                            <button
                                onClick={handleModalClose}
                                className="w-full bg-white text-black font-medium rounded-full px-6 py-3 hover:bg-gray-100 transition-colors"
                            >
                                Continue to Login
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ResetPasswordPage;