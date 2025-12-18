/**
 * TypeScript type definitions for WordPress content scraping
 */

export interface WordPressUpdate {
  /** Post ID */
  id?: string;

  /** Post title */
  title: string;
  
  /** Post slug (derived from URL) */
  slug: string;

  /** Absolute URL to the full post */
  link: string;
  
  /** Post excerpt/summary */
  excerpt: string;
  
  /** Publish date in ISO format (if available) */
  publishDate?: string;
  
  /** Formatted date string for display */
  dateDisplay?: string;

  /** Featured image URL */
  image?: string;

  /** Full HTML content (for detail view) */
  content?: string;

  /** Post category */
  category?: string;
}

export interface ScrapedUpdatesResult {
  /** Array of scraped updates */
  updates: WordPressUpdate[];
  
  /** Current page number */
  currentPage: number;
  
  /** Whether there are more pages available */
  hasNextPage: boolean;
  
  /** Whether there is a previous page */
  hasPreviousPage: boolean;
  
  /** Total number of updates on current page */
  totalOnPage: number;
  
  /** Error message if scraping failed */
  error?: string;
}
