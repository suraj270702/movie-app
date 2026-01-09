import { fetchMovies } from "@/lib/api";
import { MovieGrid } from "./MovieGrid";
import { Pagination } from "./Pagination";
import { MovieSearchResults } from "@/types/movies";

async function SearchResults({ query, page,adult_content }: MovieSearchResults) {
  try {
    const data = await fetchMovies(query, page,adult_content==="true" ? true : false);
    
    return (
      <div>
        <MovieGrid movies={data.results} />
        {/* Pagination inside - it will show/hide with loading state */}
        <Pagination currentPage={page} maxPage={data.total_pages} />
      </div>
    );
  } catch (error) {
    throw error
  }
}

export default SearchResults