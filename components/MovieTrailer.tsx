import { MovieTrailerProps } from "@/types/movies";


export function MovieTrailer({ trailer }: MovieTrailerProps) {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
      <div className="aspect-video max-w-4xl">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title={trailer.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg"
        />
      </div>
    </div>
  );
}