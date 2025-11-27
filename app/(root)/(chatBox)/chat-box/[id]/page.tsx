"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';
import { useParams, useRouter } from 'next/navigation';
import ChatSidebar from '../components/ChatSidebar';
import { ConversationPageSkeleton, MessageSkeleton } from '../components/SkeletonLoader';

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

const ConversationPage = () => {
    const params = useParams();
    const router = useRouter();
    const conversationId = params?.id as string;
    
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // Load conversation from localStorage
    useEffect(() => {
        setIsInitialLoading(true);
        if (conversationId) {
            // Simulate slight delay for better UX
            setTimeout(() => {
                const storedConversations = localStorage.getItem('chatConversations');
                if (storedConversations) {
                    const conversations: Conversation[] = JSON.parse(storedConversations);
                    const found = conversations.find(c => c.id === conversationId);
                    if (found) {
                        // Convert date strings back to Date objects
                        const conv: Conversation = {
                            ...found,
                            messages: found.messages.map(msg => ({
                                ...msg,
                                timestamp: new Date(msg.timestamp)
                            })),
                            createdAt: new Date(found.createdAt),
                            updatedAt: new Date(found.updatedAt)
                        };
                        setConversation(conv);
                    } else {
                        // Conversation not found, redirect to default
                        router.push('/chat-box');
                    }
                } else {
                    router.push('/chat-box');
                }
                setIsInitialLoading(false);
            }, 300);
        }
    }, [conversationId, router]);

    // Mock AI responses
    const getAIResponse = (userMessage: string): string => {
        const responses: { [key: string]: string } = {
            "What's the best growth strategy for startups?": "The best growth strategy for startups is to start small, focus on solving one clear problem, and build around customer feedback. Once you've validated demand, double down on one or two channels that bring the most traction, like referrals, partnerships, or social media. Keep your operations lean, measure results quickly, and be ready to adapt fast as the market shift.",
            "How do I manage brand positioning?": "Managing brand positioning starts with clarity—define what your brand stands for and who it serves. Research your competitors to identify gaps, then craft a unique value proposition that highlights your strengths. Keep your messaging consistent across all channels, from website to social media, and align visuals (logo, colors, tone) with your identity. Finally, track audience perception regularly and adjust positioning as your market evolve.",
            "Best way to enter a new market?": "The best way to enter a new market is to start small and strategic. Begin with deep market research to understand customer needs, cultural context, and competitors. Test your product or service with a pilot or soft launch, gathering real feedback. Build local partnerships or leverage influencers to create trust. Once you've validated demand, scale gradually with tailored marketing and localized offerings."
        };

        for (const [key, value] of Object.entries(responses)) {
            if (userMessage.toLowerCase().includes(key.toLowerCase().split('?')[0]) || 
                key.toLowerCase().includes(userMessage.toLowerCase().split('?')[0])) {
                return value;
            }
        }

        return "I understand your question. Let me provide you with tailored business advice based on your challenge. Could you provide more specific details about what you're looking to achieve?";
    };

    const saveConversation = (updatedConv: Conversation) => {
        const storedConversations = localStorage.getItem('chatConversations');
        let conversations: Conversation[] = storedConversations ? JSON.parse(storedConversations) : [];
        
        const index = conversations.findIndex(c => c.id === updatedConv.id);
        if (index >= 0) {
            conversations[index] = updatedConv;
        } else {
            conversations.push(updatedConv);
        }
        
        localStorage.setItem('chatConversations', JSON.stringify(conversations));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !isLoading && conversation) {
            const userMessage = message.trim();
            
            // Add user message
            const newUserMessage: ChatMessage = {
                id: Date.now().toString(),
                role: 'user',
                content: userMessage,
                timestamp: new Date(),
            };
            
            const updatedMessages = [...conversation.messages, newUserMessage];
            const updatedConversation: Conversation = {
                ...conversation,
                messages: updatedMessages,
                updatedAt: new Date(),
            };
            
            setConversation(updatedConversation);
            setMessage('');
            setIsLoading(true);

            // Simulate API call
            setTimeout(() => {
                const aiResponse = getAIResponse(userMessage);
                const newAIMessage: ChatMessage = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: aiResponse,
                    timestamp: new Date(),
                };
                
                const finalMessages = [...updatedMessages, newAIMessage];
                const finalConversation: Conversation = {
                    ...updatedConversation,
                    messages: finalMessages,
                    updatedAt: new Date(),
                };
                
                setConversation(finalConversation);
                saveConversation(finalConversation);
                // Dispatch event to update sidebar
                window.dispatchEvent(new Event('conversationsUpdated'));
                setIsLoading(false);
            }, 1000);
        }
    };

    if (isInitialLoading || !conversation) {
        return (
            <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden flex">
                <ChatSidebar currentConversationId={conversationId} />
                <div className="flex-1 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto mb-4 space-y-6 px-4 relative z-10 max-w-4xl mx-auto w-full">
                        <ConversationPageSkeleton />
                    </div>
                    <div className="relative z-10 max-w-4xl mx-auto w-full">
                        <div className="relative">
                            <div className="w-full rounded-2xl border border-white/20 bg-white/8 backdrop-blur-xl h-12 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden flex">
            <ChatSidebar currentConversationId={conversationId} />
            
            {/* Main Content Area */}
            <div className="flex-1 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden flex flex-col min-h-0">
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 pointer-events-none">
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

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-6 px-4 relative z-10 max-w-4xl mx-auto w-full">
                    {conversation.messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                                    msg.role === 'user'
                                        ? 'bg-white/10 text-white'
                                        : 'bg-transparent text-white'
                                }`}
                            >
                                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                                    {msg.content}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    {isLoading && (
                        <MessageSkeleton isUser={false} />
                    )}
                </div>

                {/* Input Field - Fixed at bottom */}
                <div className="relative z-10 max-w-4xl mx-auto w-full">
                    <form onSubmit={handleSubmit} className="relative">
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
                                disabled={!message.trim() || isLoading}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiSend className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;

