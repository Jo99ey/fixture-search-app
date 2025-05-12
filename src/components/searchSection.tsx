"use client";

import { useState, useEffect } from "react";

/**
 * Fixture database
 * Data type definition
 */
interface Fixture {
  _id: string;
  fixture_mid: string;
  season: string;
  competition_name: string;
  fixture_datetime: string;
  fixture_round: string;
  home_team: string;
  away_team: string;
}

/**
 * SearchSection client component
 * Realizing real-time fuzzy search as users enter team names
 */
export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState<Fixture | null>(null);

  // Real-time search with anti-shake settings enabled to avoid too frequent requests
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm.trim()) {
        performSearch();
      } else {
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  /**
   * Call the backend search api and update the results list
   */
  const performSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Format date ISO time string to Australian local time
   */
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-AU");
  };

  return (
    <>
      {/* Search input box */}
      <div className="searchBar mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-[80%] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Loading message */}
      {loading && <p className="text-gray-600 mb-4">Searching...</p>}

      {/* Result card display */}
      <div className="searchDisplay grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((fixture) => (
          <div
            key={fixture._id}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => setSelectedFixture(fixture)}
          >
            <div className="font-bold text-lg mb-2">
              {fixture.home_team} vs {fixture.away_team}
            </div>
            <div className="text-sm text-gray-600">
              <p>{fixture.competition_name}</p>
              <p>Round {fixture.fixture_round}</p>
              <p>{formatDate(fixture.fixture_datetime)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up window to expand large card details */}
      {selectedFixture && (
        <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Fixture Details</h2>
            <div className="space-y-2">
              <p>
                <strong>Match ID:</strong> {selectedFixture.fixture_mid}
              </p>
              <p>
                <strong>Season:</strong> {selectedFixture.season}
              </p>
              <p>
                <strong>Competition:</strong> {selectedFixture.competition_name}
              </p>
              <p>
                <strong>Round:</strong> {selectedFixture.fixture_round}
              </p>
              <p>
                <strong>Date/Time:</strong>{" "}
                {formatDate(selectedFixture.fixture_datetime)}
              </p>
              <p>
                <strong>Home Team:</strong> {selectedFixture.home_team}
              </p>
              <p>
                <strong>Away Team:</strong> {selectedFixture.away_team}
              </p>
            </div>
            <button
              onClick={() => setSelectedFixture(null)}
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
