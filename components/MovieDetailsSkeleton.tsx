export function MovieDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="bg-gray-300 w-full md:w-80 aspect-[2/3] rounded-lg" />
        <div className="flex-1 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4" />
          <div className="h-4 bg-gray-300 rounded w-1/2" />
          <div className="flex gap-2">
            <div className="h-6 bg-gray-300 rounded w-20" />
            <div className="h-6 bg-gray-300 rounded w-20" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-300 rounded w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}

