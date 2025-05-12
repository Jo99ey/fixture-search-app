import Image from "next/image";
import Link from "next/link";
import FileUpload from "@/components/fileUpload";
import DataCleaner from "@/components/dataCleaner";

/**
 * Home Page Server Component
 */

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Clean up the database fixtures_db.matches collection every time the homepage is loaded 
      (including homepage refreshes and returning to the homepage from the search page) */}
      <DataCleaner />
      <main className="row-start-2 w-full max-w-5xl">
        <div className="flex flex-col lg:flex-row lg:items-end gap-3 text-xl lg:text-2xl font-medium">
          {/* File upload button and function */}
          <FileUpload />

          <span className="text-gray-500 whitespace-nowrap">a CSV file</span>

          <span className="bg-gray-200 text-gray-900 px-3 py-1 rounded-full font-bold whitespace-nowrap">
            THEN
          </span>
          {/* Search Jump to New Page button */}
          <Link
            href="/detailsDisplay"
            target="_blank"
            className="inline-flex items-center bg-gray-900 text-white px-4 py-2 rounded-lg font-bold text-2xl sm:text-3xl whitespace-nowrap gap-2"
          >
            <Image
              src="/search.svg"
              alt=""
              width={30}
              height={30}
              className="brightness-0 invert"
            />
            Search
          </Link>

          <span className="text-gray-500 whitespace-nowrap">
            for match fixtures easily
          </span>
        </div>

        {/* Developer information */}
        <div className=" text-gray-600 items-center bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full text-sm mt-15 w-full lg:max-w-[55%]">
          © Developed by
          <a
            href="https://www.linkedin.com/in/joey-zhuyun-chen/"
            target="_blank"
            rel="noopener noreferrer"
            className=" black font-bold hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Joey
          </a>
        </div>
      </main>
    </div>
  );
}
