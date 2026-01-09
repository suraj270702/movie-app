import Link from 'next/link';
import { Movie } from '@/types/tmdb';
import { getImageUrl } from '@/lib/api';
import Image from 'next/image';

export async function MovieCard({ movie }: { movie: Movie }) {
  const posterUrl = await getImageUrl(movie.poster_path, 'poster');
  
  return (
    <Link href={`/movie/${movie.id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {posterUrl ? (
          <div className="relative w-full aspect-[2/3]">
            <Image
              src={posterUrl}
              alt={movie.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          </div>
        ) : (
          <div className="w-full aspect-[2/3] bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{movie.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{movie.release_date}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}