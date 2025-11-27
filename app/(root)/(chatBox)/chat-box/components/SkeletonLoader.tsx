"use client";

import React from 'react';

// Skeleton for sidebar conversation items
export const ConversationSkeleton = () => {
    return (
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <div
                    key={i}
                    className="p-3 rounded-xl bg-white/5 animate-pulse"
                >
                    <div className="h-4 bg-white/10 rounded w-3/4"></div>
                </div>
            ))}
        </div>
    );
};

// Skeleton for chat messages
export const MessageSkeleton = ({ isUser = false }: { isUser?: boolean }) => {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
            <div className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 animate-pulse ${
                isUser ? 'bg-white/10' : 'bg-transparent'
            }`}>
                <div className="space-y-2">
                    <div className="h-4 bg-white/10 rounded w-full"></div>
                    <div className="h-4 bg-white/10 rounded w-5/6"></div>
                    <div className="h-4 bg-white/10 rounded w-4/6"></div>
                </div>
            </div>
        </div>
    );
};

// Skeleton for conversation page
export const ConversationPageSkeleton = () => {
    return (
        <div className="flex-1 overflow-y-auto mb-4 space-y-6 px-4">
            <MessageSkeleton isUser={true} />
            <MessageSkeleton isUser={false} />
            <MessageSkeleton isUser={true} />
            <MessageSkeleton isUser={false} />
        </div>
    );
};

// Skeleton for welcome card
export const WelcomeCardSkeleton = () => {
    return (
        <div className="bg-white/8 backdrop-blur-2xl p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden animate-pulse">
            <div className="space-y-6">
                <div className="text-center space-y-3">
                    <div className="h-8 bg-white/10 rounded w-3/4 mx-auto"></div>
                    <div className="h-6 bg-white/10 rounded w-1/2 mx-auto"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                            <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                            <div className="h-4 bg-white/10 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
                <div className="h-12 bg-white/10 rounded-2xl"></div>
            </div>
        </div>
    );
};

