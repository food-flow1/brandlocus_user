"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { blogPosts } from "@/constants/data";
import Unlock from "../../home/Unlock";

const BlogDetailPage = () => {
    const params = useParams();
    const blogId = params?.id as string;

    // For now, get the first blog post (you can enhance this to fetch by ID)
    const blogPost = blogPosts[0] || blogPosts[parseInt(blogId) || 0];

    const tableOfContents = [
        "Overview",
        "Final Thought",
    ];

    const sections = [
        {
            number: 1,
            title: "Immediate Relief with Solar Solutions",
            content: "Solar companies can provide immediate relief to businesses and households struggling with frequent power outages. By offering quick installation of solar panels and battery storage systems, companies can help customers maintain productivity and daily operations even during grid failures."
        },
        {
            number: 2,
            title: "Long-Term Energy Independence",
            content: "Beyond immediate relief, solar energy offers a path to long-term energy independence. Companies can develop comprehensive solar solutions that reduce reliance on the national grid, providing customers with predictable energy costs and sustainable power generation."
        },
        {
            number: 3,
            title: "Community Engagement and Education",
            content: "Solar companies have an opportunity to engage with communities, educating them about the benefits of renewable energy. Through workshops, demonstrations, and community solar projects, companies can build trust and expand their customer base while contributing to environmental sustainability."
        },
        {
            number: 4,
            title: "Government and Policy Advocacy",
            content: "The solar industry can work with government bodies to advocate for favorable policies, subsidies, and incentives that make solar energy more accessible. By participating in policy discussions, companies can help shape a more renewable energy-friendly regulatory environment."
        },
        {
            number: 5,
            title: "Technological Innovation",
            content: "There's significant opportunity for innovation in solar technology, including more efficient panels, better battery storage solutions, and smart grid integration. Companies that invest in R&D can position themselves as leaders in the Nigerian solar market."
        }
    ];

    return (
        <article className="w-full bg-white pt-8 sm:pt-12 md:pt-16 lg:pt-20">
            <div className="max-width-container mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 sm:pt-16 pt-20">

                {/* Left Side - Content */}
                <div className="space-y-6 flex flex-col sm:items-start items-center sm:justify-start justify-center sm:w-[70%] w-full mb-16">
                    {/* Category Tag */}
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center px-4 border border-gray-300 py-2 rounded-full text-xs sm:text-sm font-medium bg-blue-50 text-gray-700"
                    >
                        {blogPost.category}
                    </motion.span>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl text-center sm:text-start sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                    >
                        {blogPost.title}
                    </motion.h1>
                </div>


                <section className="flex flex-col sm:flex-row gap-10">
                    <aside className="sm:w-[20%] w-full flex flex-col sm:items-start items-center sm:text-left text-center">
                        {/* Author Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col items-center gap-3 mb-6 sm:mb-8"
                        >
                            <div className="w-24 h-24 sm:w-10 sm:h-10 rounded-full bg-[#D9D9D9] flex items-center justify-center">
                                <span className="text-gray-600 text-base sm:text-sm font-medium">BL</span>
                            </div>
                            <div className="text-center sm:text-left">
                                <p className="font-bold text-gray-900 text-lg sm:text-base">Brand Locus</p>
                                <p className="text-sm text-gray-600">Content Writer</p>
                            </div>
                        </motion.div>

                        {/* Table of Contents */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="space-y-2 w-full sm:w-auto"
                        >
                            <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider text-center sm:text-left">TABLE OF CONTENT</h3>
                            <ul className="space-y-1">
                                {tableOfContents.map((item, index) => (
                                    <li key={index} className={`text-sm flex items-center gap-2 justify-center sm:justify-start ${
                                        index === 0 ? 'text-gray-900 font-bold' : 'text-gray-600'
                                    }`}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex gap-1.5 mt-6 justify-center sm:justify-start">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-6 h-6 rounded-full bg-[#D9D9D9]"></div>
                                ))}
                            </div>
                        </motion.div>

                    </aside>

                    <aside className="sm:w-[80%] w-full">
                        {/* Right Side - Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="relative w-full h-[400px] lg:h-[500px] rounded-xl overflow-hidden"
                        >
                            <Image
                                src={blogPost.image}
                                alt={blogPost.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </motion.div>


                        {/* Introduction Paragraph */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-base sm:text-lg text-gray-700 leading-relaxed italic py-2 px-6 my-8 border-l-4 border-gray-200"
                        >
                            Nigeria's power grid faces significant challenges, with frequent outages and unreliable electricity supply affecting millions of households and businesses. As the country grapples with these energy infrastructure issues, there's a growing opportunity for solar energy companies to provide sustainable, reliable alternative power solutions.
                        </motion.p>

                        {/* Main Article Body */}
                        <div className=" space-y-12 mb-16">
                            {/* Section Heading */}
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
                                >
                                    The Opportunity for Solar Companies
                                </motion.h2>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="text-base sm:text-lg text-gray-700 leading-relaxed pt-4"
                                >
                                    The current energy crisis in Nigeria presents a significant opportunity for solar companies to step in and provide much-needed solutions. Here are five key areas where solar companies can make a meaningful impact:
                                </motion.p>
                            </div>

                            {/* Numbered Sections */}
                            <div className="space-y-8">
                                {sections.map((section, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                                        className="space-y-3"
                                    >
                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                            {section.number}. {section.title}
                                        </h3>
                                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                                            {section.content}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Final Thoughts Section */}
                        <div className="space-y-8 mb-16">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900"
                            >
                                Final Thoughts
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative w-full h-[300px] rounded-xl overflow-hidden"
                            >
                                <Image
                                    src={blogPost.image}
                                    alt="Solar installation"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-base sm:text-lg text-gray-700 leading-relaxed italic py-2 px-6 my-8 border-l-4 border-gray-200"
                            >
                                The challenges facing Nigeria's power grid are significant, but they also represent a tremendous opportunity for solar companies. By providing immediate relief, long-term solutions, community engagement, policy advocacy, and technological innovation, solar companies can not only build successful businesses but also contribute to a more sustainable and reliable energy future for Nigeria.
                            </motion.p>
                        </div>

                    </aside>
                </section>

                {/* More Articles Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">More Articles</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogPosts.slice(0, 3).map((post: any, index: number) => (
                            <Link
                                key={index}
                                href={`/blog/${index}`}
                                className="group"
                            >
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
                                >
                                    <div className="relative w-full aspect-3/2 overflow-hidden rounded-t-xl">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                    <div className="p-4 sm:p-5 space-y-3">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-50 text-blue-700">
                                            {post.category}
                                        </span>
                                        <h3 className="text-base sm:text-lg font-bold text-gray-800 leading-tight group-hover:text-gray-900 transition-colors">
                                            {post.title}
                                        </h3>
                                    </div>
                                </motion.article>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>

            <Unlock />
        </article>
    );
};

export default BlogDetailPage;