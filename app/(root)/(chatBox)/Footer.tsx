"use client";

import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/constants/routes';

const ChatFooter = () => {
  return (
    <footer className="w-full bg-black py-8 sm:py-12">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Horizontal Line */}
        <div className="border-t border-gray-700 mb-8 sm:mb-10"></div>
        
        {/* Footer Content */}
        <div className="flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-6">
          {/* Copyright */}
          <p className="text-sm sm:text-base text-gray-400 text-center sm:text-left">
            © 2025 Brand Locus Limited. All rights reserved.
          </p>
          
          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <Link 
              href={ROUTES.HOME}
              className="text-sm sm:text-base text-gray-400 hover:text-gray-300 transition-colors"
            >
              Homepage
            </Link>
            <Link 
              href={ROUTES.TERMS_AND_CONDITIONS}
              className="text-sm sm:text-base text-gray-400 hover:text-gray-300 transition-colors"
            >
              Terms of Use
            </Link>
            <Link 
              href={ROUTES.PRIVACY_POLICY}
              className="text-sm sm:text-base text-gray-400 hover:text-gray-300 transition-colors"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default ChatFooter;