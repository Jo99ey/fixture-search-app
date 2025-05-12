"use client";

import { useState } from "react";
import Image from "next/image";
/**
 * FileUpload client component
 * Handles file uploads and updates the upload status and triggers the upload api.
 */
export default function FileUpload() {
  // Initial text and background color of the status bar
  const [statusText, setStatusText] = useState("No uploaded file");
  const [bgColor, setBgColor] = useState("bg-slate-300");

  /**
   * Handling file selection events
   */
  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Verify the file type
    const name = file.name.toLowerCase();
    if (!name.endsWith(".csv")) {
      // Reset status if not a CSV file.
      setStatusText("No uploaded file");
      setBgColor("bg-slate-300");
      return;
    }

    // Starting upload status
    setStatusText("uploading");
    setBgColor("bg-sky-400");

    try {
      // Wrapping files
      const formData = new FormData();
      formData.append("file", file);

      // Call the upload api
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      // Successful upload status
      setStatusText(file.name);
      setBgColor("bg-teal-400");
    } catch {
      // Failed to upload - return to initial state
      setStatusText("No uploaded file");
      setBgColor("bg-slate-300");
    }
  };

  return (
    <div className="inline-grid lg:max-w-[200px]">
      {/* Top upload file status update bar */}
      <div
        className={`${bgColor} px-6 py-2 rounded-t-lg text-center text-sm transition-all duration-300`}
      >
        <span className="text-gray-800">{statusText}</span>
      </div>

      {/* Bottom upload button */}
      {/* Underlying button functionality, uses input to upload files and only accepts csv */}
      <input
        type="file"
        className="hidden" // Hide it until you hit upload
        id="csv-upload"
        accept=".csv"
        onChange={handleFileSelect}
      />

      {/* button outer style */}
      <label
        htmlFor="csv-upload"
        className="cursor-pointer inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-b-lg font-bold text-2xl sm:text-3xl whitespace-nowrap"
      >
        <Image
          className="dark:invert"
          src="/upload.svg"
          alt=""
          width={20}
          height={20}
        />
        UPLOAD
      </label>
    </div>
  );
}
