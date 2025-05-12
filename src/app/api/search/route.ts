import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

/**
 * GET /api/search
 *
 * Fuzzy matches user-entered keywords against home_team or away_team in the matches collection of the fixtures_db database.
 * Returns up to 20 matches at a time to the front-end.
 */

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");

    // If there is no query word, return an empty array
    if (!query || query.trim() === "") {
      return NextResponse.json([]);
    }

    // connect MongoDB
    const client = await clientPromise;
    const db = client.db("fixtures_db");
    const collection = db.collection("matches");

    // Fuzzy query for home or away team counterparts that contain the string
    const results = await collection
      .find({
        $or: [
          { home_team: { $regex: query, $options: "i" } },
          { away_team: { $regex: query, $options: "i" } },
        ],
      })
      .limit(20) // Limit returns to 20 results
      .toArray();

    console.log(`Search "${query}" found ${results.length} results`);

    // json return
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
