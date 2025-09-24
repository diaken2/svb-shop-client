import React from "react";

const Spinner = () => (
  <div className="flex items-center justify-center py-8">
    <svg
      className="animate-spin h-8 w-8 text-blue-600"
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Загрузка..."
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  </div>
);

export default Spinner;
