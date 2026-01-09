import { CastMember, MovieDetails } from "./tmdb";

export interface CommonParams {
  params: Promise<{
    id: string;
  }>;
}

export interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    include_adult?: string;
  }>;
}

export interface MovieBackdropProps {
  backdropPath: string | null;
  title: string;
}

export interface MovieCastProps {
  cast: CastMember[] | undefined;
}

export interface CastCardProps {
  person: CastMember;
}

export interface MoviePosterProps {
  posterPath: string | null;
  title: string;
}

export interface MovieSearchResults {
  query: string;
  page: number;
  adult_content: string;
}

export interface Video {
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface MovieTrailerProps {
  trailer: Video;
}

export interface PaginationProps {
  currentPage: number;
  maxPage: number;
}

export interface MovieInfoProps {
  movie: MovieDetails;
}