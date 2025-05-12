import Link from "next/link";
import Image from "next/image";
import SearchSection from "@/components/searchSection";

/**
 * Search Page Server Component
 */
export default function DetailsDisplay() {
  return (
    <div className="mx-auto md:mx-8 p-4">
      {/* Return to home button (home page data is refreshed) */}
      <div className="backButton mb-6">
        <Link
          href="/"
          className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 md:px-4 py-2 rounded-lg font-medium text-lg transition-colors gap-2"
        >
          <Image src="/back.svg" alt="B" width={30} height={30} />
          <span className="hidden md:inline">Back</span>
        </Link>
      </div>
      {/*page title */}
      <h1 className="searchTitle text-2xl font-bold mb-6">
        Type Team Name to get your results....
      </h1>
      {/* Search input and result display area */}
      <div>
        <SearchSection />
      </div>
    </div>
  );
}
