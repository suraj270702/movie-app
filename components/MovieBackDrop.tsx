import { getImageUrl } from "@/lib/api";
import { MovieBackdropProps } from "@/types/movies";
import Image from "next/image";

export async function MovieBackdrop({ backdropPath, title }: MovieBackdropProps) {
  const backdropUrl = await getImageUrl(backdropPath, 'backdrop', 'w1280');
  
  if (!backdropUrl) return null;

  return (
    <div className="relative w-full h-[400px] mb-8">
      <Image
        src={backdropUrl}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
    </div>
  );
}