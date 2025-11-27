"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ConversationSkeleton } from './SkeletonLoader';

interface Conversation {
    id: string;
    title: string;
    messages: any[];
    createdAt: string;
    updatedAt: string;
}

interface ChatSidebarProps {
    currentConversationId?: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ currentConversationId }) => {
    const router = useRouter();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load conversations from localStorage
        setIsLoading(true);
        const storedConversations = localStorage.getItem('chatConversations');
        if (storedConversations) {
            const convs: Conversation[] = JSON.parse(storedConversations);
            // Sort by updatedAt (most recent first)
            const sorted = convs.sort((a, b) =>
                new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
            setConversations(sorted);
        }
        setIsLoading(false);
    }, []);

    // Update conversations when localStorage changes (from other tabs/components)
    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoading(true);
            const storedConversations = localStorage.getItem('chatConversations');
            if (storedConversations) {
                const convs: Conversation[] = JSON.parse(storedConversations);
                const sorted = convs.sort((a, b) =>
                    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                );
                setConversations(sorted);
            } else {
                setConversations([]);
            }
            setIsLoading(false);
        };

        // Listen to storage events (cross-tab)
        window.addEventListener('storage', handleStorageChange);
        // Listen to custom event for same-tab updates
        const handleCustomEvent = () => handleStorageChange();
        window.addEventListener('conversationsUpdated', handleCustomEvent);

        // Also check periodically (for same-tab updates)
        const interval = setInterval(handleStorageChange, 500);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('conversationsUpdated', handleCustomEvent);
            clearInterval(interval);
        };
    }, []);

    return (
        <aside className="w-64 lg:w-80 border-r border-white/10 bg-black/40 backdrop-blur-xl px-6 pt-30 overflow-y-auto h-screen flex flex-col">
            {/* Business Quest Title */}
            <Link href="/chat-box">
                <h2 className="text-xl lg:text-2xl font-semibold text-white/90 mb-6 cursor-pointer hover:text-white transition-colors">
                    Business Quest
                </h2>
            </Link>

            {/* New Chat Button */}
            <Link
                href="/chat-box"
                className="mb-6 p-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium text-center transition-colors border border-white/20"
            >
                + New Chat
            </Link>

            {/* Today Section */}
            <div className="space-y-4 flex-1">
                <h3 className="text-sm font-medium text-white mb-4">Today</h3>
                <div className="space-y-3">
                    {isLoading ? (
                        <ConversationSkeleton />
                    ) : conversations.length === 0 ? (
                        <p className="text-white/50 text-sm">No conversations yet</p>
                    ) : (
                        conversations.map((item) => (
                            <Link
                                key={item.id}
                                href={`/chat-box/${item.id}`}
                                className={`block p-3 rounded-xl cursor-pointer transition-all ${currentConversationId === item.id
                                        ? 'bg-white/10 text-white'
                                        : 'text-white/70 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {item.title}
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </aside>
    );
};

export default ChatSidebar;

