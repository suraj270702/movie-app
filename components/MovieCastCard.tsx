import { getImageUrl } from "@/lib/api";
import { CastCardProps } from "@/types/movies";
import { CastMember } from "@/types/tmdb";
import Image from "next/image";


export async function CastCard({ person }: CastCardProps) {
  const profileUrl = await getImageUrl(person.profile_path, 'profile', 'w185');
  
  return (
    <div className="text-center">
      {profileUrl ? (
        <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden mb-2">
          <Image
            src={profileUrl}
            alt={person.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 20vw, 16vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
          <span className="text-gray-400 text-4xl">👤</span>
        </div>
      )}
      <p className="font-semibold text-sm">{person.name}</p>
      <p className="text-xs text-gray-600">{person.character}</p>
    </div>
  );
}