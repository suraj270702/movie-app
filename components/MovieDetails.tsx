import { fetchMovieDetails } from "@/lib/api";
import { MovieBackdrop } from "./MovieBackDrop";
import { MoviePoster } from "./MoviePoster";
import { MovieInfo } from "./MovieInfo";
import { MovieCast } from "./MovieCast";
import { MovieTrailer } from "./MovieTrailer";
import { notFound } from "next/navigation";

export async function MovieDetails({ id }: { id: string }) {
  try {
    const movie = await fetchMovieDetails(id);
    
    // Find YouTube trailer
    const trailer = movie.videos.find(
      (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser') && v.official
    ) || movie.videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer');

    return (
      <div>
        <MovieBackdrop
          backdropPath={movie.backdrop_path} 
          title={movie.title} 
        />

        <div className="flex flex-col md:flex-row gap-8">
          <MoviePoster
            posterPath={movie.poster_path} 
            title={movie.title} 
          />
          
          <MovieInfo movie={movie} />
        </div>

        <MovieCast cast={movie.cast} />

        {trailer && <MovieTrailer trailer={trailer} />}
      </div>
    );
  } catch (error: any) {
    
    if (error.message === 'NOT_FOUND') {
      notFound();
    }
    throw error;
  }
}