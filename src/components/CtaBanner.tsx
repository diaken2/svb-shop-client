"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CtaBannerProps {
  modelsCount?: number; // количество товаров, по умолчанию 6
  className?: string;
}

export default function CtaBanner({ modelsCount = 6, className = "" }: CtaBannerProps) {
  return (
    <section
      className={`flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-6 md:p-4 rounded-xl shadow-lg md:shadow-none bg-gradient-to-r from-blue-600 to-blue-500 md:bg-blue-600/10 text-white md:text-blue-900 ${className}`}
    >
      <div>
        <h3 className="text-xl md:text-lg font-semibold md:font-medium leading-tight">
          {modelsCount}&nbsp;моделей Smart-TV приставок
        </h3>
        <p className="text-sm opacity-90 hidden sm:block md:opacity-100">
          Подберите идеальную — фильтры помогут
        </p>
      </div>

      <Button
        asChild
        className="bg-white/10 hover:bg-white/20 md:bg-blue-600 md:hover:bg-blue-700 md:text-white px-4 md:px-5 py-2 rounded-lg"
      >
        <Link href="/catalog">Каталог&nbsp;→</Link>
      </Button>
    </section>
  );
} 