"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fff5f5] to-[#fee2e2] px-6 text-center">
      <div className="max-w-md">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Something went wrong
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or return to the home
          page.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#03A1AC] text-white font-medium rounded-xl hover:bg-[#028a94] transition-colors duration-200"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
