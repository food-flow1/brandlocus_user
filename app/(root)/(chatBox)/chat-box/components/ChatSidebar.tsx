"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ConversationSkeleton } from './SkeletonLoader';
import { useChats, useProfile, useLogout } from '@/lib/api';
import { tokenStorage, refreshTokenStorage } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { FiChevronRight, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import ProfileModal from './ProfileModal';
import LogoutConfirmationModal from './LogoutConfirmationModal';
import { BiUser } from 'react-icons/bi';

interface ChatSidebarProps {
    currentConversationId?: string;
    isOpen?: boolean;
    onToggle?: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ currentConversationId, isOpen = false, onToggle }) => {
    const { data: conversations, isLoading, error } = useChats();
    const { data: profile, isLoading: isLoadingProfile } = useProfile();
    const logout = useLogout();
    const router = useRouter();
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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

    // Sort conversations by createdAt (most recent first)
    const sortedConversations = React.useMemo(() => {
        // Ensure conversations is an array
        if (!conversations) return [];
        if (!Array.isArray(conversations)) {
            console.warn('Conversations is not an array:', conversations);
            return [];
        }
        if (conversations.length === 0) return [];

        return [...conversations].sort((a, b) => {
            // Use updatedAt if available, otherwise use createdAt
            const dateA = new Date(a.updatedAt || a.createdAt).getTime();
            const dateB = new Date(b.updatedAt || b.createdAt).getTime();
            return dateB - dateA;
        });
    }, [conversations]);

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
                <div className="px-4 sm:px-6 pt-20 lg:pt-[7rem] pb-4 shrink-0">
                    {/* Business Quest Title */}
                    <Link href="/chat-box" onClick={handleConversationClick}>
                        <h2 className="text-xl lg:text-2xl font-semibold text-white/90 mb-6 cursor-pointer hover:text-white transition-colors">
                            Business Quest
                        </h2>
                    </Link>

                    {/* New Chat Button */}
                    <Link
                        href="/chat-box"
                        onClick={handleConversationClick}
                        className="block p-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium text-center transition-colors border border-white/20"
                    >
                        + New Chat
                    </Link>
                </div>

                {/* Scrollable Conversations Section */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 min-h-0">
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-white mb-4 sticky top-0 bg-black/95 lg:bg-black/40 backdrop-blur-sm py-2 -mt-2 z-10">Today</h3>
                        <div className="space-y-3">
                            {isLoading ? (
                                <ConversationSkeleton />
                            ) : error ? (
                                <p className="text-white/50 text-sm">Error loading conversations</p>
                            ) : sortedConversations.length === 0 ? (
                                <p className="text-white/50 text-sm">No conversations yet</p>
                            ) : (
                                sortedConversations.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/chat-box/${item.id}`}
                                        onClick={handleConversationClick}
                                        className={`block p-3 rounded-xl cursor-pointer transition-all overflow-hidden text-ellipsis whitespace-nowrap ${currentConversationId === String(item.id)
                                            ? 'bg-white/10 text-white'
                                            : 'text-white/70 hover:text-white hover:bg-white/5'
                                            }`}
                                        title={item.title}
                                    >
                                        {item.title}
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Section - Fixed at bottom */}
                <div className="px-4 sm:px-6 py-4 border-t border-white/10 shrink-0 space-y-3">
                    {isLoadingProfile ? (
                        <div className="flex items-center gap-3">
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
                                className="w-full flex items-center gap-3 hover:bg-white/5 rounded-lg p-2 transition-colors"
                            >
                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                                    {profile.firstName?.[0]?.toUpperCase() || profile.first_name?.[0]?.toUpperCase() || profile.lastName?.[0]?.toUpperCase() || profile.last_name?.[0]?.toUpperCase() || profile.email?.[0]?.toUpperCase() || 'U'}
                                </div>
                                {/* Profile Info */}
                                <div className="flex-1 min-w-0 text-left">
                                    <p className="text-sm font-medium text-white truncate">
                                        {profile.firstName && profile.lastName
                                            ? `${profile.firstName} ${profile.lastName}`
                                            : profile.first_name && profile.last_name
                                                ? `${profile.first_name} ${profile.last_name}`
                                                : profile.firstName || profile.first_name || profile.lastName || profile.last_name || profile.email || 'User'}
                                    </p>
                                    {profile.email && (
                                        <p className="text-xs text-white/50 truncate">{profile.email}</p>
                                    )}
                                </div>
                            </button>
                            {/* Logout Button */}
                            <button
                                onClick={() => setIsLogoutModalOpen(true)}
                                disabled={logout.isPending}
                                className="w-full flex items-center cursor-pointer justify-between gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="flex items-center gap-2">
                                    <BiUser className="w-4 h-4 shrink-0" />
                                    <span className="text-sm font-medium">Logout </span>
                                </div>
                                <FiLogOut size={25} color='white' className="text-white bg-red-500/30 rounded-lg p-3" />
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

