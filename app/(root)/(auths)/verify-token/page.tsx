"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import CustomInput from '@/components/forms/CustomInput';
import { ROUTES } from '@/constants/routes';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/lib/api/services/authService';
import Navbar from '@/components/layouts/Navbar';
import ChatFooter from '../../(chatBox)/Footer';
import DecorativeBackground from '@/components/common/DecorativeBackground';

interface VerifyTokenFormValues {
    token: string;
}

const VerifyTokenPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    
    // Timer state
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [canResend, setCanResend] = useState(false);
    const [isResending, setIsResending] = useState(false);

    // Redirect if no email
    useEffect(() => {
        if (!email) {
            router.push(ROUTES.FORGET_PASSWORD);
        }
    }, [email, router]);

    // Timer logic
    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timerId);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleResendToken = async () => {
        if (!email || !canResend || isResending) return;

        setIsResending(true);
        try {
            await authService.forgotPassword({ email });
            toast.success('Token resent successfully!', {
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });
            // Reset timer
            setTimeLeft(300);
            setCanResend(false);
        } catch (error: any) {
            console.error('Resend token error:', error);
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to resend token';
            toast.error(errorMessage, {
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
        } finally {
            setIsResending(false);
        }
    };

    const initialValues: VerifyTokenFormValues = {
        token: '',
    };

    const validationSchema = Yup.object({
        token: Yup.string()
            .required('Token is required')
            .length(6, 'Token must be exactly 6 characters')
            .matches(/^[0-9]+$/, 'Token must be numeric'),
    });

    const handleSubmit = async (values: VerifyTokenFormValues, { setSubmitting }: any) => {
        if (!email) return;

        try {
            await authService.verifyToken({
                email,
                token: values.token,
            });

            toast.success('Token verified successfully!', {
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });

            // Redirect to set password or reset password page
            // Assuming the next step is to actually reset the password, we might need to pass the token 
            // or if the backend handles session/temp token after verify.
            // Based on typical flow, we likely go to reset-password page with email and token (as OTP/code)
            
            // Wait a moment for toast then redirect
             setTimeout(() => {
                 router.push(`${ROUTES.RESET_PASSWORD}?email=${encodeURIComponent(email)}`);
             }, 1000);

        } catch (error: any) {
            console.error('Verify token error:', error);
            const errorMessage = error?.response?.data?.message || 'Invalid token. Please try again.';
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
                <DecorativeBackground rightText="?" leftText="123" />

                <div className="max-w-2xl mx-auto relative z-10">
                    <div className="text-center my-8 sm:my-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold my-4 pt-6 pb-3"
                        >
                            Verify Token
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-base sm:text-md text-white/70 pb-8"
                        >
                            Enter the 6-digit code sent to <span className="text-white font-medium">{email}</span>
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
                                        
                                        {/* Token Input */}
                                        <div className="space-y-2">
                                            <CustomInput
                                                name="token"
                                                label="Verification Code"
                                                type="text"
                                                placeholder="Enter 6-digit code"
                                                variant="dark"
                                                maxLength={6}
                                            />
                                        </div>

                                        <div className="flex flex-col items-center gap-4 pt-4">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full text-black bg-white/80 font-medium rounded-full px-8 py-3 cursor-pointer text-base sm:text-lg hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? 'Verifying...' : 'Verify Token'}
                                            </button>

                                            <div className="text-center space-y-2">
                                                <p className="text-sm text-white/60">
                                                    Didn't receive the code?
                                                </p>
                                                {canResend ? (
                                                    <button
                                                        type="button"
                                                        onClick={handleResendToken}
                                                        disabled={isResending}
                                                        className="text-white hover:underline text-sm font-medium transition-colors"
                                                    >
                                                        {isResending ? 'Resending...' : 'Resend Code'}
                                                    </button>
                                                ) : (
                                                    <p className="text-sm text-white/40">
                                                        Resend in {formatTime(timeLeft)}
                                                    </p>
                                                )}
                                            </div>

                                            <Link
                                                href={ROUTES.FORGET_PASSWORD}
                                                className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-2 mt-2"
                                            >
                                                ← Back to Email
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
        </>
    );
};

export default VerifyTokenPage;