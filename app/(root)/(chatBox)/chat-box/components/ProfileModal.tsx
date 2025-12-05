"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCamera } from 'react-icons/fi';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import CustomInput from '@/components/forms/CustomInput';
import CustomSelect, { CustomSelectOption } from '@/components/forms/CustomSelect';
import { Country, State } from 'country-state-city';
import { useProfile, useUpdateProfile, useChangePassword, useUploadProfileImage } from '@/lib/api';
import toast from 'react-hot-toast';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface ProfileFormValues {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    country: string;
    state: string;
    businessName: string;
    industryName: string;
}

interface PasswordFormValues {
    oldPassword: string;
    password: string;
    newPassword: string;
}

const genderOptions: CustomSelectOption[] = [
    { id: 'Male', label: 'Male' },
    { id: 'Female', label: 'Female' },
    { id: 'Other', label: 'Other' },
    { id: 'Prefer not to say', label: 'Prefer not to say' },
];

const profileValidationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    gender: Yup.string().required('Gender is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    businessName: Yup.string().required('Business name is required'),
    industryName: Yup.string().required('Industry name is required'),
});

const passwordValidationSchema = Yup.object({
    oldPassword: Yup.string().required('Current password is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(128, 'Password must be at most 128 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
        .matches(/^\S*$/, 'Password must not contain spaces')
        .required('New password is required'),
    newPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),
});

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
    const { data: profile, refetch } = useProfile();
    const updateProfile = useUpdateProfile();
    const changePassword = useChangePassword();
    const uploadProfileImage = useUploadProfileImage();
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Fix autofill making inputs un-editable - Optimized approach
    useEffect(() => {
        if (!isOpen || activeTab !== 'password') return;

        let isRunning = false;
        let timeoutId: NodeJS.Timeout | null = null;

        const fixAutofillInputs = () => {
            if (isRunning) return;
            isRunning = true;

            try {
                // Find all password inputs in the modal (scoped to modal only)
                const modal = document.querySelector('[data-profile-modal]');
                if (!modal) {
                    isRunning = false;
                    return;
                }

                const passwordInputs = modal.querySelectorAll('input[type="password"]');
                
                passwordInputs.forEach((input) => {
                    const htmlInput = input as HTMLInputElement;
                    
                    // Only fix if actually disabled/readonly
                    if (htmlInput.disabled || htmlInput.readOnly) {
                        htmlInput.removeAttribute('disabled');
                        htmlInput.removeAttribute('readonly');
                        htmlInput.disabled = false;
                        htmlInput.readOnly = false;
                    }
                    
                    // Set styles only if needed
                    if (htmlInput.style.pointerEvents !== 'auto') {
                        htmlInput.style.setProperty('pointer-events', 'auto', 'important');
                    }
                    if (htmlInput.style.userSelect !== 'text') {
                        htmlInput.style.setProperty('user-select', 'text', 'important');
                        (htmlInput.style as any).setProperty('webkit-user-select', 'text', 'important');
                    }
                    if (htmlInput.style.cursor !== 'text') {
                        htmlInput.style.setProperty('cursor', 'text', 'important');
                    }
                });
            } catch (error) {
                console.error('Error fixing autofill inputs:', error);
            } finally {
                isRunning = false;
            }
        };

        // Debounced version
        const debouncedFix = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(fixAutofillInputs, 100);
        };

        // Run once after tab switch
        const initialTimeout = setTimeout(fixAutofillInputs, 100);

        // Listen for focus events on password inputs only
        const handleFocusIn = (e: FocusEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'password') {
                debouncedFix();
            }
        };

        document.addEventListener('focusin', handleFocusIn);

        // MutationObserver with debouncing
        const observer = new MutationObserver(() => {
            debouncedFix();
        });

        // Observe modal container for new password inputs
        const modal = document.querySelector('[data-profile-modal]');
        if (modal) {
            observer.observe(modal, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['disabled', 'readonly']
            });
        }

        return () => {
            clearTimeout(initialTimeout);
            if (timeoutId) clearTimeout(timeoutId);
            document.removeEventListener('focusin', handleFocusIn);
            observer.disconnect();
        };
    }, [isOpen, activeTab]);

    // Get country options
    const countryOptions: CustomSelectOption[] = Country.getAllCountries().map((country) => ({
        id: country.isoCode,
        label: country.name,
    }));

    // Get state options based on selected country
    const getStateOptions = (countryCode: string): CustomSelectOption[] => {
        if (!countryCode) return [];
        return State.getStatesOfCountry(countryCode).map((state) => ({
            id: state.isoCode,
            label: state.name,
        }));
    };

    const profileInitialValues: ProfileFormValues = {
        firstName: profile?.firstName || profile?.first_name || '',
        lastName: profile?.lastName || profile?.last_name || '',
        email: profile?.email || '',
        gender: profile?.gender || '',
        country: profile?.country || '',
        state: profile?.state || '',
        businessName: profile?.businessName || '',
        industryName: profile?.industryName || '',
    };

    const passwordInitialValues: PasswordFormValues = {
        oldPassword: '',
        password: '',
        newPassword: '',
    };

    const handleProfileSubmit = async (values: ProfileFormValues) => {
        try {
            await updateProfile.mutateAsync({
                firstName: values.firstName,
                lastName: values.lastName,
                gender: values.gender,
                country: values.country,
                state: values.state,
                industryName: values.industryName,
                businessName: values.businessName,
            });
            toast.success('Profile updated successfully!', {
                duration: 2000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });
            await refetch();
            onClose();
        } catch (error: any) {
            console.error('Error updating profile:', error);
            let errorMessage = 'Failed to update profile. Please try again.';
            if (error?.message) {
                errorMessage = error.message;
            } else if (error?.errors) {
                errorMessage = Object.values(error.errors).flat().join(', ');
            }
            toast.error(errorMessage, {
                duration: 3000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
        }
    };

    const handlePasswordSubmit = async (values: PasswordFormValues) => {
        try {
            await changePassword.mutateAsync({
                oldPassword: values.oldPassword,
                password: values.password,
                newPassword: values.newPassword,
            });
            toast.success('Password changed successfully!', {
                duration: 2000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });
            // Reset form
            onClose();
        } catch (error: any) {
            console.error('Error changing password:', error);
            let errorMessage = 'Failed to change password. Please try again.';
            if (error?.message) {
                errorMessage = error.message;
            } else if (error?.errors) {
                errorMessage = Object.values(error.errors).flat().join(', ');
            }
            toast.error(errorMessage, {
                duration: 3000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
        }
    };

    // Get user initials for avatar
    const getInitials = () => {
        if (profile?.firstName && profile?.lastName) {
            return `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
        }
        if (profile?.first_name && profile?.last_name) {
            return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
        }
        if (profile?.email) {
            return profile.email[0].toUpperCase();
        }
        return 'U';
    };

    // Get full name
    const getFullName = () => {
        if (profile?.firstName && profile?.lastName) {
            return `${profile.firstName} ${profile.lastName}`;
        }
        if (profile?.first_name && profile?.last_name) {
            return `${profile.first_name} ${profile.last_name}`;
        }
        return profile?.email || 'User';
    };

    // Handle file selection
    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file', {
                duration: 3000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size must be less than 5MB', {
                duration: 3000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload file
        try {
            const uploadResponse = await uploadProfileImage.mutateAsync(file);
            const imageUrl = uploadResponse.imageUrl;
            
            // After successful upload, update profile with the new image URL and all other profile values
            if (imageUrl && profile) {
                await updateProfile.mutateAsync({
                    firstName: profile.firstName || profile.first_name || '',
                    lastName: profile.lastName || profile.last_name || '',
                    industryName: profile.industryName || '',
                    businessName: profile.businessName || '',
                    gender: profile.gender || '',
                    country: profile.country || '',
                    state: profile.state || '',
                    profileImageUrl: imageUrl,
                });
            } else if (imageUrl) {
                // If profile is not loaded yet, just update the image URL
                await updateProfile.mutateAsync({
                    profileImageUrl: imageUrl,
                });
            }
            
            toast.success('Profile picture updated successfully!', {
                duration: 2000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });
            await refetch();
            // Clear preview after successful upload
            setPreviewImage(null);
        } catch (error: any) {
            console.error('Error uploading profile image:', error);
            setPreviewImage(null);
            let errorMessage = 'Failed to upload profile picture. Please try again.';
            if (error?.message) {
                errorMessage = error.message;
            } else if (error?.errors) {
                errorMessage = Object.values(error.errors).flat().join(', ');
            }
            toast.error(errorMessage, {
                duration: 3000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle camera button click
    const handleCameraClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        fileInputRef.current?.click();
    };


    if (!profile || !mounted) return null;

    const modalContent = (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 pointer-events-none"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-white/5 backdrop-blur-2xl rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative pointer-events-auto border border-white/20 shadow-2xl" data-profile-modal>
                            {/* Glass effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-2xl"></div>
                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose();
                                }}
                                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-20"
                            >
                                <FiX className="w-5 h-5 text-white" />
                            </button>

                            {/* Content */}
                            <div className="p-6 sm:p-8 relative z-10">
                                {/* Profile Picture Section */}
                                <div className="flex flex-col items-center mb-6">
                                    <div className="relative">
                                        {previewImage || profile.profileImageUrl ? (
                                            <img
                                                src={previewImage || profile.profileImageUrl || ''}
                                                alt="Profile"
                                                className="w-24 h-24 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold text-2xl">
                                                {getInitials()}
                                            </div>
                                        )}
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileSelect}
                                            className="hidden"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleCameraClick}
                                            disabled={uploadProfileImage.isPending}
                                            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-white/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            aria-label="Upload profile picture"
                                        >
                                            {uploadProfileImage.isPending ? (
                                                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <FiCamera className="w-4 h-4 text-black" />
                                            )}
                                        </button>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mt-4">{getFullName()}</h2>
                                </div>

                                {/* Tabs */}
                                <div className="flex gap-4 mb-6 border-b border-white/10">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('profile')}
                                        className={`pb-3 px-4 font-medium transition-colors ${
                                            activeTab === 'profile'
                                                ? 'text-white border-b-2 border-white'
                                                : 'text-white/50 hover:text-white/70'
                                        }`}
                                    >
                                        Profile
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('password')}
                                        className={`pb-3 px-4 font-medium transition-colors ${
                                            activeTab === 'password'
                                                ? 'text-white border-b-2 border-white'
                                                : 'text-white/50 hover:text-white/70'
                                        }`}
                                    >
                                        Password
                                    </button>
                                </div>

                                {/* Profile Form */}
                                {activeTab === 'profile' && (
                                <Formik
                                    initialValues={profileInitialValues}
                                    validationSchema={profileValidationSchema}
                                    onSubmit={handleProfileSubmit}
                                    enableReinitialize
                                >
                                    {({ values, setFieldValue }) => {
                                        const selectedCountry = countryOptions.find(opt => opt.id === values.country);
                                        const stateOptions = getStateOptions(values.country);
                                        const selectedState = stateOptions.find(opt => opt.id === values.state);
                                        const selectedGender = genderOptions.find(opt => opt.id === values.gender);

                                        return (
                                            <Form className="space-y-4">
                                                {/* First Name and Last Name - Grid */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <CustomInput
                                                        name="firstName"
                                                        label="First name"
                                                        type="text"
                                                        variant="dark"
                                                    />
                                                    <CustomInput
                                                        name="lastName"
                                                        label="Last name"
                                                        type="text"
                                                        variant="dark"
                                                    />
                                                </div>

                                                {/* Email - Full Width, Disabled */}
                                                <CustomInput
                                                    name="email"
                                                    label="Email address"
                                                    type="email"
                                                    variant="dark"
                                                    disabled
                                                />

                                                    {/* Country and State - Grid */}
                                                    <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-white/70">
                                                            Country
                                                        </label>
                                                        <CustomSelect
                                                            options={countryOptions}
                                                            selected={selectedCountry || null}
                                                            onChange={(value) => {
                                                                setFieldValue('country', value.id);
                                                                setFieldValue('state', ''); // Reset state when country changes
                                                            }}
                                                            placeholder="Select country"
                                                            variant="dark"
                                                            searchable={true}
                                                        />
                                                        <ErrorMessage name="country">
                                                            {(msg) => <p className="text-xs text-red-400">{msg}</p>}
                                                        </ErrorMessage>
                                                    </div>
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
                                                </div>

                                                {/* Gender and Business Name - Grid */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-medium text-white/70">
                                                            Gender
                                                        </label>
                                                        <CustomSelect
                                                            options={genderOptions}
                                                            selected={selectedGender || null}
                                                            onChange={(value) => {
                                                                setFieldValue('gender', value.id);
                                                            }}
                                                            placeholder="Select gender"
                                                            variant="dark"
                                                        />
                                                        <ErrorMessage name="gender">
                                                            {(msg) => <p className="text-xs text-red-400">{msg}</p>}
                                                        </ErrorMessage>
                                                    </div>
                                                    <CustomInput
                                                        name="businessName"
                                                        label="Business name"
                                                        type="text"
                                                        variant="dark"
                                                    />
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-4 pt-4">
                                                    <button
                                                        type="button"
                                                        onClick={onClose}
                                                        className="flex-1 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/20"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={updateProfile.isPending}
                                                        className="flex-1 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {updateProfile.isPending ? 'Saving...' : 'Save changes'}
                                                    </button>
                                                </div>
                                            </Form>
                                        );
                                    }}
                                </Formik>
                                )}

                                {/* Password Form */}
                                {activeTab === 'password' && (
                                <Formik
                                    initialValues={passwordInitialValues}
                                    validationSchema={passwordValidationSchema}
                                    onSubmit={handlePasswordSubmit}
                                >
                                    {() => (
                                        <Form className="space-y-4">
                                            {/* Old Password */}
                                            <CustomInput
                                                name="oldPassword"
                                                label="Current password"
                                                type="password"
                                                variant="dark"
                                            />

                                            {/* New Password */}
                                            <CustomInput
                                                name="password"
                                                label="New password"
                                                type="password"
                                                variant="dark"
                                            />

                                            {/* Confirm New Password */}
                                            <CustomInput
                                                name="newPassword"
                                                label="Confirm new password"
                                                type="password"
                                                variant="dark"
                                            />

                                            {/* Action Buttons */}
                                            <div className="flex gap-4 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={onClose}
                                                    className="flex-1 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/20"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={changePassword.isPending}
                                                    className="flex-1 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {changePassword.isPending ? 'Changing...' : 'Change password'}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
};

export default ProfileModal;