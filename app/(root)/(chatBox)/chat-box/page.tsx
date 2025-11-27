"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import ChatSidebar from './components/ChatSidebar';

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

    const suggestedPrompts = [
        "What's the best growth strategy for startups?",
        "How do I manage brand positioning?",
        "Best way to enter a new market?",
    ];

    // Generate conversation title from first message
    const generateTitle = (firstMessage: string): string => {
        // Take first 50 characters or first sentence
        const title = firstMessage.length > 50 
            ? firstMessage.substring(0, 50) + '...'
            : firstMessage;
        return title;
    };

    const handlePromptClick = (prompt: string) => {
        setSelectedPrompt(prompt);
        setMessage(prompt);
    };

    // Mock AI responses - Replace with actual API call
    const getAIResponse = (userMessage: string): string => {
        const responses: { [key: string]: string } = {
            "What's the best growth strategy for startups?": "The best growth strategy for startups is to start small, focus on solving one clear problem, and build around customer feedback. Once you've validated demand, double down on one or two channels that bring the most traction, like referrals, partnerships, or social media. Keep your operations lean, measure results quickly, and be ready to adapt fast as the market shift.",
            "How do I manage brand positioning?": "Managing brand positioning starts with clarity—define what your brand stands for and who it serves. Research your competitors to identify gaps, then craft a unique value proposition that highlights your strengths. Keep your messaging consistent across all channels, from website to social media, and align visuals (logo, colors, tone) with your identity. Finally, track audience perception regularly and adjust positioning as your market evolve.",
            "Best way to enter a new market?": "The best way to enter a new market is to start small and strategic. Begin with deep market research to understand customer needs, cultural context, and competitors. Test your product or service with a pilot or soft launch, gathering real feedback. Build local partnerships or leverage influencers to create trust. Once you've validated demand, scale gradually with tailored marketing and localized offerings."
        };

        // Check for exact match or partial match
        for (const [key, value] of Object.entries(responses)) {
            if (userMessage.toLowerCase().includes(key.toLowerCase().split('?')[0]) || 
                key.toLowerCase().includes(userMessage.toLowerCase().split('?')[0])) {
                return value;
            }
        }

        // Default response
        return "I understand your question. Let me provide you with tailored business advice based on your challenge. Could you provide more specific details about what you're looking to achieve?";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            const userMessage = message.trim();
            setIsLoading(true);

            // Create new conversation
            const conversationId = Date.now().toString();
            const conversationTitle = generateTitle(userMessage);
            const now = new Date();

            // Add user message
            const newUserMessage: ChatMessage = {
                id: Date.now().toString(),
                role: 'user',
                content: userMessage,
                timestamp: now,
            };

            // Simulate API call delay
            setTimeout(() => {
                const aiResponse = getAIResponse(userMessage);
                const newAIMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: aiResponse,
                    timestamp: new Date(),
                };

                // Create conversation object
                const newConversation: Conversation = {
                    id: conversationId,
                    title: conversationTitle,
                    messages: [newUserMessage, newAIMessage],
                    createdAt: now,
                    updatedAt: new Date(),
                };

                // Save to localStorage
                const storedConversations = localStorage.getItem('chatConversations');
                const conversations: Conversation[] = storedConversations 
                    ? JSON.parse(storedConversations) 
                    : [];
                conversations.push(newConversation);
                localStorage.setItem('chatConversations', JSON.stringify(conversations));

                // Dispatch event to update sidebar
                window.dispatchEvent(new Event('conversationsUpdated'));

                // Navigate to conversation page
                router.push(`/chat-box/${conversationId}`);
            }, 1000);
        }
    };

  return (
        <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden flex">
            <ChatSidebar />

            {/* Main Content Area */}
            <div className="flex-1 relative overflow-hidden flex items-center justify-center min-h-0 py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Large "A" on the right */}
                <motion.div
                    className="absolute right-0 top-1/4 text-white/3 text-[400px] sm:text-[500px] md:text-[600px] font-bold leading-none select-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, -30, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        opacity: { duration: 1 },
                        scale: { duration: 1 },
                        y: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                        rotate: {
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                        },
                    }}
                >
                    A
                </motion.div>
                {/* Large "X" on the bottom left */}
                <motion.div
                    className="absolute left-0 bottom-0 text-white/3 text-[300px] sm:text-[400px] md:text-[500px] font-bold leading-none select-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, 20, 0],
                        rotate: [0, -3, 3, 0],
                    }}
                    transition={{
                        opacity: { duration: 1, delay: 0.3 },
                        scale: { duration: 1, delay: 0.3 },
                        y: {
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.3,
                        },
                        rotate: {
                            duration: 15,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.3,
                        },
                    }}
                >
                    X
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl relative z-10 mx-auto"
            >
                {/* Welcome Screen - Always show when on default page */}
                <div className="bg-white/8 backdrop-blur-2xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
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
                                className="text-center text-base sm:text-lg text-white/70 pb-20"
                            >
                                Get tailored business advice from Mr. A based on your challenge
                            </motion.p>

                            {/* Suggested Prompts */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8"
                            >
                                {suggestedPrompts.map((prompt, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePromptClick(prompt)}
                                        className={`p-6 rounded-2xl cursor-pointer border text-sm sm:text-base text-left transition-all ${selectedPrompt === prompt
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
                                className="relative lg:px-12 sm:px-6"
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
                                        disabled={!message.trim()}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FiSend className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </motion.form>
                        </div>
                    </div>
            </motion.div>
            </div>
        </div>
    );
};

export default ChatBox;