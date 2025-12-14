"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiLoader, FiCopy, FiCheck, FiX, FiSave, FiChevronDown, FiRefreshCw } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import ChatSidebar from '../components/ChatSidebar';
import { ConversationPageSkeleton } from '../components/SkeletonLoader';
import { tokenStorage, useChatById, useSendMessage, useEditMessage } from '@/lib/api';
import { ROUTES } from '@/constants/routes';
import toast, { Toaster } from 'react-hot-toast';
import DecorativeBackground from '@/components/common/DecorativeBackground';
import ChatInput from '../components/ChatInput';
import ConsultationModal from '@/components/modals/ConsultationModal';
import BookingCalendarModal from '@/components/modals/BookingCalendarModal';


// Helper function to format timestamp
const formatTimestamp = (timestamp: Date | string | undefined): string => {
    if (!timestamp) return '';

    try {
        const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;

        // Check if date is valid
        if (isNaN(date.getTime())) return '';

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

        // Format time (HH:MM)
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const timeString = `${hours}:${minutes}`;

        // Check if message is from today
        if (messageDate.getTime() === today.getTime()) {
            return `Today, ${timeString}`;
        }

        // Check if message is from yesterday
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        if (messageDate.getTime() === yesterday.getTime()) {
            return `Yesterday, ${timeString}`;
        }

        // For older messages, show date and time
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}, ${timeString}`;
    } catch (error) {
        console.error('Error formatting timestamp:', error);
        return '';
    }
};

const ConversationPage = () => {
    const params = useParams();
    const router = useRouter();
    const conversationId = params?.id as string;


    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isSubmittingRef = useRef(false);
    const [streamingMessage, setStreamingMessage] = useState<string>('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [pendingUserMessage, setPendingUserMessage] = useState<string | null>(null);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const streamingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [copiedMessageId, setCopiedMessageId] = useState<string | number | null>(null);
    const [editingMessageId, setEditingMessageId] = useState<string | number | null>(null);
    const [editedContent, setEditedContent] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(0);
    const [allMessages, setAllMessages] = useState<any[]>([]);
    const [pagination, setPagination] = useState<{ page: number; size: number; totalElements: number; totalPages: number; last: boolean } | null>(null);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const scrollPositionRef = useRef<number>(0);

    // Modal states
    const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    // Initial check for consultation modal - show after a delay or condition
    // For now, we'll show it after a short delay for demonstration


    const handleOpenBooking = () => {
        setIsConsultationModalOpen(false);
        setIsBookingModalOpen(true);
    };

    // Track the message count and IDs before sending to detect truly new messages
    const messageCountBeforeSendRef = useRef<number>(0);
    const messageIdsBeforeSendRef = useRef<Set<string | number>>(new Set());
    const lastStreamedMessageIdRef = useRef<string | number | null>(null);
    const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const detectionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Toggle sidebar for mobile
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    // Scroll to bottom handler
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    // Fetch messages from API
    const { data: apiData, isLoading: isInitialLoading, error: conversationError, refetch: refetchMessages } = useChatById(conversationId, currentPage, 10);
    const sendMessage = useSendMessage(); // For sending messages to existing conversations
    const editMessage = useEditMessage();

    // Track scroll position to show/hide scroll to bottom button
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const isNearBottom = scrollHeight - scrollTop - clientHeight < 200;
            setShowScrollToBottom(!isNearBottom);
        };

        container.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        
        return () => container.removeEventListener('scroll', handleScroll);
    }, [isCheckingAuth, isInitialLoading]);

    // Update allMessages when new data arrives
    useEffect(() => {
        if (apiData) {
            if (currentPage === 0) {
                // First page - replace all messages
                setAllMessages(apiData.messages || []);
            } else {
                // Subsequent pages - prepend older messages (avoid duplicates)
                setAllMessages(prev => {
                    const existingIds = new Set(prev.map(m => m.messageId || m.id));
                    const newMessages = (apiData.messages || []).filter(m => !existingIds.has(m.messageId || m.id));
                    return [...newMessages, ...prev];
                });

                // Restore scroll position after loading older messages
                // Wait for DOM to update
                setTimeout(() => {
                    if (messagesContainerRef.current && scrollPositionRef.current > 0) {
                        const newScrollHeight = messagesContainerRef.current.scrollHeight;
                        const scrollDiff = newScrollHeight - scrollPositionRef.current;
                        messagesContainerRef.current.scrollTop = scrollDiff;
                        scrollPositionRef.current = 0; // Reset
                    }
                }, 100);
            }
            setPagination(apiData.pagination);
            setIsLoadingMore(false);
        }
    }, [apiData, currentPage]);

    // Map API messages to local ChatMessage format for display
    // Exclude the message that's currently being streamed to prevent duplicates
    const messages = React.useMemo(() => {
        if (!allMessages || !Array.isArray(allMessages)) return [];
        return allMessages
            .map(msg => ({
                id: msg.messageId || msg.id || String(msg.sessionId || ''),
                messageId: msg.messageId,
                role: msg.userType === 'USER' ? 'user' : 'assistant',
                content: msg.content,
                timestamp: msg.createdAt ? new Date(msg.createdAt) : new Date(),
                userType: msg.userType, // Keep original for filtering
            }))
            .filter(msg => {
                // Hide the AI message that's currently being streamed
                if (isStreaming && msg.role === 'assistant' && msg.id === lastStreamedMessageIdRef.current) {
                    return false;
                }
                return true;
            });
    }, [allMessages, isStreaming]);

    // Get conversation title from first message or use sessionId
    const conversationTitle = messages.length > 0
        ? messages[messages.length - 1]?.content?.substring(0, 50) || `Chat ${conversationId}`
        : `Chat ${conversationId}`;

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

    // Redirect if conversation not found
    useEffect(() => {
        if (!isInitialLoading && conversationError && messages.length === 0) {
            toast.error('Conversation not found');
            router.push('/chat-box');
        }
    }, [conversationError, messages, isInitialLoading, router]);

    // Render text instantly - no animation
    const streamText = React.useCallback((text: string, onComplete: () => void) => {
        // Clear any existing timeout
        if (streamingTimeoutRef.current) {
            clearTimeout(streamingTimeoutRef.current);
        }

        // Show the entire message instantly
        setStreamingMessage(text);
        setIsStreaming(false);
        onComplete();
    }, []);

    // Clear pending user message if it appears in the messages array (from API)
    useEffect(() => {
        if (!pendingUserMessage || !messages || messages.length === 0) return;

        // Check if the user's message is now in the messages array
        const userMessageExists = messages.some(msg =>
            msg.role === 'user' &&
            msg.content.trim() === pendingUserMessage.trim()
        );

        // If the user's message is now in the array, clear the pending message
        if (userMessageExists) {
            setPendingUserMessage(null);
        }
    }, [messages, pendingUserMessage]);

    // Detect new AI messages and stream them (only after API response)
    useEffect(() => {
        // Don't stream if:
        // - No messages
        // - Already streaming
        // - No pending user message (user hasn't sent anything)
        if (!messages || messages.length === 0 || isStreaming || !pendingUserMessage) {
            return;
        }

        // Only proceed if we have more messages than before sending
        if (messages.length <= messageCountBeforeSendRef.current) {
            console.log('⏸️ No new messages yet. Current:', messages.length, 'Before:', messageCountBeforeSendRef.current);
            return;
        }

        // Find the latest AI message that is truly NEW (not in the set of messages before sending)
        const latestAIMessage = [...messages]
            .reverse()
            .find(msg =>
                msg.role === 'assistant' &&
                msg.userType === 'AI' &&
                msg.id &&
                !messageIdsBeforeSendRef.current.has(msg.id) &&
                msg.id !== lastStreamedMessageIdRef.current
            );

        // Only stream if we found a truly new AI message
        if (latestAIMessage && latestAIMessage.id) {
            console.log('🤖 New AI message detected:', latestAIMessage.id);

            // Clear safety timeout since we got the AI response
            if (safetyTimeoutRef.current) {
                clearTimeout(safetyTimeoutRef.current);
                safetyTimeoutRef.current = null;
                console.log('✅ Cleared safety timeout');
            }

            // Clear detection timeout since we detected the new message
            if (detectionTimeoutRef.current) {
                clearTimeout(detectionTimeoutRef.current);
                detectionTimeoutRef.current = null;
                console.log('✅ Cleared detection timeout');
            }

            // Mark this message as streamed
            lastStreamedMessageIdRef.current = latestAIMessage.id;

            // Add to the set of known messages
            messageIdsBeforeSendRef.current.add(latestAIMessage.id);

            // Clear pending user message and stop loading immediately
            setPendingUserMessage(null);
            setIsLoading(false);
            isSubmittingRef.current = false;
            console.log('✅ Reset submit state (AI message detected)');

            // Stream the AI response
            streamText(latestAIMessage.content, () => {
                // After streaming completes, clear streaming state
                // The actual message from API will now show in the messages array
                setTimeout(() => {
                    setIsStreaming(false);
                    setStreamingMessage('');
                    setIsLoading(false);
                    // Ensure button is not disabled after streaming
                    isSubmittingRef.current = false;
                    console.log('✅ Reset submit state (streaming complete)');
                }, 100); // Small delay to ensure smooth transition
            });
        } else {
            console.log('⏸️ No new AI message found');
        }
    }, [messages, isStreaming, pendingUserMessage, streamText]);

    // Scroll to bottom when messages change (only for new messages, not when loading more)
    useEffect(() => {
        // Only auto-scroll if we're not loading more messages and there's a new message at the bottom
        if (!isLoadingMore && currentPage === 0) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, streamingMessage, isStreaming, pendingUserMessage, isLoadingMore, currentPage]);

    // Handle scroll to load more messages
    useEffect(() => {
        const container = messagesContainerRef.current;
        if (!container || !pagination || pagination.last || isLoadingMore) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;
            
            // Load more when scrolled to top (within 100px)
            if (scrollTop < 100 && currentPage < pagination.totalPages - 1) {
                setIsLoadingMore(true);
                scrollPositionRef.current = container.scrollHeight - container.scrollTop;
                setCurrentPage(prev => prev + 1);
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [pagination, currentPage, isLoadingMore]);

    // Restore scroll position after loading more messages
    useEffect(() => {
        if (isLoadingMore && messagesContainerRef.current && scrollPositionRef.current > 0) {
            const container = messagesContainerRef.current;
            const newScrollHeight = container.scrollHeight;
            container.scrollTop = newScrollHeight - scrollPositionRef.current;
            scrollPositionRef.current = 0;
        }
    }, [allMessages, isLoadingMore]);


    // Cleanup streaming on unmount
    useEffect(() => {
        return () => {
            if (streamingTimeoutRef.current) {
                clearTimeout(streamingTimeoutRef.current);
            }
        };
    }, []);

    // Handle edit message
    const handleEditMessage = (messageId: string | number, currentContent: string) => {
        setEditingMessageId(messageId);
        setEditedContent(currentContent);
    };

    // Handle save edited message
    const handleSaveEdit = async () => {
        if (!editingMessageId || !editedContent.trim()) return;

        try {
            await editMessage.mutateAsync({
                messageId: editingMessageId,
                content: editedContent.trim(),
            });

            toast.success('Message updated successfully!', {
                duration: 2000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });

            // Refetch messages to get updated content
            refetchMessages();

            // Clear edit state
            setEditingMessageId(null);
            setEditedContent('');
        } catch (error: any) {
            console.error('Error editing message:', error);
            toast.error('Failed to update message. Please try again.', {
                duration: 3000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
        }
    };

    // Handle cancel edit
    const handleCancelEdit = () => {
        setEditingMessageId(null);
        setEditedContent('');
    };

    // Copy message to clipboard
    const handleCopyMessage = async (content: string, messageId: string | number) => {
        try {
            await navigator.clipboard.writeText(content);
            setCopiedMessageId(messageId);
            toast.success('Message copied to clipboard!', {
                duration: 2000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });
            // Reset copied state after 2 seconds
            setTimeout(() => {
                setCopiedMessageId(null);
            }, 2000);
        } catch (error) {
            console.error('Failed to copy message:', error);
            toast.error('Failed to copy message', {
                duration: 2000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
        }
    };

    const handleSubmit = async (messageContent: string) => {
        // Prevent double submission
        if (isSubmittingRef.current || !messageContent.trim() || isLoading || sendMessage.isPending || !conversationId) {
            console.log('🚫 Submit blocked:', {
                isSubmitting: isSubmittingRef.current,
                hasMessage: !!messageContent.trim(),
                isLoading,
                isPending: sendMessage.isPending,
                hasConversationId: !!conversationId
            });
            return;
        }

        const userMessage = messageContent.trim();
        console.log('📤 Sending message to conversation:', conversationId);
        setIsLoading(true);
        isSubmittingRef.current = true;

        // Track message count and IDs BEFORE sending (to detect truly new messages)
        messageCountBeforeSendRef.current = messages.length;
        messageIdsBeforeSendRef.current = new Set(messages.map(msg => msg.id).filter(Boolean));

        // Show user message immediately
        setPendingUserMessage(userMessage);

        // Safety timeout: Reset submitting state after 30 seconds if something goes wrong
        safetyTimeoutRef.current = setTimeout(() => {
            console.warn('⚠️ Safety timeout triggered - resetting submit state');
            setIsLoading(false);
            isSubmittingRef.current = false;
            setPendingUserMessage(null);
            safetyTimeoutRef.current = null;

            toast.error('Request timed out. Please try sending your message again.', {
                duration: 5000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
        }, 30000);

        try {
            // Send message to existing conversation using the dedicated endpoint
            const response = await sendMessage.mutateAsync({
                content: userMessage,
                title: conversationTitle, // Use generated title
                sessionId: Number(conversationId), // Include session ID to continue conversation
            });

            console.log('✅ Message sent successfully:', response);

            // Check if milestone was reached and trigger modal
            if (response.milestone) {
                console.log('🚀 Milestone reached! Opening consultation modal');
                setIsConsultationModalOpen(true);
            }

            // Clear the safety timeout since request succeeded
            if (safetyTimeoutRef.current) {
                clearTimeout(safetyTimeoutRef.current);
                safetyTimeoutRef.current = null;
            }

            // Reset to first page and refetch to get latest messages
            setCurrentPage(0);
            // The query will automatically refetch due to invalidation in useSendMessage
            // The useEffect above will detect the new message ONLY when it actually arrives
            // and the message count increases

            // Safety: Reset after 10 seconds if the effect doesn't trigger
            detectionTimeoutRef.current = setTimeout(() => {
                if (isSubmittingRef.current) {
                    console.warn('⚠️ Effect did not trigger - manually resetting submit state');
                    setIsLoading(false);
                    isSubmittingRef.current = false;
                    detectionTimeoutRef.current = null;
                }
            }, 10000);

        } catch (error: any) {
            console.error('❌ Error sending message:', error);

            // Clear the safety timeout
            if (safetyTimeoutRef.current) {
                clearTimeout(safetyTimeoutRef.current);
                safetyTimeoutRef.current = null;
            }

            // Clear pending message on error
            setPendingUserMessage(null);
            
            // Clear detection timeout on error
            if (detectionTimeoutRef.current) {
                clearTimeout(detectionTimeoutRef.current);
                detectionTimeoutRef.current = null;
            }

            // Show error toast
            let errorMessage = 'Failed to send message. Please try again.';
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
                        <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
                        <div className="absolute inset-2 bg-white/5 rounded-full backdrop-blur-sm flex items-center justify-center">
                            <HiSparkles className="w-6 h-6 text-white/60 animate-pulse" />
                        </div>
                    </div>
                    <p className="text-white/60 text-sm font-medium">Loading conversation...</p>
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
            {isCheckingAuth ? (
                <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white/70">Loading...</p>
                    </div>
                </div>
            ) : isInitialLoading ? (
                <div className="min-h-screen bg-[#0A0A0A] text-white relative overflow-hidden flex">
                    <ChatSidebar currentConversationId={conversationId} isOpen={isSidebarOpen} onToggle={toggleSidebar} />
                    <div className="flex-1 lg:ml-80 py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative overflow-hidden flex flex-col min-h-0">
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
            ) : (
                <div className="h-screen bg-[#0A0A0A] text-white relative overflow-hidden flex">
                    <ChatSidebar currentConversationId={conversationId} isOpen={isSidebarOpen} onToggle={toggleSidebar} />

                    {/* Main Content Area - Account for fixed sidebar on desktop only */}
                    <div className="flex-1 flex flex-col min-h-0 relative lg:ml-80 pt-6">
                        {/* Background Decorative Elements - Fixed, not scrollable */}
                        <DecorativeBackground
                            rightText="A"
                            leftText="Mr."
                            rightPosition="top-[10%]"
                            leftPosition="bottom-[5%]"
                            containerClassName="fixed z-0 lg:ml-80"
                        />

                        {/* Messages Container - Scrollable */}
                        <div
                            ref={messagesContainerRef}
                            className="flex-1 overflow-y-auto pt-28 pb-12 sm:pt-28 sm:pb-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 relative z-10"
                        >

                            {/* Chat Messages */}
                            <div className="space-y-4 sm:space-y-6 relative z-10 max-w-6xl mx-auto w-full">
                                {/* Load More Button at top */}
                                {!isLoadingMore && pagination && !pagination.last && messages.length > 0 && (
                                    <div className="flex justify-center py-4">
                                        <motion.button
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            onClick={() => {
                                                if (!isLoadingMore && pagination && !pagination.last) {
                                                    setIsLoadingMore(true);
                                                    // Save current scroll position
                                                    if (messagesContainerRef.current) {
                                                        scrollPositionRef.current = messagesContainerRef.current.scrollHeight;
                                                    }
                                                    setCurrentPage(prev => prev + 1);
                                                }
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-sm font-medium transition-all duration-200"
                                        >
                                            <FiRefreshCw className="w-4 h-4" />
                                            Load Older Messages
                                        </motion.button>
                                    </div>
                                )}

                                {/* Loading more indicator at top */}
                                {isLoadingMore && (
                                    <div className="flex justify-center py-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                            </div>
                                            <span className="text-white/50 text-sm">Loading more messages...</span>
                                        </div>
                                    </div>
                                )}

                                {messages && messages.length > 0 ? (
                                    // Sort messages by timestamp (oldest first) since API returns newest first
                                    [...messages].reverse().map((msg, index) => (
                                        <motion.div
                                            key={msg.id || msg.messageId}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: index < 5 ? index * 0.05 : 0 }}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} group relative max-w-[95%] sm:max-w-[85%] md:max-w-[80%]`}>
                                                <div
                                                    className={`w-full rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 transition-all duration-300 ${msg.role === 'user'
                                                        ? 'bg-gradient-to-br from-white/15 to-white/10 text-white backdrop-blur-sm border border-white/10 hover:border-white/20'
                                                        : 'bg-gradient-to-br from-white/8 to-white/3 text-white backdrop-blur-sm border border-white/10 hover:border-white/15'
                                                        }`}
                                                >
                                                    {msg.role === 'assistant' ? (
                                                        <div className="text-sm sm:text-base leading-relaxed">
                                                            <ReactMarkdown
                                                                components={{
                                                                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-3 mt-4 text-white first:mt-0" {...props} />,
                                                                    h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2 mt-3 text-white first:mt-0" {...props} />,
                                                                    h3: ({ node, ...props }) => <h3 className="text-base font-bold mb-2 mt-3 text-white first:mt-0" {...props} />,
                                                                    h4: ({ node, ...props }) => <h4 className="text-sm font-bold mb-1 mt-2 text-white first:mt-0" {...props} />,
                                                                    p: ({ node, ...props }) => <p className="mb-2 text-white/90 last:mb-0" {...props} />,
                                                                    ul: ({ node, ...props }) => <ul className="list-disc list-outside mb-2 ml-4 space-y-1.5 text-white/90" {...props} />,
                                                                    ol: ({ node, ...props }) => <ol className="list-decimal list-outside mb-2 ml-4 space-y-1.5 text-white/90" {...props} />,
                                                                    li: ({ node, ...props }) => <li className="text-white/90 pl-1" {...props} />,
                                                                    strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />,
                                                                    em: ({ node, ...props }) => <em className="italic text-white/90" {...props} />,
                                                                    code: ({ node, className, children, ...props }) => {
                                                                        const isInline = !className;
                                                                        if (isInline) {
                                                                            return <code className="bg-white/15 px-1.5 py-0.5 rounded text-xs text-white font-mono border border-white/10" {...props}>{children}</code>;
                                                                        }
                                                                        return <code className="text-white/90 font-mono text-xs" {...props}>{children}</code>;
                                                                    },
                                                                    pre: ({ node, children, ...props }) => {
                                                                        const codeContent = React.Children.toArray(children).find(
                                                                            (child: any) => child?.type === 'code' || child?.props?.node?.tagName === 'code'
                                                                        ) as React.ReactElement<{ children?: React.ReactNode }> | undefined;
                                                                        const codeText = codeContent?.props?.children
                                                                            ? String(codeContent.props.children)
                                                                            : '';

                                                                        return (
                                                                            <div className="relative group/code mb-3">
                                                                                <pre className="bg-black/40 border border-white/10 p-4 rounded-xl overflow-x-auto text-white/90" {...props}>
                                                                                    {children}
                                                                                </pre>
                                                                                <button
                                                                                    onClick={() => {
                                                                                        navigator.clipboard.writeText(codeText);
                                                                                        toast.success('Code copied!');
                                                                                    }}
                                                                                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 opacity-0 group-hover/code:opacity-100 transition-all duration-200"
                                                                                    title="Copy code"
                                                                                >
                                                                                    <FiCopy className="w-3.5 h-3.5 text-white/70" />
                                                                                </button>
                                                                            </div>
                                                                        );
                                                                    },
                                                                }}
                                                            >
                                                                {msg.content}
                                                            </ReactMarkdown>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {editingMessageId === (msg.id || msg.messageId) ? (
                                                                // Edit mode
                                                                <div className="space-y-2">
                                                                    <textarea
                                                                        value={editedContent}
                                                                        onChange={(e) => setEditedContent(e.target.value)}
                                                                        className="w-full rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/30 px-3 py-2 text-sm sm:text-base resize-none"
                                                                        rows={3}
                                                                        autoFocus
                                                                    />
                                                                    <div className="flex items-center gap-2">
                                                                        <button
                                                                            onClick={handleSaveEdit}
                                                                            disabled={editMessage.isPending || !editedContent.trim()}
                                                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                                                        >
                                                                            {editMessage.isPending ? (
                                                                                <FiLoader className="w-3.5 h-3.5 animate-spin" />
                                                                            ) : (
                                                                                <FiSave className="w-3.5 h-3.5" />
                                                                            )}
                                                                            Save
                                                                        </button>
                                                                        <button
                                                                            onClick={handleCancelEdit}
                                                                            disabled={editMessage.isPending}
                                                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                                                        >
                                                                            <FiX className="w-3.5 h-3.5" />
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                                                                    {msg.content}
                                                                </p>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                {/* Action Buttons and Timestamp */}
                                                <div className={`flex items-center gap-2 mt-1 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                     {/* Timestamp */}
                                                     {msg.timestamp && (
                                                        <span className="text-xs text-white/40 px-1">
                                                            {formatTimestamp(msg.timestamp)}
                                                        </span>
                                                    )}
                                                    
                                                    {/* Action Buttons */}
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {/* {msg.role === 'user' && editingMessageId !== (msg.id || msg.messageId) && (
                                                            <button
                                                                onClick={() => handleEditMessage((msg.id || msg.messageId || 'unknown'), msg.content)}
                                                                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                                                                aria-label="Edit message"
                                                            >
                                                                <FiEdit2 className="w-3.5 h-3.5 text-white/70" />
                                                            </button>
                                                        )} */}
                                                        <button
                                                            onClick={() => handleCopyMessage(msg.content, (msg.id || msg.messageId || 'unknown'))}
                                                            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
                                                            aria-label="Copy message"
                                                        >
                                                            {copiedMessageId === (msg.id || msg.messageId) ? (
                                                                <FiCheck className="w-3.5 h-3.5 text-green-400" />
                                                            ) : (
                                                                <FiCopy className="w-3.5 h-3.5 text-white/70" />
                                                            )}
                                                        </button>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="text-center text-white/50 py-8">
                                        <p>No messages yet. Start the conversation!</p>
                                    </div>
                                )}

                                {/* Show pending user message immediately */}
                                {pendingUserMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex justify-end"
                                    >
                                        <div className="flex flex-col items-end group relative max-w-[95%] sm:max-w-[85%] md:max-w-[80%]">
                                            <div className="w-full rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 bg-white/10 text-white backdrop-blur-sm">
                                                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                                                    {pendingUserMessage}
                                                </p>
                                            </div>
                                            {/* Action Buttons and Timestamp */}
                                            <div className="flex items-center gap-2 mt-1 flex-row-reverse">
                                                {/* Copy Button */}
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleCopyMessage(pendingUserMessage, 'pending')}
                                                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                                        aria-label="Copy message"
                                                    >
                                                        {copiedMessageId === 'pending' ? (
                                                            <FiCheck className="w-3.5 h-3.5 text-green-400" />
                                                        ) : (
                                                            <FiCopy className="w-3.5 h-3.5 text-white/70" />
                                                        )}
                                                    </button>
                                                </div>
                                                {/* Timestamp */}
                                                <span className="text-xs text-white/40 px-1">
                                                    {formatTimestamp(new Date())}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Show streaming AI response */}
                                {isStreaming && streamingMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex justify-start"
                                    >
                                        <div className="flex flex-col group relative max-w-[95%] sm:max-w-[85%] md:max-w-[80%]">
                                            <div className="w-full rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 bg-white/5 text-white backdrop-blur-sm border border-white/10">
                                            <div className="text-sm sm:text-base leading-relaxed">
                                                <ReactMarkdown
                                                    components={{
                                                        h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-3 mt-4 text-white first:mt-0" {...props} />,
                                                        h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2 mt-3 text-white first:mt-0" {...props} />,
                                                        h3: ({ node, ...props }) => <h3 className="text-base font-bold mb-2 mt-3 text-white first:mt-0" {...props} />,
                                                        h4: ({ node, ...props }) => <h4 className="text-sm font-bold mb-1 mt-2 text-white first:mt-0" {...props} />,
                                                        p: ({ node, ...props }) => <p className="mb-2 text-white/90 last:mb-0" {...props} />,
                                                        ul: ({ node, ...props }) => <ul className="list-disc list-outside mb-2 ml-4 space-y-1.5 text-white/90" {...props} />,
                                                        ol: ({ node, ...props }) => <ol className="list-decimal list-outside mb-2 ml-4 space-y-1.5 text-white/90" {...props} />,
                                                        li: ({ node, ...props }) => <li className="text-white/90 pl-1" {...props} />,
                                                        strong: ({ node, ...props }) => <strong className="font-semibold text-white" {...props} />,
                                                        em: ({ node, ...props }) => <em className="italic text-white/90" {...props} />,
                                                        code: ({ node, ...props }) => <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs text-white/90 font-mono" {...props} />,
                                                        pre: ({ node, ...props }) => <pre className="bg-white/10 p-3 rounded-lg overflow-x-auto mb-2 text-white/90" {...props} />,
                                                    }}
                                                >
                                                    {streamingMessage}
                                                </ReactMarkdown>
                                                <span className="inline-block w-2 h-4 bg-white/60 ml-1 animate-pulse">|</span>
                                            </div>
                                        </div>
                                            {/* Action Buttons and Timestamp */}
                                            <div className="flex items-center gap-2 mt-1">
                                                {/* Copy Button */}
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleCopyMessage(streamingMessage, 'streaming')}
                                                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                                        aria-label="Copy message"
                                                    >
                                                        {copiedMessageId === 'streaming' ? (
                                                            <FiCheck className="w-3.5 h-3.5 text-green-400" />
                                                        ) : (
                                                            <FiCopy className="w-3.5 h-3.5 text-white/70" />
                                                        )}
                                                    </button>
                                                </div>
                                                {/* Timestamp */}
                                                <span className="text-xs text-white/40 px-1">
                                                    {formatTimestamp(new Date())}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Loading indicator for AI response (only when waiting for API, not streaming, and no streaming message) */}
                                <AnimatePresence>
                                    {(isLoading || sendMessage.isPending) && !isStreaming && !streamingMessage && pendingUserMessage && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex justify-start"
                                        >
                                            <div className="max-w-[95%] sm:max-w-[85%] md:max-w-[80%] rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-sm border border-white/10">
                                                <div className="flex items-center space-x-3">
                                                    <div className="relative">
                                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                                            <HiSparkles className="w-4 h-4 text-white/70 animate-pulse" />
                                                        </div>
                                                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white/40 animate-spin"></div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-white/80 text-sm font-medium">Mr. A is thinking...</span>
                                                        <div className="flex space-x-1 mt-1">
                                                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Scroll anchor */}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Scroll to Bottom Button */}
                        <AnimatePresence>
                            {showScrollToBottom && (
                                <motion.button
                                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 20, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={scrollToBottom}
                                    className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/20 hover:bg-[#1a1a1a] hover:border-white/40 transition-all duration-300 shadow-lg group hover:scale-105"
                                    aria-label="Scroll to bottom"
                                >
                                    <span className="text-sm font-medium text-white/90">Scroll to bottom</span>
                                    <FiChevronDown className="w-4 h-4 text-white group-hover:translate-y-0.5 transition-transform" />
                                </motion.button>
                            )}
                        </AnimatePresence>

                            {/* Chat Input Component */}
                            <ChatInput
                                onSubmit={handleSubmit}
                                isLoading={isLoading || sendMessage.isPending}
                                isPending={(isLoading || sendMessage.isPending) && !!pendingUserMessage}
                                disabled={isLoading || sendMessage.isPending}
                            />
                    </div>
                </div>
            )}
            {/* Modals */}
            <ConsultationModal 
                isOpen={isConsultationModalOpen} 
                onClose={() => setIsConsultationModalOpen(false)}
                onBook={handleOpenBooking}
            />
            <BookingCalendarModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
            />
        </>
    );
};

export default ConversationPage;