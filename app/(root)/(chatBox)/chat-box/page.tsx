"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import { FiLoader } from 'react-icons/fi';
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
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white/70">Loading...</p>
                </div>
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
                <div className="flex-1 lg:ml-80 relative overflow-hidden flex items-center justify-center min-h-screen py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
                    {/* Background Decorative Elements */}
                    <DecorativeBackground rightText="A" leftText="Mr." />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-4xl relative z-10 mx-auto"
                    >
                        {/* Welcome Screen - Always show when on default page */}
                        <div className="bg-white/8 backdrop-blur-2xl p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
                            {/* Glass effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none rounded-2xl sm:rounded-3xl"></div>
                            {/* Glass effect content wrapper */}
                            <div className="relative z-10">
                                {/* Title */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="text-center mb-4"
                                >
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                                        Let's Talk Business{' '}
                                        <span className="inline-block">🚀</span>
                                    </h1>
                                </motion.div>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-center text-sm sm:text-base md:text-lg text-white/70 pb-8 sm:pb-12 md:pb-20"
                                >
                                    Get tailored business advice from Mr. A based on your challenge
                                </motion.p>

                                {/* Suggested Prompts */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8"
                                >
                                    {suggestedPrompts.map((prompt, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handlePromptClick(prompt)}
                                            className={`p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl cursor-pointer border text-xs sm:text-sm md:text-base text-left transition-all ${selectedPrompt === prompt
                                                ? 'bg-white/10 border-white/30 text-white'
                                                : 'bg-black/40 border-white/10 text-white/90 hover:bg-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </motion.div>

                                {/* Input Field */}
                                <motion.form
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    onSubmit={handleSubmit}
                                    className="relative px-0 sm:px-4 md:px-6 lg:px-12"
                                >
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder="Ask me any Business questions"
                                            className="w-full rounded-2xl border border-white/20 bg-white/8 backdrop-blur-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 px-4 py-3 sm:py-4 pr-12 text-sm sm:text-base"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!message.trim() || isLoading || startChat.isPending}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {(isLoading || startChat.isPending) ? (
                                                <FiLoader className="w-5 h-5 text-white animate-spin" />
                                            ) : (
                                                <FiSend className="w-5 h-5 text-white" />
                                            )}
                                        </button>
                                    </div>
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