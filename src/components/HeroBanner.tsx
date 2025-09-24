"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import AvitoLink from "@/components/ui/AvitoLink";
import type { Product } from "@/types/data";

interface HeroBannerProps {
  products: Product[];
  onCtaClick: () => void;
  onProductClick: (productId: string) => void;
}

export default function HeroBanner({ products, onCtaClick, onProductClick }: HeroBannerProps) {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Text block */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-gray-900">
            3000+ каналов и YouTube без рекламы
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mt-4 max-w-3xl mx-auto">
            Смотрите фильмы, сериалы и ТВ бесплатно — без подписок и абонплаты. Доставка сегодня, гарантия 12&nbsp;месяцев.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-base font-semibold"
              onClick={onCtaClick}
            >
              Выбрать приставку
            </Button>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              12&nbsp;мес. гарантии
            </span>
          </div>

          {/* UTP блок с преимуществами */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {/* Адрес */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-900">Адрес</div>
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">г. Лысьва</div>
              <div className="text-sm text-gray-600">ул. Мира, 34, Пермский край</div>
            </div>

            {/* Доставка */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-900">Доставка</div>
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">По всей России</div>
              <div className="text-sm text-gray-600">Быстрая доставка</div>
            </div>

            {/* Рейтинг Авито */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-900">Рейтинг</div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-bold text-gray-900">5,0</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
              <AvitoLink 
                href="https://www.avito.ru/brands/i118581600?src=sharing" 
                className="text-blue-600 font-medium text-sm hover:underline hover:text-blue-700 transition-colors block"
              >
                425 ОТЗЫВОВ
                <div className="text-xs mt-1">Смотреть все отзывы</div>
              </AvitoLink>
            </div>

            {/* Заказы */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-900">Заказы</div>
              </div>
              <div className="text-lg font-bold text-gray-900 mb-1">3000+</div>
              <div className="text-sm text-gray-600">Проверено временем</div>
            </div>
          </div>

          {/* Дополнительные преимущества */}
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Бесплатный возврат товара
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Надёжный продавец
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              456 продаж с Авито Доставкой
            </span>
          </div>
        </div>

        {/* Slider - временно скрыт */}
        {/* <div className="flex-1 w-full max-w-md">
          <div className="flex gap-4 overflow-x-auto snap-x pb-2">
            {products.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="snap-center flex-shrink-0 bg-white rounded-lg shadow-md p-4 w-64"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-contain mb-3"
                />
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
                  {p.name}
                </div>
                {p.oldPrice && p.oldPrice > p.price ? (
                  <div className="mb-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-red-600">
                        {p.price.toLocaleString()} ₽
                      </span>
                      <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                        -{Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}%
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 line-through">
                      {p.oldPrice.toLocaleString()} ₽
                    </span>
                  </div>
                ) : (
                  <p className="text-lg font-bold text-blue-600 mb-1">
                    {p.price.toLocaleString()} ₽
                  </p>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onProductClick(p.id)}
                >
                  Подробнее
                </Button>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
} 