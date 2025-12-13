"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { icons } from "@/constants";
import { WordPressUpdate } from "@/types/wordpress";

interface BlogCardProps {
  post: WordPressUpdate;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
        className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
      >
        {/* Image */}
        <div className="relative w-full aspect-3/2 overflow-hidden bg-gray-100 border-b border-gray-200">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
              <Image src={icons.blogIcon} alt="blog" width={40} height={40} className="opacity-20" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 md:p-8 space-y-4 flex-1 flex flex-col">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs uppercase tracking-widest">
            {post.category && (
              <span className="font-bold text-black">
                {post.category}
              </span>
            )}
            {post.dateDisplay && (
              <>
                {post.category && <span className="text-gray-300">•</span>}
                <span className="text-gray-500">{post.dateDisplay}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-black leading-tight group-hover:text-gray-700 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3 flex-1">
              {post.excerpt}
            </p>
          )}

          {/* Read More Link */}
          <div className="mt-auto pt-6 border-t border-gray-100">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-black group-hover:gap-3 transition-all">
              Read Article
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
