import { MovieDetails, MoviesResponse } from "@/types/tmdb";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

let configCache: any = null;

export async function getConfiguration() {
  if (configCache) return configCache;
  
  const res = await fetch(`${API_BASE}/api/configuration`, {
    next: { revalidate: 86400 }
  });

  if (!res.ok) throw new Error('Failed to fetch configuration');
  configCache = await res.json();
  return configCache;
}

export async function fetchMovies(
  query: string,
  page: number = 1,
  includeAdult: boolean = false
): Promise<MoviesResponse> {
  const params = new URLSearchParams({
    query,
    page: page.toString(),
    include_adult: includeAdult.toString(),
  });

  const res = await fetch(`${API_BASE}/api/movies/search?${params}`, {
    next: { revalidate: 1800 }
  });

  if (res.status === 429) throw new Error('Too many requests. Please try again in a few moments');

  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}


export async function fetchMovieDetails(id: string): Promise<MovieDetails> {
  const res = await fetch(`${API_BASE}/api/movies/${id}`, {
    next: { revalidate: 1800 }
  });

  if (res.status === 404) throw new Error('NOT_FOUND');
  if (res.status === 429) throw new Error('Too many requests. Please try again in a few moments');
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return res.json();
}

export async function getImageUrl(
  path: string | null,
  type: 'poster' | 'backdrop' | 'profile' = 'poster',
  size?: string
): Promise<string | null> {
  if (!path) return null;
  
  try {
    const config = await getConfiguration();
    const baseUrl = config.images.secure_base_url;
    
    let imageSize = size;
    if (!imageSize) {
      // Default sizes
      if (type === 'poster') imageSize = 'w500';
      else if (type === 'backdrop') imageSize = 'w1280';
      else if (type === 'profile') imageSize = 'w185';
    }
    
    return `${baseUrl}${imageSize}${path}`;
  } catch (error) {
    // Fallback to direct URL if config fails
    const sizeMap = {
      poster: 'w500',
      backdrop: 'w1280',
      profile: 'w185',
    };
    return `https://image.tmdb.org/t/p/${size || sizeMap[type]}${path}`;
  }
}