// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { parse } from "csv-parse/sync";

/**
 * POST /api/upload
 *
 * Receive each new CSV file upload and process them into an array of objects to update the MongoDB database.
 */

export async function POST(request: NextRequest) {
  try {
    // Receive files
    const formData = await request.formData();
    const file = formData.get("file") as File;

    // Error handling
    if (!file) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }

    console.log("Received file:", file.name);

    // Read the contents of the file
    const text = await file.text();

    // Parsing CSV with csv-parse
    const records = parse(text, {
      columns: true, // Use the first row as the column name
      skip_empty_lines: true,
      trim: true,
    });

    console.log(`Parsed ${records.length} records`);

    // connect MongoDB
    const client = await clientPromise;
    const db = client.db("fixtures_db");
    const collection = db.collection("matches");

    // Empty the previous upload data
    await collection.deleteMany({});
    console.log("Cleared old data");

    // Insert new data for this upload
    if (records.length > 0) {
      const result = await collection.insertMany(records);
      console.log(`Inserted ${result.insertedCount} records`);
    }

    // Return results, update file upload status
    return NextResponse.json({
      success: true,
      message: `Successfully imported ${records.length} fixtures`,
      filename: file.name,
      count: records.length,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error:
          "Upload failed: " +
          (error instanceof Error ? error.message : "Unknown error"),
      },
      { status: 500 }
    );
  }
}
