import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiLoader } from 'react-icons/fi';

interface ChatInputProps {
    onSubmit: (message: string) => void;
    isLoading: boolean;
    isPending: boolean; // For when message is sent but waiting for response
    disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, isLoading, isPending, disabled }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || disabled) return;
        
        onSubmit(message);
        setMessage('');
    };

    return (
        <div className="sticky bottom-0 z-20 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/98 to-transparent pt-4 pb-3 sm:pb-4 px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="relative group">
                    {/* Glowing border effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative flex items-center">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Ask me any business question..."
                            disabled={disabled}
                            className="w-full rounded-xl sm:rounded-2xl border border-white/20 bg-black/60 backdrop-blur-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 px-4 sm:px-5 py-3 sm:py-3.5 md:py-4 pr-12 sm:pr-14 text-sm sm:text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <button
                            type="submit"
                            disabled={!message.trim() || disabled}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/10 group/btn"
                            title={
                                !message.trim()
                                    ? "Type a message to send"
                                    : disabled
                                    ? "Waiting for AI response..."
                                    : "Send message"
                            }
                        >
                            {isPending ? (
                                <FiLoader className="w-5 h-5 text-white animate-spin" />
                            ) : (
                                <FiSend className="w-5 h-5 text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                            )}
                        </button>
                    </div>

                    {/* Status indicator below input */}
                    <AnimatePresence>
                        {isPending && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="mt-2 flex items-center gap-2 text-xs text-white/50"
                            >
                                <div className="flex space-x-1">
                                    <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                                <span>Waiting for AI response...</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </div>
    );
};

export default ChatInput;
