"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Hero Section Skeleton */}
        <div className="h-[60vh] sm:h-[70vh] bg-gray-100 rounded-2xl mb-12 animate-pulse"></div>

        {/* Content Sections Skeleton */}
        <div className="space-y-16 mb-16">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-6">
              <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="h-4 w-full bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;

