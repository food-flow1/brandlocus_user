/**
 * Server-side WordPress content scraper
 * 
 * This module fetches and parses HTML from brandlocusgroup.com/updates
 * to extract blog post information without requiring API access.
 * 
 * Security & Performance:
 * - Server-only execution (never runs in browser)
 * - ISR caching to minimize requests to source site
 * - Timeout protection
 * - Graceful error handling
 */

import { WordPressUpdate, ScrapedUpdatesResult } from '@/types/wordpress';

const API_ENDPOINT = 'https://wp.brandlocusgroup.com/wp-json/wp/v2/posts';

/**
 * Fetches blog updates from WordPress API
 * 
 * @param page - Page number (1-based indexing)
 * @param pageSize - Number of items per page
 * @returns Updates with pagination info
 */
export async function scrapeUpdates(page: number = 1, pageSize: number = 9): Promise<ScrapedUpdatesResult> {
  try {
    const url = `${API_ENDPOINT}?_embed&page=${page}&per_page=${pageSize}&status=publish`;
    console.log(`[WP-API] Fetching: ${url}`);

    const response = await fetch(url, {
      next: { 
        revalidate: 3600 // ISR: Cache for 1 hour
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP ${response.status}: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid API response format');
    }

    // Map WordPress API response to WordPressUpdate type
    const updates: WordPressUpdate[] = data.map((item: any) => {
      // Extract featured image from embedded data
      let imageUrl = undefined;
      const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0];
      if (featuredMedia) {
        imageUrl = featuredMedia.source_url;
      } else {
        // Fallback to content extraction
        imageUrl = extractImage(item.content.rendered);
      }

      // Extract category name
      const categories = item._embedded?.['wp:term']?.[0] || [];
      const categoryName = categories.length > 0 ? categories[0].name : 'Insights';

      return {
        id: String(item.id),
        title: item.title.rendered,
        slug: item.slug,
        link: item.link,
        excerpt: item.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 300),
        publishDate: item.date,
        dateDisplay: formatDate(item.date),
        image: imageUrl,
        category: categoryName,
        content: item.content.rendered
      };
    });

    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    console.log(`[WP-API] Fetched ${updates.length} updates for page ${page} of ${totalPages}`);

    return {
      updates,
      currentPage: page,
      hasNextPage,
      hasPreviousPage,
      totalOnPage: updates.length,
    };

  } catch (error) {
    console.error('[WP-API] Error:', error);
    
    return {
      updates: [],
      currentPage: page,
      hasNextPage: false,
      hasPreviousPage: page > 1,
      totalOnPage: 0,
      error: error instanceof Error ? error.message : 'Failed to fetch updates',
    };
  }
}

/**
 * Fetches a single blog post by ID
 * 
 * @param id - The WordPress post ID
 * @returns WordPressUpdate object
 */
export async function scrapePost(id: string): Promise<WordPressUpdate | null> {
  try {
    console.log(`[WP-API] Fetching single post: ${id}`);

    const url = `${API_ENDPOINT}/${id}?_embed`;
    const response = await fetch(url, {
        next: { revalidate: 3600 }
    });

    if (!response.ok) return null;

    const item = await response.json();

    // Extract featured image
    let imageUrl = undefined;
    const featuredMedia = item._embedded?.['wp:featuredmedia']?.[0];
    if (featuredMedia) {
      imageUrl = featuredMedia.source_url;
    } else {
      imageUrl = extractImage(item.content.rendered);
    }

    const categories = item._embedded?.['wp:term']?.[0] || [];
    const categoryName = categories.length > 0 ? categories[0].name : 'Insights';

    return {
      id: String(item.id),
      title: item.title.rendered,
      slug: item.slug,
      link: item.link,
      excerpt: item.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 300),
      publishDate: item.date,
      dateDisplay: formatDate(item.date),
      image: imageUrl,
      category: categoryName,
      content: item.content.rendered
    };

  } catch (error) {
    console.error(`[WP-API] Error fetching post ${id}:`, error);
    return null;
  }
}

/**
 * Helper to format date for display
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

/**
 * Extracts the first image URL from HTML content
 */
function extractImage(html: string): string | undefined {
  if (!html) return undefined;
  
  // Look for <img src="..."> tags
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = html.match(imgRegex);
  
  return match ? match[1] : undefined;
}
