"use client";
import React from "react";
import AvitoLink from "@/components/ui/AvitoLink";

const screenshots = [
  "https://i.ibb.co/mCLj0CjV/photo-2025-07-19-00-45-23-3.jpg",
  "https://i.ibb.co/zWVYLmhW/photo-2025-07-19-00-45-23-2.jpg",
  "https://i.ibb.co/sdNBjgVH/photo-2025-07-19-00-45-23.jpg",
];

export default function AvitoScreenshots() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Отзывы в оригинале (
        <AvitoLink
          href="https://www.avito.ru/brands/i118581600?src=sharing"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Avito
        </AvitoLink>
        )
      </h2>
      {/* Mobile horizontal scroll */}
      <div className="md:hidden flex gap-4 overflow-x-auto snap-x">
        {screenshots.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Скриншот отзыва ${i + 1}`}
            className="w-72 h-[700px] object-cover rounded-lg shadow-md snap-center flex-shrink-0 overflow-hidden"
          />
        ))}
      </div>
      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {screenshots.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Скриншот отзыва ${i + 1}`}
            className="w-full h-[700px] object-cover rounded-lg shadow-md overflow-hidden"
          />
        ))}
      </div>
    </section>
  );
} 