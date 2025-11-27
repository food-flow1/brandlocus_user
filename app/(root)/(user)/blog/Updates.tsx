"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionBadge from "@/components/common/SectionBadge";
import { icons } from "@/constants";
import { blogPosts } from "@/constants/data";

const Updates = () => {
 
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

        {/* Blog Posts Grid - 2 rows x 3 columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {blogPosts.map((post: any, index: number) => (
            <Link key={index} href={`/blog/${index}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
              >
              {/* Image */}
              <div className="relative w-full aspect-3/2 overflow-hidden rounded-t-xl bg-gray-100">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                {/* Category Badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-50 text-blue-700">
                  {post.category}
                </span>

                {/* Title */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 leading-tight group-hover:text-gray-900 transition-colors">
                  {post.title}
                </h3>
              </div>
            </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Updates;