/**
 * Blog Updates Page - Server Component
 * 
 * Fetches and displays blog updates from WordPress site using server-side scraping.
 * Implements ISR (Incremental Static Regeneration) for optimal performance.
 */

import React from 'react';
import Updates from './Updates';
import Unlock from '../home/Unlock';
import { scrapeUpdates } from '@/lib/scrapeUpdates';

// Enable ISR: Revalidate every hour
export const revalidate = 3600;

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>;
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  // Get page number from URL params
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  
  // Fetch scraped updates from WordPress
  const scrapedData = await scrapeUpdates(currentPage);
  
  return (
    <div className="pt-20">
      <Updates scrapedData={scrapedData} />
      <Unlock />
    </div>
  );
};

export default BlogPage;