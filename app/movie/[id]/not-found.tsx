import Link from "next/link"; 

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
      <p className="text-gray-600 mb-8">
        The movie you're looking for doesn't exist or has been removed.
      </p>
      
    </div>
  );
}
