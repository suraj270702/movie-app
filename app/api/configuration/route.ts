import { TMDB_API_KEY, TMDB_BASE_URL } from "@/config/tmdb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `${TMDB_BASE_URL}/configuration?api_key=${TMDB_API_KEY}`,
      {
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch configuration" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
