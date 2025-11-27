"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-[#050505] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 lg:py-28">
        {/* Badge Skeleton */}
        <div className="flex justify-center mb-8">
          <div className="h-10 w-48 bg-white/10 rounded-full animate-pulse"></div>
        </div>

        {/* Heading Skeleton */}
        <div className="text-center space-y-4 mb-12">
          <div className="h-12 sm:h-16 md:h-20 w-3/4 mx-auto bg-white/10 rounded-lg animate-pulse"></div>
          <div className="h-6 w-1/2 mx-auto bg-white/5 rounded-lg animate-pulse"></div>
        </div>

        {/* Form Skeleton */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-6 sm:p-10 backdrop-blur-xl space-y-6">
          <div className="h-4 w-2/3 mx-auto bg-white/5 rounded animate-pulse"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-white/5 rounded animate-pulse"></div>
                <div className="h-12 w-full bg-white/10 rounded-2xl animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <div className="h-12 w-48 bg-white/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

