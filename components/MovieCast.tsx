import { CastMember } from "@/types/tmdb";
import { CastCard } from "./MovieCastCard";
import { MovieCastProps } from "@/types/movies";


export function MovieCast({ cast }: MovieCastProps) {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Top Cast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {cast.slice(0, 5).map((person) => (
          <CastCard key={person.id} person={person} />
        ))}
      </div>
    </div>
  );
}