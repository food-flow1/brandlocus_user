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

                        {/* Featured Image */}
                        {post.image && (
                            <div className="px-6 sm:px-8 lg:pr-12 ">
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
      prose max-w-none

      /* Base typography */
      prose-headings:font-sans
      prose-headings:tracking-tight
      prose-headings:text-black

      /* H2 – Main sections */
      prose-h2:!text-[36px]
      sm:prose-h2:!text-[48px]
      prose-h2:!font-medium
      prose-h2:!mt-12
      prose-h2:!mb-4
      prose-h2:leading-[1.2]

      /* H3 – Subsections */
      prose-h3:!text-[28px]
      sm:prose-h3:!text-[36px]
      prose-h3:!font-medium
      prose-h3:!mt-8
      prose-h3:!mb-3
      prose-h3:leading-[1.3]

      /* H4 – Minor sections */
      prose-h4:text-[19px]
      prose-h4:font-bold
      prose-h4:!mt-6
      prose-h4:!mb-2

      /* Paragraphs */
      prose-p:text-[17px]
      prose-p:leading-[1.75]
      prose-p:text-gray-700
      prose-p:mb-6
      prose-p:font-normal

      /* Links */
      prose-a:!text-black
      prose-a:!underline
      prose-a:!underline-offset-2
      prose-a:!decoration-gray-300
      hover:prose-a:!decoration-black
      prose-a:!transition-colors

      /* Lists */
      prose-ul:!my-6
      prose-ul:!list-disc
      prose-ul:!pl-6
      prose-ul:!space-y-2

      prose-ol:!my-6
      prose-ol:!list-decimal
      prose-ol:!pl-6
      prose-ol:!space-y-2

      prose-li:!text-[17px]
      prose-li:!leading-[1.75]
      prose-li:!text-gray-700
      prose-li:!font-normal
      prose-li:!mb-2

      prose-li::marker:text-gray-900

      /* Blockquotes */
      prose-blockquote:my-8
      prose-blockquote:border-l-[3px]
      prose-blockquote:border-gray-300
      prose-blockquote:pl-6
      prose-blockquote:italic
      prose-blockquote:text-gray-600
      prose-blockquote:text-[17px]

      /* Strong / emphasis */
      prose-strong:text-black
      prose-strong:font-bold
      prose-em:text-gray-700
      prose-em:italic

      /* Images */
      prose-img:my-10
      prose-img:rounded-lg
      prose-img:w-full

      /* Inline code */
      prose-code:bg-gray-100
      prose-code:text-gray-800
      prose-code:px-2
      prose-code:py-1
      prose-code:rounded
      prose-code:text-sm
      prose-code:font-mono
      prose-code:before:content-['']
      prose-code:after:content-['']

      /* Tables */
      prose-table:my-8
      prose-table:w-full

      prose-th:bg-gray-50
      prose-th:p-3
      prose-th:text-left
      prose-th:text-sm
      prose-th:font-bold

      prose-td:p-3
      prose-td:text-gray-700
      prose-td:border-t
      prose-td:border-gray-200

      /* HR */
      prose-hr:my-12
      prose-hr:border-gray-200

      /* WordPress blocks */
      [&_.wp-block-heading]:text-black
      [&_.wp-block-heading]:!font-medium
      [&_.wp-block-heading]:!mt-12
      [&_.wp-block-heading]:!mb-4

      [&_.wp-block-spacer]:!hidden

      [&_.wp-block-list]:!my-6
      [&_.wp-block-list]:!space-y-2
      [&_.wp-block-list]:!pl-6

      [&_.wp-block-quote]:border-l-[3px]
      [&_.wp-block-quote]:border-gray-300
      [&_.wp-block-quote]:pl-6
      [&_.wp-block-quote]:italic

      [&_.wp-block-quote_p]:text-gray-600
      [&_.wp-block-quote_p]:mb-4
      [&_.wp-block-quote_p]:last:mb-0

      /* Force proper colors */
      [&_p]:text-gray-700
      [&_p]:font-normal
      [&_ul]:!my-6
      [&_ul]:!pl-6
      [&_ul]:!list-disc
      [&_ol]:!my-6
      [&_ol]:!pl-6
      [&_ol]:!list-decimal
      [&_li]:text-gray-700
      [&_li]:font-normal
      [&_li]:!mb-2
      [&_h1]:text-black
      [&_h2]:text-black
      [&_h2]:!text-[20px]
      sm:[&_h2]:!text-[26px]
      [&_h2]:!font-medium
      [&_h2]:!mt-12
      [&_h2]:!mb-4
      [&_h3]:text-black
      [&_h3]:!text-[18px]
      sm:[&_h3]:!text-[22px]
      [&_h3]:!font-medium
      [&_h3]:!mt-8
      [&_h3]:!mb-3
      [&_h4]:text-black
      [&_figure]:!w-full
      [&_figure]:!mx-0
      [&_figure]:!my-8
      [&_figure]:!block
      [&_h4]:!mt-6
      [&_h4]:!mb-2
      [&_a]:!text-black
      [&_a]:!no-underline
      [&_a]:!border-b
      [&_a]:!border-gray-300
      hover:[&_a]:!border-black
      [&_strong]:text-black
      [&_strong]:font-medium
      [&_b]:text-black
      [&_b]:font-medium
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
