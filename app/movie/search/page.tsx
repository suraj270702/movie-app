import { Suspense } from "react";
import { MovieGridSkeleton } from "@/components/MovieGridSkeleton";
import { SearchBar } from "@/components/SearchBar";
import { AdultContentToggle } from "@/components/ToggleButton";
import SearchResults from "@/components/MovieSearchResults";
import { SearchPageProps } from "@/types/movies";

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;

  const query = resolvedSearchParams.q || "";
  const page = parseInt(resolvedSearchParams.page || "1");
  const adult_content = resolvedSearchParams?.include_adult || "false";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Movies</h1>
      <div className="flex items-center gap-5">
        <SearchBar />
        <AdultContentToggle />
      </div>

      {query ? (
        <>
          <p className="text-gray-600 mb-6">Results for "{query}"</p>
          <Suspense key={`${query}-${page}-${adult_content}`} fallback={<MovieGridSkeleton />}>
            <SearchResults
              query={query}
              page={page}
              adult_content={adult_content}
            />
          </Suspense>
        </>
      ) : (
        <p className="text-gray-500 text-center py-12">
          Enter a search term to find movies
        </p>
      )}
    </div>
  );
}
