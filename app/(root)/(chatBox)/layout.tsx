import React from 'react'
import ChatFooter from './Footer'
import Navbar from '@/components/layouts/Navbar'

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
            <ChatFooter />
        </div>
    )
}

export default ChatLayout