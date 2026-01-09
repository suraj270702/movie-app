import { Suspense } from "react";
import { MovieDetailsSkeleton } from "@/components/MovieDetailsSkeleton";
import { MovieDetails } from "@/components/MovieDetails";
import { CommonParams } from "@/types/movies";
import { Metadata } from "next";
import { fetchMovieDetails } from "@/lib/api";

export async function generateMetadata({ params }: CommonParams): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const movie = await fetchMovieDetails(resolvedParams.id);
    
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
    const rating = movie.vote_average ? ` | Rating: ${movie.vote_average.toFixed(1)}/10` : '';
    
    return {
      title: `${movie.title}${year ? ` (${year})` : ''}${rating}`,
      description: movie.overview || `Watch ${movie.title}${movie.tagline ? ` - ${movie.tagline}` : ''}. Explore cast, ratings, and more details about this movie.`,
    };
  } catch (error) {
    return {
      title: 'Movie Not Found',
      description: 'The requested movie could not be found.',
    };
  }
}

export default async function MoviePage({ params }: CommonParams) {
  const resolvedParams = await params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<MovieDetailsSkeleton />}>
        <MovieDetails id={resolvedParams.id} />
      </Suspense>
    </div>
  );
}