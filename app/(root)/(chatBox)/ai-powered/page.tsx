"use client";

import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import CustomInput from '@/components/forms/CustomInput';
import CustomSelect, { CustomSelectOption } from '@/components/forms/CustomSelect';
import { ROUTES } from '@/constants/routes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Country, State } from 'country-state-city';
import DecorativeBackground from '@/components/common/DecorativeBackground';
import { industryOptions } from '@/constants/data';

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    businessName: string;
    businessBrief: string;
    industrySector: string;
    country: string;
    state: string;
}

const AIPowered = () => {
    const router = useRouter();
    const isSubmittingRef = useRef(false);

    // Get Nigeria's ISO code
    const nigeriaCountry = Country.getAllCountries().find(c => c.name === 'Nigeria');
    const defaultCountryCode = nigeriaCountry?.isoCode || 'NG';

    // Get all countries as options
    const countryOptions: CustomSelectOption[] = useMemo(() => {
        return Country.getAllCountries().map(country => ({
            id: country.isoCode,
            label: country.name,
        }));
    }, []);

    // Get states for selected country
    const getStateOptions = (countryCode: string): CustomSelectOption[] => {
        if (!countryCode) return [];
        return State.getStatesOfCountry(countryCode).map(state => ({
            id: state.isoCode,
            label: state.name,
        }));
    };

    // Yup validation schema
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required('First name is required')
            .min(2, 'First name must be at least 2 characters'),
        lastName: Yup.string()
            .required('Last name is required')
            .min(2, 'Last name must be at least 2 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Please enter a valid email address'),
        businessName: Yup.string()
            .required('Business name is required')
            .min(2, 'Business name must be at least 2 characters'),
        businessBrief: Yup.string()
            .required('Business brief is required')
            .min(10, 'Business brief must be at least 10 characters'),
        industrySector: Yup.string()
            .required('Industry sector is required'),
        country: Yup.string()
            .required('Country is required'),
        state: Yup.string()
            .required('State is required'),
    });

    const initialValues: FormValues = {
        firstName: '',
        lastName: '',
        email: '',
        businessName: '',
        businessBrief: '',
        industrySector: '',
        country: defaultCountryCode,
        state: '',
    };

    const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
        // Prevent double submission
        if (isSubmittingRef.current) {
            return;
        }

        isSubmittingRef.current = true;
        setSubmitting(true);

        try {
            // Find the selected industry option to get the label
            const selectedIndustry = industryOptions.find(opt => opt.id === values.industrySector);

            if (!selectedIndustry) {
                throw new Error('Please select a valid industry sector');
            }

            // Get country and state names
            const selectedCountry = Country.getCountryByCode(values.country);
            const selectedState = State.getStateByCodeAndCountry(values.state, values.country);

            if (!selectedCountry) {
                throw new Error('Please select a valid country');
            }
            if (!selectedState) {
                throw new Error('Please select a valid state');
            }

            // Store registration data in sessionStorage for the next step
            const registrationData = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                industryName: selectedIndustry.label,
                businessName: values.businessName,
                businessBrief: values.businessBrief,
                country: selectedCountry.name,
                state: selectedState.name,
            };

            sessionStorage.setItem('registrationData', JSON.stringify(registrationData));

            // Navigate to set-password page
            router.push(ROUTES.SET_PASSWORD);

        } catch (error: any) {
            console.error('Form submission error:', error);

            // Show error toast
            toast.error(error?.message || 'An error occurred. Please try again.', {
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
                    duration: 5000,
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
            <div className="min-h-screen bg-[#0A0A0A] text-white py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden">
                {/* Background Decorative Elements */}
                <DecorativeBackground rightText="A" leftText="Mr." />

                <div className="max-w-5xl mx-auto relative z-10">
                    {/* Header Section */}
                    <div className="text-center my-8 sm:my-12">
                        {/* Powered by GPT Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex items-center justify-center gap-2 mb-4 border border-white/10 rounded-full px-4 py-2 w-fit mx-auto"
                        >
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.1996 9.20902C19.55 8.35107 19.6672 7.41563 19.539 6.49775C19.4109 5.57987 19.0421 4.71227 18.47 3.9831C17.898 3.25393 17.1431 2.68918 16.2821 2.34624C15.4211 2.0033 14.4847 1.89439 13.568 2.03058C12.9999 1.29878 12.2483 0.730348 11.3894 0.382993C10.5306 0.0356375 9.59509 -0.0782679 8.67798 0.0528425C7.76088 0.183953 6.8948 0.55541 6.16768 1.1295C5.44056 1.70358 4.87831 2.45985 4.538 3.32152C3.61975 3.44721 2.75114 3.81375 2.02044 4.38388C1.28974 4.95401 0.722982 5.70742 0.377772 6.56754C0.0325615 7.42766 -0.0788013 8.36384 0.0549998 9.28094C0.188801 10.198 0.562997 11.0634 1.13956 11.789C0.858206 12.4785 0.726754 13.22 0.753935 13.9642C0.781117 14.7084 0.96631 15.4383 1.29722 16.1054C1.62812 16.7725 2.09717 17.3616 2.67322 17.8336C3.24926 18.3055 3.91912 18.6496 4.63831 18.8428C5.08409 18.9648 5.54395 19.0278 6.00612 19.0303C6.26249 19.03 6.5185 19.0109 6.77206 18.9731C7.34029 19.7046 8.09194 20.2728 8.95073 20.6199C9.80952 20.9671 10.7449 21.0808 11.6618 20.9496C12.5788 20.8184 13.4447 20.4469 14.1717 19.8729C14.8987 19.2989 15.4608 18.5427 15.8011 17.6812C16.7194 17.5555 17.588 17.189 18.3187 16.6188C19.0494 16.0487 19.6161 15.2953 19.9614 14.4352C20.3066 13.5751 20.4179 12.6389 20.2841 11.7218C20.1503 10.8047 19.7761 9.93934 19.1996 9.2137V9.20902ZM15.3117 3.60183C16.2568 3.85447 17.0658 4.46642 17.566 5.30712C18.0662 6.14782 18.2181 7.15071 17.9892 8.10183C17.9002 8.04277 17.8102 7.98558 17.7164 7.93214L13.5446 5.51902C13.4305 5.45319 13.3012 5.41854 13.1696 5.41854C13.0379 5.41854 12.9086 5.45319 12.7946 5.51902L8.66956 7.9012V6.1687L12.4664 3.97683C12.8924 3.72941 13.3632 3.56888 13.8516 3.50452C14.3399 3.44015 14.8362 3.47323 15.3117 3.60183ZM11.6696 11.3653L10.1696 12.2315L8.66956 11.3653V9.63277L10.1696 8.76652L11.6696 9.63277V11.3653ZM5.66956 5.24902C5.66991 4.51589 5.88514 3.79895 6.28864 3.18686C6.69214 2.57476 7.2662 2.09437 7.93984 1.80508C8.61348 1.5158 9.35713 1.43031 10.0788 1.5592C10.8005 1.68809 11.4686 2.02569 12.0005 2.53027C11.9067 2.57808 11.813 2.62402 11.7192 2.68214L7.54456 5.08683C7.43066 5.15259 7.33606 5.24715 7.27024 5.36101C7.20442 5.47488 7.1697 5.60406 7.16956 5.73558V10.499L5.66956 9.63277V5.24902ZM2.00019 6.6487C2.47804 5.81534 3.25925 5.19869 4.18081 4.92745C4.17425 5.03433 4.16956 5.1412 4.16956 5.24902V10.0659C4.16953 10.1976 4.20417 10.3269 4.27 10.441C4.33583 10.555 4.43052 10.6497 4.54456 10.7156L8.66956 13.0968L7.16956 13.9678L3.37269 11.7712C2.51141 11.2739 1.88296 10.4548 1.62557 9.4942C1.36817 8.53355 1.50293 7.51 2.00019 6.6487ZM5.02737 17.3962C4.0823 17.1436 3.27336 16.5316 2.77315 15.6909C2.27293 14.8502 2.12104 13.8473 2.34987 12.8962C2.43894 12.9553 2.52894 13.0125 2.62269 13.0659L6.79456 15.479C6.90858 15.5448 7.03791 15.5795 7.16956 15.5795C7.30122 15.5795 7.43055 15.5448 7.54456 15.479L11.6696 13.0968V14.8293L7.87269 17.0212C7.44673 17.2686 6.97595 17.4291 6.48757 17.4935C5.99919 17.5579 5.50289 17.5248 5.02737 17.3962ZM14.6696 15.749C14.67 16.4824 14.4553 17.1997 14.0522 17.8123C13.6491 18.4249 13.0753 18.9059 12.4016 19.1957C11.728 19.4856 10.9842 19.5715 10.2622 19.443C9.5402 19.3144 8.87175 18.977 8.33956 18.4725C8.43331 18.4246 8.52706 18.374 8.62081 18.3196L12.7946 15.9112C12.9085 15.8454 13.0031 15.7509 13.0689 15.637C13.1347 15.5231 13.1694 15.394 13.1696 15.2625V10.499L14.6696 11.3653V15.749ZM18.3389 14.3493C17.8611 15.1827 17.0799 15.7993 16.1583 16.0706C16.1649 15.9637 16.1696 15.8568 16.1696 15.749V10.9321C16.1696 10.8005 16.135 10.6711 16.0691 10.557C16.0033 10.443 15.9086 10.3483 15.7946 10.2825L11.6696 7.9012L13.1696 7.03495L16.9664 9.22683C17.8277 9.72413 18.4562 10.5432 18.7136 11.5038C18.9709 12.4645 18.8362 13.488 18.3389 14.3493Z" fill="#969696" />
                            </svg>

                            <span className="text-sm text-white/70">Powered by GPT</span>
                        </motion.div>

                        {/* Main Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold my-4 pt-6 pb-3"
                        >
                            <div className='text-white/70'>AI-Powered Business</div> Guidance
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-base sm:text-md text-white/70 pb-2"
                        >
                            Get tailored business advice from Mr. A based on your challenge
                        </motion.p>
                    </div>

                    {/* Form Section */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue, values }) => {
                            // Find selected industry option
                            const selectedIndustry = industryOptions.find(opt => opt.id === values.industrySector);

                            // Find selected country and state options
                            const selectedCountry = countryOptions.find(opt => opt.id === values.country);
                            const stateOptions = getStateOptions(values.country);
                            const selectedState = stateOptions.find(opt => opt.id === values.state);

                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <Form className="space-y-8 bg-white/8 backdrop-blur-2xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
                                        {/* Glass effect overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-2xl sm:rounded-3xl"></div>

                                        {/* Glass effect content wrapper */}
                                        <div className="relative z-10 space-y-8">

                                            {/* ===== SECTION 1: DETAILS ===== */}
                                            <div className="space-y-6">
                                                {/* <div className="border-b border-white/10 pb-4">
                                                    <h2 className="text-lg sm:text-xl font-semibold text-white">Your Details</h2>
                                                    <p className="text-sm text-white/50 mt-1">Tell us about you and your business</p>
                                                </div> */}

                                                {/* Name Fields - Two Column Grid */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                                    <CustomInput
                                                        name="firstName"
                                                        label="First Name"
                                                        type="text"
                                                        placeholder="Enter your first name"
                                                        variant="dark"
                                                    />
                                                    <CustomInput
                                                        name="lastName"
                                                        label="Last Name"
                                                        type="text"
                                                        placeholder="Enter your last name"
                                                        variant="dark"
                                                    />
                                                </div>

                                                {/* Email and Business Name - Two Column Grid */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                                    <CustomInput
                                                        name="email"
                                                        label="Email"
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        variant="dark"
                                                    />
                                                    <CustomInput
                                                        name="businessName"
                                                        label="Business Name"
                                                        type="text"
                                                        placeholder="Enter your business name"
                                                        variant="dark"
                                                    />
                                                </div>

                                                {/* Country and State - Two Column Grid */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                                                    {/* Country */}
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-white/70">
                                                            Country
                                                        </label>
                                                        <CustomSelect
                                                            options={countryOptions}
                                                            selected={selectedCountry || null}
                                                            onChange={(value) => {
                                                                setFieldValue('country', value.id);
                                                                // Reset state when country changes
                                                                setFieldValue('state', '');
                                                            }}
                                                            placeholder="Select country"
                                                            variant="dark"
                                                            searchable={true}
                                                        />
                                                        <ErrorMessage name="country">
                                                            {(msg) => <p className="text-xs text-red-400">{msg}</p>}
                                                        </ErrorMessage>
                                                    </div>

                                                    {/* State */}
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-white/70">
                                                            State
                                                        </label>
                                                        <CustomSelect
                                                            options={stateOptions}
                                                            selected={selectedState || null}
                                                            onChange={(value) => {
                                                                setFieldValue('state', value.id);
                                                            }}
                                                            placeholder={values.country ? "Select state" : "Select country first"}
                                                            variant="dark"
                                                            searchable={true}
                                                            disabled={!values.country}
                                                        />
                                                        <ErrorMessage name="state">
                                                            {(msg) => <p className="text-xs text-red-400">{msg}</p>}
                                                        </ErrorMessage>
                                                    </div>

                                                     {/* Industry Sector - Full Width */}
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-white/70">
                                                        Sector
                                                    </label>
                                                    <CustomSelect
                                                        options={industryOptions}
                                                        selected={selectedIndustry || null}
                                                        onChange={(value) => {
                                                            setFieldValue('industrySector', value.id);
                                                        }}
                                                        placeholder="Select industry sector"
                                                        variant="dark"
                                                        searchable={true}
                                                    />
                                                    <ErrorMessage name="industrySector">
                                                        {(msg) => <p className="text-xs text-red-400">{msg}</p>}
                                                    </ErrorMessage>
                                                </div>
                                                </div>
                                                   {/* Business Brief - Full Width */}
                                                <div>
                                                    <label className="block text-sm font-medium text-white/70 mb-2">
                                                        Tell us about your business (A business brief)
                                                    </label>
                                                    <Field
                                                        as="textarea"
                                                        name="businessBrief"
                                                        rows={4}
                                                        placeholder="Briefly describe your business, what you do, and your target market..."
                                                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                                                    />
                                                    <ErrorMessage name="businessBrief">
                                                        {(msg) => <p className="text-xs text-red-400 mt-1">{msg}</p>}
                                                    </ErrorMessage>
                                                </div>
                                            </div>

                                            {/* ===== SUBMIT ===== */}
                                            <div className="space-y-6 pt-2">
                                                {/* Submit Button */}
                                                <div className='flex flex-col items-center gap-4'>
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="w-fit mx-auto text-black bg-white/80 font-medium rounded-full px-[4rem] py-3 cursor-pointer text-base sm:text-md hover:bg-white hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {isSubmitting ? 'Processing...' : 'Continue'}
                                                    </button>

                                                    {/* Login Link */}
                                                    <p className="text-sm text-white/60 mt-4">
                                                        Already have an account?{' '}
                                                        <Link
                                                            href={ROUTES.LOGIN}
                                                            className="text-white/90 hover:text-white underline transition-colors ml-1"
                                                        >
                                                            Login
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </motion.div>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default AIPowered;