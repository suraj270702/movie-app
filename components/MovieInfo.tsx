import { MovieInfoProps } from "@/types/movies";

export function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <div className="flex-1">
      <h1 className="text-4xl font-bold">{movie.title}</h1>
      {movie.tagline && (
        <p className="text-gray-600 italic mt-2">"{movie.tagline}"</p>
      )}
      
      <div className="flex items-center gap-4 mt-4 flex-wrap">
        <span className="text-yellow-500 text-xl">⭐ {movie.vote_average.toFixed(1)}</span>
        <span className="text-gray-600">{movie.release_date}</span>
        <span className="text-gray-600">{movie.runtime} min</span>
        <span className="px-3 py-1 bg-gray-200 rounded text-sm">{movie.status}</span>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {movie.genres.map((genre) => (
          <span 
            key={genre.id} 
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {genre.name}
          </span>
        ))}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
      </div>

      <div className="mt-6 space-y-2">
        {movie.budget > 0 && (
          <p><span className="font-semibold">Budget:</span> ${movie.budget.toLocaleString()}</p>
        )}
        {movie.revenue > 0 && (
          <p><span className="font-semibold">Revenue:</span> ${movie.revenue.toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}