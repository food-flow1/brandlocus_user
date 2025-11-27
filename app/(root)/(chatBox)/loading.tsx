"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo/Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/10 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-transparent border-t-white/60 rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        
        {/* Loading Text */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-32 bg-white/10 rounded-lg animate-pulse"></div>
          <div className="h-4 w-24 bg-white/5 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

