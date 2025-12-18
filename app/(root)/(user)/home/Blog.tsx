"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionBadge from "@/components/common/SectionBadge";
import BlogCard from "@/components/blog/BlogCard";
import { icons } from "@/constants";
import { WordPressUpdate } from "@/types/wordpress";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<WordPressUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        const data = await response.json();
        setBlogPosts(data.updates || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

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
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {blogPosts.slice(0, 3).map((post, index) => (
              <BlogCard key={post.id || post.slug || index} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;