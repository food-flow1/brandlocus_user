"use client";

import React from 'react'
import { usePathname } from 'next/navigation'
import ChatFooter from './Footer'
import Navbar from '@/components/layouts/Navbar'

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isChatBoxRoute = pathname?.startsWith('/chat-box');
    
    return (
        <div>
            <Navbar />
            {children}
            {!isChatBoxRoute && <ChatFooter />}
        </div>
    )
}

export default ChatLayout