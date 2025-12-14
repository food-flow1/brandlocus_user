"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ConversationSkeleton } from './SkeletonLoader';
import { useChats, useProfile, useLogout } from '@/lib/api';
import { tokenStorage, refreshTokenStorage } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { FiLogOut, FiMenu, FiX, FiSearch, FiPlus, FiMessageSquare } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import ProfileModal from './ProfileModal';
import LogoutConfirmationModal from './LogoutConfirmationModal';
import { BiUser } from 'react-icons/bi';

// Helper function to group conversations by date
const getDateGroup = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    if (date >= today) return 'Today';
    if (date >= yesterday) return 'Yesterday';
    if (date >= lastWeek) return 'This Week';
    if (date >= lastMonth) return 'This Month';
    return 'Older';
};

interface ChatSidebarProps {
    currentConversationId?: string;
    isOpen?: boolean;
    onToggle?: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ currentConversationId, isOpen = false, onToggle }) => {
    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useChats();
    const { data: profile, isLoading: isLoadingProfile } = useProfile();
    const logout = useLogout();
    const router = useRouter();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Flatten all pages into a single conversations array
    const conversations = useMemo(() => {
        if (!data?.pages) return [];
        return data.pages.flatMap(page => page.content || []);
    }, [data]);

    // Close sidebar when clicking on a conversation link on mobile
    const handleConversationClick = () => {
        if (onToggle && window.innerWidth < 1024) {
            onToggle();
        }
    };

    // Close sidebar on route change for mobile
    useEffect(() => {
        const handleResize = () => {
            // Auto-close sidebar on mobile when resizing to larger screen
            if (window.innerWidth >= 1024 && isOpen && onToggle) {
                onToggle();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen, onToggle]);

    // Handle logout confirmation
    const handleLogoutConfirm = async () => {
        const refreshToken = refreshTokenStorage.getRefreshToken();
        try {
            await logout.mutateAsync(refreshToken || null);
            tokenStorage.removeToken();
            refreshTokenStorage.removeRefreshToken();
            toast.success('Logged out successfully', {
                duration: 2000,
                style: {
                    background: '#1a1a1a',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            });
            setIsLogoutModalOpen(false);
            router.push(ROUTES.LOGIN);
        } catch (error: any) {
            // Even if API fails, clear local storage and redirect
            tokenStorage.removeToken();
            refreshTokenStorage.removeRefreshToken();
            setIsLogoutModalOpen(false);
            router.push(ROUTES.LOGIN);
        }
    };

    // Sort and filter conversations
    const sortedConversations = useMemo(() => {
        if (!conversations) return [];
        if (!Array.isArray(conversations)) {
            console.warn('Conversations is not an array:', conversations);
            return [];
        }
        if (conversations.length === 0) return [];

        let filtered = [...conversations];

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(conv =>
                conv.title?.toLowerCase().includes(query)
            );
        }

        return filtered.sort((a, b) => {
            const dateA = new Date(a.updatedAt || a.createdAt).getTime();
            const dateB = new Date(b.updatedAt || b.createdAt).getTime();
            return dateB - dateA;
        });
    }, [conversations, searchQuery]);

    // Group conversations by date
    const groupedConversations = useMemo(() => {
        const groups: Record<string, typeof sortedConversations> = {};
        const order = ['Today', 'Yesterday', 'This Week', 'This Month', 'Older'];

        sortedConversations.forEach(conv => {
            const dateValue = conv.updatedAt || conv.createdAt;
            const dateString = typeof dateValue === 'string' ? dateValue : dateValue.toISOString();
            const group = getDateGroup(dateString);
            if (!groups[group]) groups[group] = [];
            groups[group].push(conv);
        });

        // Return in order
        return order
            .filter(group => groups[group]?.length > 0)
            .map(group => ({ group, conversations: groups[group] }));
    }, [sortedConversations]);

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}

            {/* Mobile Toggle Button - Only visible on mobile */}
            <button
                onClick={onToggle}
                className="fixed top-20 left-4 z-50 lg:hidden p-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-colors"
                aria-label="Toggle sidebar"
            >
                {isOpen ? (
                    <FiX className="w-6 h-6 text-white" />
                ) : (
                    <FiMenu className="w-6 h-6 text-white" />
                )}
            </button>

            <aside className={`
                w-72 sm:w-80 border-r border-white/10 bg-black/95 lg:bg-black/40 backdrop-blur-xl h-screen flex flex-col fixed left-0 top-0 z-50
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:z-30
            `}>
                {/* Close button for mobile - inside sidebar */}
                <button
                    onClick={onToggle}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors lg:hidden"
                    aria-label="Close sidebar"
                >
                    <FiX className="w-5 h-5 text-white" />
                </button>

                {/* Fixed Header Section */}
                <div className="px-4 sm:px-6 pt-20 lg:pt-[7rem] pb-4 shrink-0 space-y-4">
                    {/* Business Quest Title */}
                    <Link href="/chat-box" onClick={handleConversationClick} className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors">
                            <HiSparkles className="w-4 h-4 text-white/80" />
                        </div>
                        <h2 className="text-lg lg:text-xl font-semibold text-white/90 cursor-pointer group-hover:text-white transition-colors">
                            Business Quest
                        </h2>
                    </Link>

                    {/* New Chat Button */}
                    <Link
                        href="/chat-box"
                        onClick={handleConversationClick}
                        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-white/15 to-white/10 hover:from-white/20 hover:to-white/15 text-white text-sm font-medium transition-all duration-300 border border-white/20 hover:border-white/30 group"
                    >
                        <FiPlus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                        <span>New Chat</span>
                    </Link>

                    {/* Search Input */}
                    <div className={`relative transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-white/20' : ''} rounded-xl`}>
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            placeholder="Search conversations..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-white/40 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all duration-300"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <FiX className="w-3 h-3 text-white/50" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Scrollable Conversations Section */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 min-h-0">
                    {isLoading ? (
                        <ConversationSkeleton />
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
                                <FiX className="w-5 h-5 text-red-400" />
                            </div>
                            <p className="text-white/50 text-sm">Error loading conversations</p>
                        </div>
                    ) : groupedConversations.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                                <FiMessageSquare className="w-5 h-5 text-white/40" />
                            </div>
                            <p className="text-white/50 text-sm">
                                {searchQuery ? 'No matching conversations' : 'No conversations yet'}
                            </p>
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="mt-2 text-xs text-white/40 hover:text-white/60 transition-colors"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {groupedConversations.map(({ group, conversations: groupConvs }) => (
                                    <motion.div
                                        key={group}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-2"
                                    >
                                        <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider px-1 sticky top-0 bg-black/95 lg:bg-black/40 backdrop-blur-sm py-2 z-10">
                                            {group}
                                        </h3>
                                        <div className="space-y-1">
                                            {groupConvs.map((item, index) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.03 }}
                                                >
                                                    <Link
                                                        href={`/chat-box/${item.id}`}
                                                        onClick={handleConversationClick}
                                                        className={`group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${currentConversationId === String(item.id)
                                                            ? 'bg-white/15 text-white border border-white/20'
                                                            : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                                                            }`}
                                                        title={item.title}
                                                    >
                                                        <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${currentConversationId === String(item.id)
                                                            ? 'bg-white/20'
                                                            : 'bg-white/5 group-hover:bg-white/10'
                                                            }`}>
                                                            <FiMessageSquare className="w-4 h-4" />
                                                        </div>
                                                        <span className="flex-1 truncate text-sm">{item.title}</span>
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Load More Button */}
                            {hasNextPage && (
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isFetchingNextPage ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading...
                                        </span>
                                    ) : (
                                        'Load More'
                                    )}
                                </motion.button>
                            )}
                        </div>
                    )}
                </div>

                {/* Profile Section - Fixed at bottom */}
                <div className="px-4 sm:px-6 py-4 border-t border-white/10 shrink-0 space-y-2 bg-gradient-to-t from-black/20 to-transparent">
                    {isLoadingProfile ? (
                        <div className="flex items-center gap-3 p-2">
                            <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse"></div>
                            <div className="flex-1">
                                <div className="h-4 w-24 bg-white/10 rounded animate-pulse mb-2"></div>
                                <div className="h-3 w-32 bg-white/10 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ) : profile ? (
                        <>
                            <button
                                onClick={() => setIsProfileModalOpen(true)}
                                className="w-full cursor-pointer flex items-center gap-3 hover:bg-white/5 rounded-xl p-2.5 transition-all duration-200 group border border-transparent hover:border-white/10"
                            >
                                {/* Avatar */}
                                {profile.profileImageUrl ? (
                                    <img
                                        src={profile.profileImageUrl}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover shrink-0 border border-white/10 group-hover:border-white/20 transition-colors"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-white font-semibold text-sm shrink-0 border border-white/10 group-hover:border-white/20 transition-colors">
                                        {profile.firstName?.[0]?.toUpperCase() || profile.first_name?.[0]?.toUpperCase() || profile.lastName?.[0]?.toUpperCase() || profile.last_name?.[0]?.toUpperCase() || profile.email?.[0]?.toUpperCase() || 'U'}
                                    </div>
                                )}
                                {/* Profile Info */}
                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-sm font-medium text-white truncate group-hover:text-white/90 transition-colors">
                                        {profile.firstName && profile.lastName
                                            ? `${profile.firstName} ${profile.lastName}`
                                            : profile.first_name && profile.last_name
                                                ? `${profile.first_name} ${profile.last_name}`
                                                : profile.firstName || profile.first_name || profile.lastName || profile.last_name || profile.email || 'User'}
                                    </p>
                                    {profile.email && (
                                        <p className="text-xs text-white/40 truncate">{profile.email}</p>
                                    )}
                                </div>
                                <BiUser className="w-4 h-4 text-white/30 group-hover:text-white/50 transition-colors shrink-0" />
                            </button>
                            {/* Logout Button */}
                            <button
                                onClick={() => setIsLogoutModalOpen(true)}
                                disabled={logout.isPending}
                                className="w-full flex items-center cursor-pointer justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 hover:border-white/20 group"
                            >
                                <FiLogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                                <span className="text-sm font-medium">Sign Out</span>
                            </button>
                        </>
                    ) : null}
                </div>

                {/* Profile Modal */}
                <ProfileModal
                    isOpen={isProfileModalOpen}
                    onClose={() => setIsProfileModalOpen(false)}
                />

                {/* Logout Confirmation Modal */}
                <LogoutConfirmationModal
                    isOpen={isLogoutModalOpen}
                    onClose={() => setIsLogoutModalOpen(false)}
                    onConfirm={handleLogoutConfirm}
                    isLoading={logout.isPending}
                />
            </aside>
        </>
    );
};

export default ChatSidebar;