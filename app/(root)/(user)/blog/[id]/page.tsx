import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { scrapePost, scrapeUpdates } from "@/lib/scrapeUpdates";
import Unlock from "../../home/Unlock";
import BlogCard from "@/components/blog/BlogCard";
import { icons } from "@/constants";

// Revalidate every hour
export const revalidate = 3600;

interface BlogDetailPageProps {
    params: Promise<{ id: string }>;
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
    const { id: slug } = await params;

    // Fetch real post data
    const post = await scrapePost(slug);

    if (!post) {
        notFound();
    }

    // Fetch related posts (first 3 from recent updates, excluding current)
    const relatedPostsData = await scrapeUpdates(1);
    const relatedPosts = relatedPostsData.updates
        .filter(p => p.slug !== slug)
        .slice(0, 3);

    return (
        <article className="w-full bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="border-b border-gray-100">
                    <div className="px-6 sm:px-8 lg:pr-12 pt-20 lg:pt-32 pb-8 lg:pb-10">
                        <header className="space-y-8">
                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-black leading-[1.1] tracking-tight">
                                {post.title}
                            </h1>
                        </header>
                    </div>
                </div>
                <section className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                    {/* Left Sidebar - Sticky */}
                    <aside className="lg:w-[25%] w-full px-6 sm:px-8 lg:px-0 lg:pl-12 pt-10 pb-12 lg:pb-0">
                        <div className="lg:sticky lg:top-32 space-y-12">
                            {/* Back Link */}
                            <div>
                                <Link
                                    href="/blog"
                                    className="group inline-flex items-center text-sm font-medium text-gray-400 hover:text-black transition-all duration-300"
                                >
                                    <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
                                    Back to Updates
                                </Link>
                            </div>

                            {/* Author Card */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                        BL
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-black">Brand Locus</p>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Editorial Team</p>
                                    </div>
                                </div>
                            </div>

                            {/* Meta Info */}
                            <div className="space-y-3 pt-6 border-t border-gray-100">
                                {post.category && (
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Category</p>
                                        <p className="text-sm font-semibold text-black">{post.category}</p>
                                    </div>
                                )}
                                {post.dateDisplay && (
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Published</p>
                                        <p className="text-sm text-gray-600">{post.dateDisplay}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <aside className="lg:w-[75%] w-full">

                        {/* Content Section */}
                        <div className="px-6 sm:px-8 lg:pr-12 pb-16 lg:pb-24 pt-10">
                            <div className="">
                                <div
                                    className="prose prose-xl max-w-none

                                    /* Headings - Improved hierarchy and spacing */
                                    prose-headings:font-serif prose-headings:font-bold prose-headings:text-black prose-headings:leading-[1.2] prose-headings:tracking-tight
                                    prose-h1:text-5xl sm:prose-h1:text-6xl prose-h1:mt-20 prose-h1:mb-10 prose-h1:pb-6 prose-h1:border-b prose-h1:border-gray-100
                                    prose-h2:text-4xl sm:prose-h2:text-5xl prose-h2:mt-20 prose-h2:mb-8
                                    prose-h3:text-3xl sm:prose-h3:text-4xl prose-h3:mt-16 prose-h3:mb-6
                                    prose-h4:text-2xl sm:prose-h4:text-3xl prose-h4:mt-12 prose-h4:mb-5

                                    /* Paragraphs - Enhanced readability */
                                    prose-p:text-gray-700 prose-p:text-lg sm:prose-p:text-xl prose-p:leading-[1.9] prose-p:mb-8 prose-p:font-normal
                                    first:prose-p:text-xl first:prose-p:sm:text-2xl first:prose-p:leading-[1.7] first:prose-p:text-gray-800 first:prose-p:mb-12

                                    /* Links - Modern styling */
                                    prose-a:text-black prose-a:font-medium prose-a:no-underline prose-a:border-b-2 prose-a:border-gray-300 prose-a:transition-all prose-a:duration-200
                                    hover:prose-a:border-black hover:prose-a:text-black

                                    /* Strong and emphasis */
                                    prose-strong:text-black prose-strong:font-bold prose-strong:tracking-tight
                                    prose-em:text-gray-800 prose-em:italic

                                    /* Blockquotes - Editorial style */
                                    prose-blockquote:border-l-[8px] prose-blockquote:border-black prose-blockquote:pl-10 prose-blockquote:pr-8 prose-blockquote:py-8 prose-blockquote:my-16
                                    prose-blockquote:text-2xl sm:prose-blockquote:text-3xl prose-blockquote:italic prose-blockquote:font-serif prose-blockquote:text-gray-800 prose-blockquote:leading-[1.5]
                                    prose-blockquote:bg-gray-50/50 prose-blockquote:rounded-r-lg

                                    /* Lists - Better spacing */
                                    prose-ul:my-12 prose-ul:space-y-4 prose-ol:my-12 prose-ol:space-y-4
                                    prose-li:text-gray-700 prose-li:text-lg sm:prose-li:text-xl prose-li:leading-[1.8] prose-li:pl-3 prose-li:mb-3
                                    prose-li:marker:text-black prose-li:marker:font-bold

                                    /* Images - Premium feel */
                                    prose-img:!w-full prose-img:!max-w-none prose-img:h-auto prose-img:rounded-xl prose-img:my-20 prose-img:shadow-2xl prose-img:ring-1 prose-img:ring-gray-100

                                    /* Code blocks */
                                    prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-base prose-code:font-mono prose-code:before:content-[''] prose-code:after:content-['']
                                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:my-12 prose-pre:shadow-xl

                                    /* Horizontal rules */
                                    prose-hr:border-gray-200 prose-hr:my-20 prose-hr:border-t-2

                                    /* Tables */
                                    prose-table:my-12 prose-table:border-collapse
                                    prose-th:bg-gray-50 prose-th:text-black prose-th:font-bold prose-th:text-left prose-th:p-4 prose-th:border prose-th:border-gray-200
                                    prose-td:p-4 prose-td:border prose-td:border-gray-200 prose-td:text-gray-700

                                    /* Global text colors */
                                    [&_*]:text-gray-700
                                    [&_h1]:text-black [&_h2]:text-black [&_h3]:text-black [&_h4]:text-black [&_h5]:text-black [&_h6]:text-black
                                    [&_strong]:text-black [&_b]:text-black
                                    [&_th]:text-black"
                                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                                />
                            </div>
                        </div>


                    </aside>
                </section>

                {/* Related Posts Section */}
                {relatedPosts.length > 0 && (
                    <div className="border-t border-gray-200 pt-16 container">
                        <h2 className="text-3xl font-serif font-bold text-black mb-12">Related Articles</h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            {relatedPosts.map((relatedPost, index) => (
                                <BlogCard key={relatedPost.slug} post={relatedPost} index={index} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Section */}
            <Unlock />
        </article>
    );
};

export default BlogDetailPage;
