import { NextResponse } from 'next/server';
import { scrapeUpdates } from '@/lib/scrapeUpdates';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');

    const result = await scrapeUpdates(page);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in blog API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
