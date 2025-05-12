"use client";

import { useEffect } from "react";
/**
 * DataCleaner client component
 * calls the database clear API
 */
export default function DataCleaner() {
  useEffect(() => {
    // Empty database when page loads
    const clearData = async () => {
      try {
        const response = await fetch("/api/clear", {
          method: "POST",
        });
        const result = await response.json();
        console.log("Database cleared:", result.message);
      } catch (error) {
        console.error("Error clearing database:", error);
      }
    };

    clearData();
  }, []);

  return null;
}
