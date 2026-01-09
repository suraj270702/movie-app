'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, useTransition } from 'react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const debouncedQuery = useDebounce(query, 500);
  const [isPending, startTransition] = useTransition();
  const previousQueryRef = useRef(searchParams.get('q') || '');
  const isInitialMount = useRef(true);

  useEffect(() => {
    const trimmedQuery = debouncedQuery.trim();
    const currentQuery = searchParams.get('q') || '';
    
    
    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousQueryRef.current = currentQuery;
      return;
    }

    if (trimmedQuery === previousQueryRef.current) {
      return;
    }

    if (trimmedQuery.length >= 2) {
      previousQueryRef.current = trimmedQuery;
      startTransition(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('q', trimmedQuery);
        
        if (trimmedQuery !== currentQuery) {
          params.set('page', '1');
        }
        router.push(`/movie/search?${params.toString()}`);
      });
    } else if (trimmedQuery.length === 0 && searchParams.get('q')) {
      previousQueryRef.current = '';
      startTransition(() => {
        router.push('/movie/search');
      });
    }
  }, [debouncedQuery, router, searchParams]);

  return (
    <div className="mb-8 w-full relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies (min 2 characters)..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isPending && query.length >= 2 && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
          Searching...
        </span>
      )}
      {query.length > 0 && query.length < 2 && (
        <p className="text-sm text-gray-500 mt-1">
          Type at least 2 characters to search
        </p>
      )}
    </div>
  );
}