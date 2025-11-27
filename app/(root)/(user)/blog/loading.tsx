"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        {/* Header Skeleton */}
        <div className="text-center mb-12 space-y-4">
          <div className="h-12 w-64 mx-auto bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-6 w-96 mx-auto bg-gray-100 rounded-lg animate-pulse"></div>
        </div>

        {/* Blog Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-100"></div>
              <div className="p-6 space-y-4">
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
                <div className="h-6 w-full bg-gray-200 rounded"></div>
                <div className="h-6 w-5/6 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-100 rounded"></div>
                <div className="h-4 w-4/5 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;

