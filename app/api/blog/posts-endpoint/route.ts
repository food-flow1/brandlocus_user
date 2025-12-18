import { NextResponse } from 'next/server';
import { scrapeUpdates, scrapePost } from '@/lib/scrapeUpdates';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const page = parseInt(searchParams.get('page') || '1');
    const size = parseInt(searchParams.get('size') || '9');

    if (id) {
      const post = await scrapePost(id);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    const result = await scrapeUpdates(page, size);
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Error in PostsEndpoint proxy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from WordPress API' },
      { status: 500 }
    );
  }
}
