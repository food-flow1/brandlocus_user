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

import * as cheerio from 'cheerio';
import { WordPressUpdate, ScrapedUpdatesResult } from '@/types/wordpress';

const BASE_URL = 'https://brandlocusgroup.com';
const UPDATES_PATH = '/updates';

/**
 * Scrapes blog updates from WordPress site
 * 
 * @param page - Page number (1-based indexing)
 * @returns Scraped updates with pagination info
 */
export async function scrapeUpdates(page: number = 1): Promise<ScrapedUpdatesResult> {
  try {
    // Construct URL with pagination
    const url = page === 1 
      ? `${BASE_URL}${UPDATES_PATH}/`
      : `${BASE_URL}${UPDATES_PATH}/page/${page}/`;

    console.log(`[Scraper] Fetching: ${url}`);

    // Fetch HTML with timeout and caching
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url, {
      signal: controller.signal,
      next: { 
        revalidate: 3600 // ISR: Cache for 1 hour
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BrandLocusBot/1.0)',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    
    // Parse HTML with Cheerio
    const $ = cheerio.load(html);
    const updates: WordPressUpdate[] = [];

    // WordPress typically uses article tags or specific post classes
    // Adjust selectors based on actual HTML structure
    const articleSelectors = [
      'article',
      '.post',
      '.hentry',
      '.entry',
      '[class*="post-"]'
    ];

    let $articles = $('article');
    
    // Fallback to other selectors if no articles found
    if ($articles.length === 0) {
      for (const selector of articleSelectors) {
        $articles = $(selector) as any;
        if ($articles.length > 0) break;
      }
    }

    console.log(`[Scraper] Found ${$articles.length} articles`);

    $articles.each((index, element) => {
      const $article = $(element);
      
      // Extract title - try multiple selectors
      const $titleLink = $article.find('h2 a, h1 a, .entry-title a, .post-title a').first();
      const title = $titleLink.text().trim() || 
                   $article.find('h2, h1, .entry-title, .post-title').first().text().trim() ||
                   'Untitled Post';
      
      // Extract link
      let link = $titleLink.attr('href') || '';
      
      // Convert relative URLs to absolute
      if (link && !link.startsWith('http')) {
        link = link.startsWith('/') ? `${BASE_URL}${link}` : `${BASE_URL}/${link}`;
      }
      
      // Skip if no valid link
      if (!link) {
        console.warn(`[Scraper] Skipping article without link: ${title}`);
        return;
      }

      // Extract slug from URL
      // Remove trailing slash and get last segment
      const urlParts = link.replace(/\/$/, '').split('/');
      const slug = urlParts[urlParts.length - 1];

      // Extract excerpt
      const excerpt = $article.find('.entry-summary, .excerpt, .post-excerpt, p').first().text().trim() ||
                     $article.find('p').first().text().trim() ||
                     '';

      // Extract publish date
      const $dateElement = $article.find('time, .published, .entry-date, .post-date').first();
      const publishDate = $dateElement.attr('datetime') || '';
      const dateDisplay = $dateElement.text().trim() || '';

      // Extract Featured Image
      // Try multiple selectors for featured image
      let image = $article.find('.post-thumbnail img, .wp-post-image, .entry-image img, img').first().attr('src') || '';
      
      // Check for srcset if src is a tiny placeholder or base64
      const srcset = $article.find('.post-thumbnail img, .wp-post-image').first().attr('srcset');
      if (srcset) {
        // Get the largest image from srcset
        const sources = srcset.split(',').map(s => s.trim().split(' '));
        if (sources.length > 0) {
          image = sources[sources.length - 1][0]; // Usually the last one is largest
        }
      }
      
      // Extract Category
      const category = $article.find('.cat-links a, .post-categories a, .category').first().text().trim() || 'Insights';

      updates.push({
        title,
        slug,
        link,
        excerpt: excerpt.substring(0, 300),
        publishDate: publishDate || undefined,
        dateDisplay: dateDisplay || undefined,
        image: image || undefined,
        category
      });
    });

    // Detect pagination
    const $pagination = $('.pagination, .nav-links, .wp-pagenavi');
    const $nextLink = $pagination.find('a.next, a[rel="next"], .next a').first();
    const $prevLink = $pagination.find('a.prev, a[rel="prev"], .prev a').first();
    
    // Limit to 9 posts per page
    const limitedUpdates = updates.slice(0, 9);
    
    // Alternative: check for numbered page links
    const hasNextPage = $nextLink.length > 0 || 
                       $pagination.find(`a:contains("${page + 1}")`).length > 0 ||
                       updates.length > 9; // Has more if we found more than 9

    const hasPreviousPage = page > 1;

    console.log(`[Scraper] Extracted ${limitedUpdates.length} updates from page ${page}`);

    return {
      updates: limitedUpdates,
      currentPage: page,
      hasNextPage,
      hasPreviousPage,
      totalOnPage: limitedUpdates.length,
    };

  } catch (error) {
    console.error('[Scraper] Error:', error);
    
    // Return graceful fallback
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
 * Scrapes a single blog post by slug
 * 
 * @param slug - The URL slug of the post
 * @returns WordPressUpdate object with full content
 */
export async function scrapePost(slug: string): Promise<WordPressUpdate | null> {
  try {
    // Try to find the post URL. Since we don't know the exact date structure often used in WP URLs (YYYY/MM/DD/slug),
    // we first try the most common structures or search for it.
    // However, for simplicity and robustness without search, we'll try to find the post from the main updates page first
    // to get the correct link, OR (better) assume a standard structure if possible.
    
    // Strategy: Fetch the updates pages until we find the slug, OR try to construct URL.
    // Since traversing pages is slow, let's try to construct URL. 
    // BUT Brand Locus URLs are like brandlocusgroup.com/YYYY/MM/DD/slug/
    // We can't guess the date. 
    
    // OPTIMIZED STRATEGY:
    // 1. We should ideally pass the FULL link, but the route is /blog/[slug].
    // 2. We will pass the full URL as a base64 encoded param OR just find it.
    // 3. For this implementation, let's fetch the first few pages of updates to find the link matching the slug.
    // This is valid because we only show recent posts mostly.
    
    // NOTE: In a real app with 1000s of posts, we'd need a search endpoint or pass the date in the URL structure.
    // Let's iterate page 1 and 2 to find the link.
    
    let link = '';
    let foundPost: WordPressUpdate | undefined;
    
    // Scan first 3 pages (covers ~30 posts)
    for (let i = 1; i <= 3; i++) {
        const result = await scrapeUpdates(i);
        foundPost = result.updates.find(p => p.slug === slug);
        if (foundPost) {
            link = foundPost.link;
            break;
        }
        if (!result.hasNextPage) break;
    }
    
    if (!link || !foundPost) {
        console.error(`[Scraper] Detail: Could not find post with slug ${slug}`);
        return null;
    }

    console.log(`[Scraper] Fetching detail: ${link}`);

    const response = await fetch(link, {
        next: { revalidate: 3600 },
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BrandLocusBot/1.0)' }
    });

    if (!response.ok) return null;

    const html = await response.text();
    const $ = cheerio.load(html);
    const $article = $('article').first().length ? $('article').first() : $('body');

    // Extract Full Content
    // Remove unwanted elements
    $article.find('.sharedaddy, .related-posts, #respond, .post-navigation, .entry-meta').remove();
    
    // Get content - try multiple selectors
    const contentSelectors = [
        '.entry-content',
        '.post-content',
        '.page-content',
        '.elementor-widget-theme-post-content',
        'div[data-widget_type="theme-post-content.default"]',
        '.elementor-location-single',
        'article' // Last resort: take the whole article
    ];

    let $content;
    for (const selector of contentSelectors) {
        $content = $article.find(selector);
        if ($content.length > 0) break;
    }

    if (!$content || $content.length === 0) {
        // Fallback to search
        const excerptText = foundPost.excerpt.substring(0, 50);
        const textNode = $article.find(`:contains("${excerptText}")`).first();
        if (textNode.length) {
             const closestDiv = textNode.closest('div');
             $content = closestDiv.parent().length ? closestDiv.parent() : closestDiv;
        } else {
             // Absolute fallback to article if nothing else found
             $content = $article;
        }
    }

    // specific cleanup for Elementor
    if ($content) {
        $content.find('.elementor-section-wrap .elementor-element-populate').each((i, el) => {
           // No-op loop for now, just ensuring selector validity
        });
        
        // Strip inline styles to prevent color conflicts
        $content.find('*').removeAttr('style');
        
        // Remove style, script, and link tags that might be embedded
        $content.find('style, script, link, meta').remove();
        
        // Remove styling classes (optional, but safer to rely on our prose)
        $content.find('*').removeAttr('class');

        // Remove empty paragraphs
        $content.find('p').filter((i, el) => $(el).text().trim() === '').remove();
    }

    const content = $content ? $content.html() || '' : '';
    
    // Get larger image
    let image = foundPost.image;
    // Try to find a high-res image in the detail page
    const detailImage = $('.wp-post-image').attr('src') || $('.entry-content img').first().attr('src');
    if (detailImage) image = detailImage;

    return {
        ...foundPost,
        content,
        image
    };

  } catch (error) {
    console.error(`[Scraper] Error fetching detail for ${slug}:`, error);
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
