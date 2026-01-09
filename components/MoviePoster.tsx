import { getImageUrl } from "@/lib/api";
import { MoviePosterProps } from "@/types/movies";
import Image from "next/image";

export async function MoviePoster({ posterPath, title }: MoviePosterProps) {
  const posterUrl = await getImageUrl(posterPath, 'poster', 'w500');
  
  if (!posterUrl) return null;

  return (
    <div className="relative w-full md:w-80 aspect-[2/3] md:aspect-auto md:h-[480px] rounded-lg shadow-lg md:-mt-32 z-10 overflow-hidden">
      <Image
        src={posterUrl}
        alt={title}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 320px"
        className="object-cover"
      />
    </div>
  );
}