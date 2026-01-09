"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function AdultContentToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [includeAdult, setIncludeAdult] = useState(
    searchParams.get('include_adult') === 'true'
  );

  const handleToggle = () => {
    const newValue = !includeAdult;
    setIncludeAdult(newValue);

    const params = new URLSearchParams(searchParams.toString());
    if (newValue) {
      params.set('include_adult', 'true');
    } else {
      params.delete('include_adult');
    }
    
    router.push(`/movie/search?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            checked={includeAdult}
            onChange={handleToggle}
            className="sr-only"
          />
          <div
            className={`block w-14 h-8 rounded-full transition-colors ${
              includeAdult ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
              includeAdult ? 'transform translate-x-6' : ''
            }`}
          ></div>
        </div>
        <span className="ml-3 text-gray-700 font-medium">Include Adult Content</span>
      </label>
    </div>
  );
}