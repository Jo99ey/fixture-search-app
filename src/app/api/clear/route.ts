import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

/**
 * POST /api/clear
 * Clears all data from matches in the fixtures_db database.
 */

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db("fixtures_db");
    const collection = db.collection("matches");

    // Empty the collection
    const result = await collection.deleteMany({});

    // Return the amount of deleted data to the front end
    return NextResponse.json({
      success: true,
      message: `Cleared ${result.deletedCount} documents`,
    });
  } catch (error) {
    console.error("Clear error:", error);
    return NextResponse.json(
      { error: "Failed to clear data" },
      { status: 500 }
    );
  }
}
