"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionBadge from "@/components/common/SectionBadge";
import { icons } from "@/constants";
import { blogPosts } from "@/constants/data";

const Blog = () => {

  return (
    <section className="w-full bg-white py-6 sm:py-8 md:py-10 lg:py-12 mt-10">
      <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10">
        {/* Badge */}
        <div className="flex justify-center">
          <SectionBadge
            text="Blog"
            icon={<Image src={icons.blogIcon} alt="blog" width={20} height={20} />}
            className="!mb-2"
          />
        </div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-800 mb-2 sm:mb-3 md:mb-4 text-center max-w-full sm:max-w-2xl mx-auto"
        >
          Insights and Updates
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-full sm:max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 text-center"
        >
          Discover how we're shaping smarter learning experiences.
        </motion.p>

        {/* Blog Posts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {blogPosts?.slice(0, 3).map((post: any, index: number) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer group"
            >
              {/* Image */}
              <div className="relative w-full aspect-3/2 overflow-hidden rounded-t-xl">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
