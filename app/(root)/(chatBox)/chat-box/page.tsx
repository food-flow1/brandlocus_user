"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiLoader, FiZap, FiTrendingUp, FiTarget, FiMessageCircle, FiStar, FiArrowRight } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import ChatSidebar from './components/ChatSidebar';
import { tokenStorage, useStartChat, useChats, useProfile } from '@/lib/api';
import { ROUTES } from '@/constants/routes';
import toast, { Toaster } from 'react-hot-toast';
import DecorativeBackground from '@/components/common/DecorativeBackground';
import { industryPrompts } from './data/industryPrompts';

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface Conversation {
    id: string;
    title: string;
    messages: ChatMessage[];
    createdAt: Date;
    updatedAt: Date;
}

// Prompt card icons mapping
const promptIcons = [FiZap, FiTrendingUp, FiTarget, FiMessageCircle, FiStar, FiArrowRight];

const ChatBox = () => {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const startChat = useStartChat();
    const { refetch: refetchChats } = useChats();
    const isSubmittingRef = useRef(false);

    // Toggle sidebar for mobile
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Check authentication on mount
    useEffect(() => {
        const checkAuth = () => {
            const isAuthenticated = tokenStorage.isAuthenticated();
            if (!isAuthenticated) {
                router.push(ROUTES.LOGIN);
            } else {
                setIsCheckingAuth(false);
            }
        };

        checkAuth();
    }, [router]);

    const { data: profile } = useProfile();
    const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);

    useEffect(() => {
        // Get prompts based on industry or default
        const industryKey = profile?.industryName?.toLowerCase() || 'default';
        // Check if we have prompts for this specific industry, otherwise try to find a partial match or use default
        let prompts = industryPrompts[industryKey];

        if (!prompts) {
            // Try to find a partial match (e.g. if industry is "Technology Services" and we have "tech")
            const key = Object.keys(industryPrompts).find(k => industryKey.includes(k));
            prompts = key ? industryPrompts[key] : industryPrompts['default'];
        }

        // Shuffle and pick 3
        const shuffled = [...prompts].sort(() => 0.5 - Math.random());
        setSuggestedPrompts(shuffled.slice(0, 3));
    }, [profile]);

    // Generate conversation title from content (summarize to shorter form)
    const generateTitle = (content: string): string => {
        // Remove extra whitespace and trim
        const trimmed = content.trim().replace(/\s+/g, ' ');

        // If content is short enough, use it as is
        if (trimmed.length <= 50) {
            return trimmed;
        }

        // Try to find a good breaking point (end of sentence, comma, etc.)
        const breakPoints = ['. ', '! ', '? ', ', ', ' '];
        let title = trimmed.substring(0, 50);

        // Find the last break point within 50 characters
        for (const breakPoint of breakPoints) {
            const lastIndex = title.lastIndexOf(breakPoint);
            if (lastIndex > 20) { // Ensure we have at least 20 characters
                title = trimmed.substring(0, lastIndex).trim();
                break;
            }
        }

        // If no good break point found, just truncate at 50 chars
        if (title.length > 50) {
            title = trimmed.substring(0, 47) + '...';
        }

        return title;
    };

    const handlePromptClick = (prompt: string) => {
        setSelectedPrompt(prompt);
        setMessage(prompt);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent double submission
        if (isSubmittingRef.current || !message.trim() || isLoading || startChat.isPending) {
            return;
        }

        const userMessage = message.trim();
        setIsLoading(true);
        isSubmittingRef.current = true;

        try {
            // Generate title from content
            const title = generateTitle(userMessage);

            // Call API to start chat
            const response = await startChat.mutateAsync({
                content: userMessage,
                title: title,
            });

            // Clear input
            setMessage('');
            setSelectedPrompt(null);

            // Refetch chats to ensure sidebar is updated
            await refetchChats();

            // Navigate to conversation page
            // The service now extracts sessionId from first message and sets it as id
            const sessionId = response?.id || response?.sessionId;

            if (sessionId) {
                router.push(`/chat-box/${sessionId}`);
            } else {
                console.error('No sessionId found in response:', response);
                toast.error('Failed to create conversation - no session ID received');
            }
        } catch (error: any) {
            console.error('Error starting chat:', error);

            // Show error toast
            let errorMessage = 'Failed to start conversation. Please try again.';
            if (error?.message) {
                errorMessage = error.message;
            } else if (error?.errors) {
                errorMessage = Object.values(error.errors).flat().join(', ');
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
            setIsLoading(false);
            isSubmittingRef.current = false;
        }
    };

    // Show loading state while checking authentication
    if (isCheckingAuth) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        {/* Outer ring */}
                        <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                        {/* Spinning ring */}
                        <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
                        {/* Inner glow */}
                        <div className="absolute inset-2 bg-white/5 rounded-full backdrop-blur-sm flex items-center justify-center">
                            <HiSparkles className="w-6 h-6 text-white/60 animate-pulse" />
                        </div>
                    </div>
                    <p className="text-white/60 text-sm font-medium">Preparing your workspace...</p>
                </motion.div>
            </div>
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
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
            <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden flex">
                <ChatSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

                {/* Main Content Area - Account for fixed sidebar on desktop only */}
                <div className="flex-1 lg:ml-80 relative overflow-hidden flex items-center justify-center min-h-screen pt-20 pb-8 sm:pb-12 md:pb-16 lg:pb-20 px-4 sm:px-6 md:px-8">
                    {/* Background Decorative Elements */}
                    <DecorativeBackground rightText="A" leftText="Mr." />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-4xl relative z-10 mx-auto"
                    >
                        {/* Welcome Screen - Enhanced Design */}
                        <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none rounded-2xl sm:rounded-3xl"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl pointer-events-none"></div>

                            {/* Glass effect content wrapper */}
                            <div className="relative z-10">
                                {/* Title with sparkle animation */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                    className="text-center mb-3 sm:mb-4"
                                >
                                    <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20">
                                        <HiSparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                                        <span className="text-xs sm:text-sm text-white/80 font-medium">AI-Powered Business Advisor</span>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                                        Let's Talk Business{' '}
                                        <motion.span
                                            className="inline-block"
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                        >
                                            🚀
                                        </motion.span>
                                    </h1>
                                </motion.div>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.15 }}
                                    className="text-center text-sm sm:text-base md:text-lg text-white/60 pb-6 sm:pb-8 md:pb-12 max-w-2xl mx-auto"
                                >
                                    Get tailored business advice from <span className="text-white font-medium">Mr. A</span> based on your unique challenges
                                </motion.p>

                                {/* Suggested Prompts - Enhanced Cards */}
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.25 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8"
                                >
                                    <AnimatePresence mode="wait">
                                        {suggestedPrompts.map((prompt, index) => {
                                            const Icon = promptIcons[index % promptIcons.length];
                                            return (
                                                <motion.button
                                                    key={prompt}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                                    whileHover={{ scale: 1.02, y: -2 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handlePromptClick(prompt)}
                                                    className={`group relative p-4 sm:p-5 rounded-xl sm:rounded-2xl cursor-pointer border text-left transition-all duration-300 overflow-hidden ${selectedPrompt === prompt
                                                        ? 'bg-white/15 border-white/40 text-white shadow-lg shadow-white/5'
                                                        : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/25 hover:text-white'
                                                        }`}
                                                >
                                                    {/* Gradient hover effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                                                    <div className="relative z-10 flex items-start gap-3">
                                                        <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                                                            selectedPrompt === prompt
                                                                ? 'bg-white/20'
                                                                : 'bg-white/10 group-hover:bg-white/15'
                                                        }`}>
                                                            <Icon className="w-4 h-4" />
                                                        </div>
                                                        <span className="text-xs sm:text-sm leading-relaxed">{prompt}</span>
                                                    </div>

                                                    {/* Selected indicator */}
                                                    {selectedPrompt === prompt && (
                                                        <motion.div
                                                            layoutId="selected-prompt"
                                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white/50 via-white to-white/50"
                                                        />
                                                    )}
                                                </motion.button>
                                            );
                                        })}
                                    </AnimatePresence>
                                </motion.div>

                                {/* Enhanced Input Field */}
                                <motion.form
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.35 }}
                                    onSubmit={handleSubmit}
                                    className="relative px-0 sm:px-4 md:px-8 lg:px-16"
                                >
                                    <div className="relative group">
                                        {/* Glowing border effect */}
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        <div className="relative flex items-center">
                                            <input
                                                type="text"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Ask me any business question..."
                                                className="w-full rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 px-5 py-3.5 sm:py-4 pr-14 text-sm sm:text-base transition-all duration-300"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!message.trim() || isLoading || startChat.isPending}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/10 group/btn"
                                            >
                                                {(isLoading || startChat.isPending) ? (
                                                    <FiLoader className="w-5 h-5 text-white animate-spin" />
                                                ) : (
                                                    <FiSend className="w-5 h-5 text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Helper text */}
                                    <p className="text-center text-xs text-white/40 mt-3">
                                        Press Enter to send • Mr. A provides personalized business guidance
                                    </p>
                                </motion.form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default ChatBox;