"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiAlertCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import BlogCard from "@/components/blog/BlogCard";
import SectionBadge from "@/components/common/SectionBadge";
import { icons } from "@/constants";
import { ScrapedUpdatesResult } from "@/types/wordpress";

interface UpdatesProps {
  scrapedData: ScrapedUpdatesResult;
}

const Updates = ({ scrapedData }: UpdatesProps) => {
  const { updates, currentPage, hasNextPage, hasPreviousPage, error } = scrapedData;

  // Handle error state
  if (error) {
    return (
      <section className="w-full bg-white pt-12 pb-2 sm:pt-16 sm:pb-6 md:pt-20 md:pb-8 lg:pt-24 lg:pb-10">
        <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
          <div className="flex justify-center mb-4 sm:mb-6">
            <SectionBadge
              text="Blog"
              icon={<Image src={icons.blogIcon} alt="blog" width={20} height={20} />}
              className="mb-0"
            />
          </div>

          <div className="max-w-2xl mx-auto text-center py-12">
            <FiAlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">Unable to Load Updates</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Handle empty state
  if (updates.length === 0) {
    return (
      <section className="w-full bg-white pt-12 pb-2 sm:pt-16 sm:pb-6 md:pt-20 md:pb-8 lg:pt-24 lg:pb-10">
        <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
          <div className="flex justify-center mb-4 sm:mb-6">
            <SectionBadge
              text="Blog"
              icon={<Image src={icons.blogIcon} alt="blog" width={20} height={20} />}
              className="mb-0"
            />
          </div>

          <div className="max-w-2xl mx-auto text-center py-12">
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Updates Found</h3>
            <p className="text-gray-600">Check back later for new content.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white pt-12 pb-2 sm:pt-16 sm:pb-6 md:pt-20 md:pb-8 lg:pt-24 lg:pb-10">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Badge */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <SectionBadge
            text="Blog"
            icon={<Image src={icons.blogIcon} alt="blog" width={20} height={20} />}
            className="mb-0"
          />
        </div>

        {/* Headline */}
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight text-gray-800 mb-2 sm:mb-3 md:mb-4 text-center">
          Insights and Updates
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 text-center">
          Discover how we're shaping smarter learning experiences.
        </p>

        {/* Blog Posts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {updates.map((post, index) => (
            <BlogCard key={post.slug || index} post={post} index={index} />
          ))}
        </div>

        {/* Pagination */}
        {(hasPreviousPage || hasNextPage) && (
          <div className="flex justify-center items-center gap-8 mt-16 pt-12 border-t border-gray-200">
            {/* Previous Button */}
            {hasPreviousPage ? (
              <Link
                href={`/blog?page=${currentPage - 1}`}
                className="group flex items-center gap-3 text-black hover:text-gray-600 transition-colors"
              >
                <span className="w-10 h-10 flex items-center justify-center border-2 border-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <FiChevronLeft className="w-5 h-5" />
                </span>
                <span className="font-medium text-sm uppercase tracking-wider">Previous</span>
              </Link>
            ) : (
              <div className="flex items-center gap-3 text-gray-300 cursor-not-allowed">
                <span className="w-10 h-10 flex items-center justify-center border-2 border-gray-200">
                  <FiChevronLeft className="w-5 h-5" />
                </span>
                <span className="font-medium text-sm uppercase tracking-wider">Previous</span>
              </div>
            )}

            {/* Page Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 uppercase tracking-widest">Page</span>
              <span className="w-12 h-12 flex items-center justify-center border-2 border-black bg-black text-white font-bold text-lg">
                {currentPage}
              </span>
            </div>

            {/* Next Button */}
            {hasNextPage ? (
              <Link
                href={`/blog?page=${currentPage + 1}`}
                className="group flex items-center gap-3 text-black hover:text-gray-600 transition-colors"
              >
                <span className="font-medium text-sm uppercase tracking-wider">Next</span>
                <span className="w-10 h-10 flex items-center justify-center border-2 border-black group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <FiChevronRight className="w-5 h-5" />
                </span>
              </Link>
            ) : (
              <div className="flex items-center gap-3 text-gray-300 cursor-not-allowed">
                <span className="font-medium text-sm uppercase tracking-wider">Next</span>
                <span className="w-10 h-10 flex items-center justify-center border-2 border-gray-200">
                  <FiChevronRight className="w-5 h-5" />
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Updates;