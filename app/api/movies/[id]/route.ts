import { TMDB_API_KEY, TMDB_BASE_URL } from '@/config/tmdb';
import { CommonParams } from '@/types/movies';
import { NextRequest, NextResponse } from 'next/server';

const handleRateLimit = (...responses: Response[]) => {
  return responses.some((res) => res.status === 429);
};


export async function GET(
  request: NextRequest,
  { params }: CommonParams
) {
  try {
    const {id} = await params
    
    const [movieRes, creditsRes, videosRes] = await Promise.all([
      fetch(
        `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`,
        { next: { revalidate: 1200 } }
      ),
      fetch(
        `${TMDB_BASE_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}`,
        { next: { revalidate: 1200 } }
      ),
      fetch(
        `${TMDB_BASE_URL}/movie/${id}/videos?api_key=${TMDB_API_KEY}`,
        { next: { revalidate: 1200 } }
      ),
    ]);

    if (handleRateLimit(movieRes, creditsRes, videosRes)) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again in a few moments.",
        },
        { status: 429 }
      );
    }


    if (!movieRes.ok) {
      if (movieRes.status === 404) {
        return NextResponse.json(
          { error: 'Movie not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch movie' },
        { status: movieRes.status }
      );
    }

    const [movie, credits, videos] = await Promise.all([
      movieRes.json(),
      creditsRes.json(),
      videosRes.json(),
    ]);

    
    const data = {
      ...movie,
      cast: credits.cast?.slice(0, 10) || [],
      crew: credits.crew || [],
      videos: videos.results || [],
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}