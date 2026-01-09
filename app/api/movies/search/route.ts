import { TMDB_API_KEY, TMDB_BASE_URL } from '@/config/tmdb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const page = searchParams.get('page') || '1';
    const include_adult = searchParams.get('include_adult') || 'false';
    // console.log("include_adult",include_adult)
    // console.log("query",query)

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    const params = new URLSearchParams({
      api_key: TMDB_API_KEY!,
      query,
      page,
      include_adult,
    });

    const res = await fetch(`${TMDB_BASE_URL}/search/movie?${params}`, {
      next: { revalidate: 1200 },
    });

    if (res.status === 429) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again in a few moments.",
        },
        { status: 429 }
      );
    }


    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch movies' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}