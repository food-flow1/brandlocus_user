"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiClock, FiUser, FiMail, FiPhone, FiMessageSquare, FiCheck, FiCalendar } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import Calendar from 'react-calendar';
import { format, addDays, setHours, setMinutes, isSameDay, isAfter, isBefore, startOfDay } from 'date-fns';
import toast from 'react-hot-toast';
import { useProfile, tokenStorage } from '@/lib/api';
import 'react-calendar/dist/Calendar.css';

interface BookingCalendarModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface BookingFormData {
    name: string;
    email: string;
    phone: string;
    notes: string;
}

// Available time slots (30-minute intervals from 11:00 AM to 4:30 PM)
const TIME_SLOTS = [
    '11:00am', '11:30am', '12:00pm', '12:30pm',
    '1:00pm', '1:30pm', '2:00pm', '2:30pm',
    '3:00pm', '3:30pm', '4:00pm', '4:30pm'
];

const BookingCalendarModal: React.FC<BookingCalendarModalProps> = ({ isOpen, onClose }) => {
    const [mounted, setMounted] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [step, setStep] = useState<'calendar' | 'form' | 'success'>('calendar');
    const [formData, setFormData] = useState<BookingFormData>({
        name: '',
        email: '',
        phone: '',
        notes: ''
    });

    // Fetch user profile if logged in
    const isAuthenticated = tokenStorage.isAuthenticated();
    const { data: profile } = useProfile();

    React.useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Prefill form data when user is authenticated and moves to form step
    useEffect(() => {
        if (isAuthenticated && profile && step === 'form') {
            setFormData(prev => ({
                name: prev.name || `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
                email: prev.email || profile.email || '',
                phone: prev.phone || '',
                notes: prev.notes
            }));
        }
    }, [isAuthenticated, profile, step]);

    // Reset state when modal closes
    React.useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setSelectedDate(null);
                setSelectedTime(null);
                setStep('calendar');
                setFormData({ name: '', email: '', phone: '', notes: '' });
            }, 300);
        }
    }, [isOpen]);

    const handleDateChange = (value: Date | null | (Date | null)[]) => {
        // Handle the case where value could be null or a date range
        if (value && !Array.isArray(value)) {
            setSelectedDate(value);
            setSelectedTime(null);
        }
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleContinue = () => {
        if (selectedDate && selectedTime) {
            setStep('form');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Here you would send the booking data to your backend
        console.log('Booking Data:', {
            date: selectedDate,
            time: selectedTime,
            ...formData
        });

        setStep('success');
        
        toast.success('Consultation booked successfully!', {
            duration: 3000,
            style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)',
            },
        });
    };

    const handleBack = () => {
        setStep('calendar');
    };

    const handleClose = () => {
        onClose();
    };

    // Disable past dates and weekends
    const tileDisabled = ({ date }: { date: Date }) => {
        const today = startOfDay(new Date());
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        return isBefore(date, today) || isWeekend;
    };

    if (!mounted || !isOpen) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative border border-white/20 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2.5 rounded-xl bg-white/5 hover:bg-white/15 transition-all duration-200 z-20 border border-white/10 hover:border-white/20 group"
                        >
                            <FiX className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                        </button>

                        {/* Content */}
                        <div className="relative z-10 p-6 sm:p-8">
                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
                                    <HiSparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                                    <span className="text-xs sm:text-sm text-white/80 font-medium">30 Min Free Consultation</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                    Book Your Consultation
                                </h2>
                                <p className="text-sm sm:text-base text-white/60">
                                    {step === 'calendar' && 'Select a date and time that works for you'}
                                    {step === 'form' && 'Enter your details to complete booking'}
                                    {step === 'success' && 'Your consultation has been scheduled!'}
                                </p>
                            </div>

                            {/* Calendar Step */}
                            {step === 'calendar' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Calendar */}
                                        <div className="booking-calendar-container">
                                            <Calendar
                                                onChange={handleDateChange}
                                                value={selectedDate}
                                                minDate={new Date()}
                                                maxDate={addDays(new Date(), 60)}
                                                tileDisabled={tileDisabled}
                                                className="custom-calendar"
                                            />
                                        </div>

                                        {/* Time Slots */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                                <FiClock className="w-5 h-5" />
                                                {selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'Select a date'}
                                            </h3>
                                            <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                                {selectedDate ? (
                                                    TIME_SLOTS.map((time) => (
                                                        <button
                                                            key={time}
                                                            onClick={() => handleTimeSelect(time)}
                                                            className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                                                selectedTime === time
                                                                    ? 'bg-white/20 text-white border-2 border-white/40'
                                                                    : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white'
                                                            }`}
                                                        >
                                                            {time}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <p className="col-span-2 text-center text-white/50 py-8">
                                                        Please select a date first
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Continue Button */}
                                    <button
                                        onClick={handleContinue}
                                        disabled={!selectedDate || !selectedTime}
                                        className="w-full py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed border border-white/20 hover:border-white/30"
                                    >
                                        Continue to Details
                                    </button>
                                </div>
                            )}

                            {/* Form Step */}
                            {step === 'form' && (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Selected Date/Time Display */}
                                    <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                                        <div className="flex items-center gap-2 text-white">
                                            <FiCalendar className="w-5 h-5" />
                                            <span className="font-medium">
                                                {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-white/70">
                                                <FiUser className="inline w-4 h-4 mr-1" />
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-white/70">
                                                <FiMail className="inline w-4 h-4 mr-1" />
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-white/70">
                                            <FiPhone className="inline w-4 h-4 mr-1" />
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-white/70">
                                            <FiMessageSquare className="inline w-4 h-4 mr-1" />
                                            Additional Notes
                                        </label>
                                        <textarea
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 transition-all resize-none"
                                            placeholder="Tell us about your business goals or challenges..."
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={handleBack}
                                            className="flex-1 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-200 border border-white/10 hover:border-white/20"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-medium transition-all duration-200 border border-white/20 hover:border-white/30"
                                        >
                                            Confirm Booking
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Success Step */}
                            {step === 'success' && (
                                <div className="text-center py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", duration: 0.5 }}
                                        className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center"
                                    >
                                        <FiCheck className="w-10 h-10 text-green-400" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-white mb-3">
                                        Booking Confirmed!
                                    </h3>
                                    <p className="text-white/70 mb-2">
                                        Your consultation is scheduled for:
                                    </p>
                                    <p className="text-lg font-semibold text-white mb-6">
                                        {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')} at {selectedTime}
                                    </p>
                                    <p className="text-sm text-white/60 mb-8">
                                        A confirmation email has been sent to <span className="text-white font-medium">{formData.email}</span>
                                    </p>
                                    <button
                                        onClick={handleClose}
                                        className="px-8 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-medium transition-all duration-200 border border-white/20 hover:border-white/30"
                                    >
                                        Done
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default BookingCalendarModal;
