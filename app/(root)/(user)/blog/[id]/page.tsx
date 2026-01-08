"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { WordPressUpdate } from "@/types/wordpress";
import Unlock from "../../home/Unlock";
import BlogCard from "@/components/blog/BlogCard";
// import { icons } from "@/constants";

interface BlogDetailPageProps {
    params: Promise<{ id: string }>;
}

const BlogDetailPage = ({ params }: BlogDetailPageProps) => {
    const { id: slug } = use(params);
    const searchParams = useSearchParams();
    const postId = searchParams.get('id');

    const [post, setPost] = useState<WordPressUpdate | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<WordPressUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!postId) {
            setError('Post ID missing');
            setLoading(false);
            return;
        }

        const fetchPostData = async () => {
            try {
                setLoading(true);
                // Fetch single post via proxy
                const response = await fetch(`/api/blog/posts-endpoint?id=${postId}`);
                if (!response.ok) throw new Error('Failed to fetch post');
                const postData = await response.json();
                setPost(postData);

                // Fetch related posts (latest updates)
                const updatesRes = await fetch('/api/blog/posts-endpoint?size=4');
                if (updatesRes.ok) {
                    const result = await updatesRes.json();
                    if (result.updates && Array.isArray(result.updates)) {
                        setRelatedPosts(
                            result.updates
                                .filter((p: WordPressUpdate) => String(p.id) !== postId)
                                .slice(0, 3)
                        );
                    }
                }
            } catch (err) {
                console.error('Error fetching post detail:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchPostData();
    }, [postId]);

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center pt-32">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center pt-32 px-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
                <p className="text-gray-600 mb-8">{error || "We couldn't find the article you're looking for."}</p>
                <Link href="/blog" className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <article className="w-full bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="border-b border-gray-200 mb-8">
                    <div className="px-6 sm:px-8 lg:pr-12 pt-20 lg:pt-32 pb-8 lg:pb-10">
                        <header className="space-y-8">
                            {/* Title */}
                            <h1
                                className="
                                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                                    font-serif font-bold 
                                    text-black 
                                    leading-[1.1] 
                                    tracking-tight
                                "
                                dangerouslySetInnerHTML={{ __html: post.title }}
                            />
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

                        {/* Featured Image - Only show if not already in content */}
                        {post.image && !post.content?.includes(post.image) && (
                            <div className="px-6 sm:px-8 lg:pr-12 mb-8">
                                <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-gray-200 border border-gray-200 shadow-md">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="100vw"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Content Section */}
                        <div className="px-6 sm:px-8 lg:pr-12 pb-16 lg:pb-16 pt-8">
                            <div className="">
                                <div
                                    className="
      prose prose-lg max-w-none

      /* Base typography */
      prose-headings:font-serif
      prose-headings:tracking-tight
      prose-headings:text-black

      /* H2 – Main sections - More balanced size */
      prose-h2:!text-[24px]
      sm:prose-h2:!text-[32px]
      prose-h2:!font-bold
      prose-h2:!mt-16
      prose-h2:!mb-6
      prose-h2:!leading-[1.25]

      /* H3 – Subsections */
      prose-h3:!text-[20px]
      sm:prose-h3:!text-[24px]
      prose-h3:!font-semibold
      prose-h3:!mt-10
      prose-h3:!mb-4
      prose-h3:!leading-[1.3]

      /* H4 – Minor sections */
      prose-h4:!text-[18px]
      prose-h4:!font-semibold
      prose-h4:!mt-8
      prose-h4:!mb-3

      /* Paragraphs - Improved readability */
      prose-p:text-[18px]
      prose-p:!leading-[1.8]
      prose-p:text-gray-700
      prose-p:!mb-6
      prose-p:font-normal

      /* First paragraph - Slightly larger */
      [&>p:first-of-type]:text-[19px]
      [&>p:first-of-type]:!leading-[1.8]
      [&>p:first-of-type]:text-gray-800

      /* Links */
      prose-a:!text-black
      prose-a:!font-medium
      prose-a:!underline
      prose-a:!underline-offset-4
      prose-a:!decoration-gray-400
      hover:prose-a:!decoration-black
      prose-a:!transition-all
      prose-a:!duration-200

      /* Lists - Better visual distinction */
      prose-ul:!my-8
      prose-ul:!list-none
      prose-ul:!pl-0
      prose-ul:!space-y-3

      prose-ol:!my-8
      prose-ol:!list-decimal
      prose-ol:!pl-6
      prose-ol:!space-y-3

      prose-li:!text-[18px]
      prose-li:!leading-[1.8]
      prose-li:!text-gray-700
      prose-li:!font-normal
      prose-li:!mb-0
      prose-li:!pl-8
      prose-li:relative
      
      /* Custom bullet points */
      prose-li:before:content-['•']
      prose-li:before:absolute
      prose-li:before:left-0
      prose-li:before:text-black
      prose-li:before:font-bold
      prose-li:before:text-[20px]

      /* Blockquotes - Enhanced visual style */
      prose-blockquote:!my-10
      prose-blockquote:!border-l-4
      prose-blockquote:!border-black
      prose-blockquote:!bg-gray-50
      prose-blockquote:!pl-8
      prose-blockquote:!pr-8
      prose-blockquote:!py-6
      prose-blockquote:!rounded-r-lg
      prose-blockquote:!not-italic
      prose-blockquote:!text-gray-800

      prose-blockquote:!text-[18px]
      prose-blockquote:!leading-[1.7]
      prose-blockquote:!font-medium

      /* Strong / emphasis - Better distinction */
      prose-strong:!text-black
      prose-strong:!font-bold
      prose-em:!text-gray-700
      prose-em:!italic

      /* Images */
      prose-img:!my-12
      prose-img:!rounded-xl
      prose-img:!w-full
      prose-img:!shadow-sm

      /* Inline code */
      prose-code:!bg-gray-100
      prose-code:!text-gray-900
      prose-code:!px-2
      prose-code:!py-1
      prose-code:!rounded
      prose-code:!text-[16px]
      prose-code:!font-mono
      prose-code:before:!content-['']
      prose-code:after:!content-['']

      /* Tables */
      prose-table:!my-10
      prose-table:!w-full
      prose-table:!border-collapse

      prose-th:!bg-gray-100
      prose-th:!p-4
      prose-th:!text-left
      prose-th:!text-[16px]
      prose-th:!font-bold
      prose-th:!text-black

      prose-td:!p-4
      prose-td:!text-gray-700
      prose-td:!border-t
      prose-td:!border-gray-200
      prose-td:!text-[17px]

      /* HR */
      prose-hr:!my-16
      prose-hr:!border-gray-300

      /* WordPress specific blocks */
      [&_.wp-block-heading]:!text-black
      [&_.wp-block-heading]:!font-bold
      [&_.wp-block-heading]:!text-[24px]
      sm:[&_.wp-block-heading]:!text-[32px]
      [&_.wp-block-heading]:!mt-16
      [&_.wp-block-heading]:!mb-6
      [&_.wp-block-heading]:!leading-[1.25]

      [&_.wp-block-spacer]:!hidden

      [&_.wp-block-list]:!my-8
      [&_.wp-block-list]:!space-y-3
      [&_.wp-block-list]:!pl-0
      [&_.wp-block-list]:!list-none

      [&_.wp-block-list_li]:!pl-8
      [&_.wp-block-list_li]:!relative
      [&_.wp-block-list_li]:before:!content-['•']
      [&_.wp-block-list_li]:before:!absolute
      [&_.wp-block-list_li]:before:!left-0
      [&_.wp-block-list_li]:before:!text-black
      [&_.wp-block-list_li]:before:!font-bold
      [&_.wp-block-list_li]:before:!text-[20px]

      [&_.wp-block-quote]:!border-l-4
      [&_.wp-block-quote]:!border-black
      [&_.wp-block-quote]:!bg-gray-50
      [&_.wp-block-quote]:!pl-8
      [&_.wp-block-quote]:!pr-8
      [&_.wp-block-quote]:!py-6
      [&_.wp-block-quote]:!rounded-r-lg
      [&_.wp-block-quote]:!my-10
      [&_.wp-block-quote]:!not-italic

      [&_.wp-block-quote_p]:!text-gray-800
      [&_.wp-block-quote_p]:!text-[18px]
      [&_.wp-block-quote_p]:!leading-[1.7]
      [&_.wp-block-quote_p]:!font-medium
      [&_.wp-block-quote_p]:!mb-4
      [&_.wp-block-quote_p]:last:!mb-0

      /* Direct element targeting for consistency */
      [&_p]:!text-gray-700
      [&_p]:!font-normal
      [&_p]:!text-[18px]
      [&_p]:!leading-[1.8]
      [&_p]:!mb-6

      [&_ul]:!my-8
      [&_ul]:!pl-0
      [&_ul]:!list-none
      [&_ul]:!space-y-3

      [&_ol]:!my-8
      [&_ol]:!pl-6
      [&_ol]:!list-decimal
      [&_ol]:!space-y-3

      [&_li]:!text-gray-700
      [&_li]:!font-normal
      [&_li]:!text-[18px]
      [&_li]:!leading-[1.8]
      [&_li]:!mb-0

      [&_h1]:!text-black
      [&_h1]:!font-bold
      [&_h1]:!text-[28px]
      sm:[&_h1]:!text-[36px]

      [&_h2]:!text-black
      [&_h2]:!font-bold
      [&_h2]:!text-[24px]
      sm:[&_h2]:!text-[32px]
      [&_h2]:!mt-16
      [&_h2]:!mb-6
      [&_h2]:!leading-[1.25]

      [&_h3]:!text-black
      [&_h3]:!font-semibold
      [&_h3]:!text-[20px]
      sm:[&_h3]:!text-[24px]
      [&_h3]:!mt-10
      [&_h3]:!mb-4

      [&_h4]:!text-black
      [&_h4]:!font-semibold
      [&_h4]:!text-[18px]
      [&_h4]:!mt-8
      [&_h4]:!mb-3

      [&_figure]:!w-full
      [&_figure]:!mx-0
      [&_figure]:!my-12
      [&_figure]:!block

      [&_a]:!text-black
      [&_a]:!font-medium
      [&_a]:!no-underline
      [&_a]:!border-b-2
      [&_a]:!border-gray-400
      hover:[&_a]:!border-black
      [&_a]:!transition-all

      [&_strong]:!text-black
      [&_strong]:!font-bold

      [&_b]:!text-black
      [&_b]:!font-bold

      [&_br]:!my-2
    "
                                    dangerouslySetInnerHTML={{ __html: post.content || "" }}
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
                                <BlogCard key={relatedPost.id} post={relatedPost} index={index} />
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
