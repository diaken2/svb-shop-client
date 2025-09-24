'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

type Product = {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image?: string;
  additionalImages?: string[];
  specs?: string[];
  type?: string;
  description?: string;
  shortDesc?: string;
  meta?: any;
};

type CatalogProductCardProps = {
  product: Product;
  openProductDetails: (product: Product) => void;
};

const getProductTypeLabel = (type?: string): string | null => {
  switch (type) {
    case "promotional":
    case "Акционная":
      return "Акция";
    case "hit":
    case "Хит":
      return "Хит продаж";
    case "new":
    case "Новая":
      return "Новая модель";
    case "regular":
    case "Обычный":
      return null;
    default:
      return null;
  }
};

const getBadgeColor = (type?: string): string => {
  switch (type) {
    case "promotional":
    case "Акционная":
      return "bg-red-500";
    case "hit":
    case "Хит":
      return "bg-orange-500";
    case "new":
    case "Новая":
      return "bg-green-500";
    default:
      return "bg-red-500";
  }
};

const CatalogProductCard = React.memo(({ product, openProductDetails }: CatalogProductCardProps) => {
  const productImage = product.image || "/placeholder.png";
  const productSpecs = product.specs || [];
  const productType = product.type || "regular";
  const isPromotional = productType === "promotional" || productType === "Акционная";

  const calculateOldPrice = () => {
    if (product.oldPrice) return product.oldPrice;
    if (isPromotional) return Math.round(product.price / 0.7);
    return null;
  };
  const oldPrice = calculateOldPrice();

  return (
    <Card className="bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 card flex flex-col md:flex-row items-stretch md:w-[90%] mx-auto">
      {/* Mobile version */}
      <div
        className="md:hidden w-full cursor-pointer hover:shadow-lg transition-shadow duration-200"
        onClick={() => openProductDetails(product)}
      >
        <div className="relative bg-gray-50 w-full h-40">
          <img
            src={productImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-2"
            onError={(e: any) => { e.currentTarget.src = "/placeholder.png"; }}
          />
          {getProductTypeLabel(productType) && (
            <div className={`absolute top-1 right-1 ${getBadgeColor(productType)} text-white font-bold px-1.5 py-0.5 rounded-full text-xs`}>
              {getProductTypeLabel(productType)}
            </div>
          )}
          {product.name === "VONTAR W2 ATV 4/32" && (
            <div className="absolute bottom-1 left-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-2 py-1 rounded-lg shadow-lg">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-purple-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L20 9.27L14.5 14.14L16.18 20.02L12 17.27L7.82 20.02L9.5 14.14L4 9.27L10.91 8.26L12 2Z" />
                </svg>
                <span className="text-sm font-bold">4,9</span>
                <svg className="w-3 h-3 text-purple-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L20 9.27L14.5 14.14L16.18 20.02L12 17.27L7.82 20.02L9.5 14.14L4 9.27L10.91 8.26L12 2Z" />
                </svg>
              </div>
              <div className="text-xs text-center">142 оценки</div>
            </div>
          )}
          <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-xs font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <div className="flex flex-wrap gap-1 mb-2">
            <div className="flex items-center bg-red-50 px-1.5 py-0.5 rounded text-xs text-red-600">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              YouTube
            </div>
            <div className="flex items-center bg-blue-50 px-1.5 py-0.5 rounded text-xs text-blue-600">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Без абонплаты
            </div>
          </div>
          <div className="mb-2">
            {isPromotional && oldPrice ? (
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-red-600">
                    {product.price.toLocaleString()} ₽
                  </span>
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-1 py-0.5 rounded">
                    -{Math.round((1 - product.price / oldPrice) * 100)}%
                  </span>
                </div>
                <span className="text-xs text-gray-500 line-through">
                  {oldPrice.toLocaleString()} ₽
                </span>
              </div>
            ) : (
              <span className="text-sm font-bold text-gray-900">
                {product.price.toLocaleString()} ₽
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Desktop version */}
      <div className="hidden md:flex w-full relative">
        {product.name === "VONTAR W2 ATV 4/32" && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-2 rounded-lg shadow-lg z-10">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L20 9.27L14.5 14.14L16.18 20.02L12 17.27L7.82 20.02L9.5 14.14L4 9.27L10.91 8.26L12 2Z" />
              </svg>
              <span className="text-lg font-bold">4,9</span>
              <svg className="w-4 h-4 text-purple-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L20 9.27L14.5 14.14L16.18 20.02L12 17.27L7.82 20.02L9.5 14.14L4 9.27L10.91 8.26L12 2Z" />
              </svg>
            </div>
            <div className="text-xs mt-1 text-center">Выбор покупателей</div>
            <div className="text-xs text-purple-200 text-center">142 оценки</div>
          </div>
        )}
        <div className="relative flex-shrink-0 flex items-center justify-center bg-white w-60 h-auto">
          <img
            src={productImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="w-full max-w-xs h-full object-contain transition-transform duration-500 hover:scale-110"
            onError={(e: any) => { e.currentTarget.src = "/placeholder.png"; }}
          />
          {getProductTypeLabel(productType) && (
            <div className={`absolute top-4 right-4 ${getBadgeColor(productType)} text-white font-bold px-3 py-1 rounded-full text-sm`}>
              {getProductTypeLabel(productType)}
            </div>
          )}
        </div>
        <div className="flex flex-col flex-1 justify-between">
          <CardHeader className="pb-0 pt-6 px-6">
            <CardTitle className="text-xl font-semibold">{product.name}</CardTitle>
            <CardDescription className="line-height-[1.6]">
              {product.shortDesc || (product.description ? product.description.substring(0, 120) + '...' : '')}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pt-2 pb-0 flex-1">
            <ul className="space-y-2 mb-4">
              {productSpecs.slice(0, 3).map((spec, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-sm">{spec}</span>
                </li>
              ))}
              {productSpecs.length > 3 && (
                <li className="text-gray-600 text-sm">+ ещё {productSpecs.length - 3} функции</li>
              )}
            </ul>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center bg-red-50 px-3 py-1.5 rounded-full text-sm text-red-600">
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                YouTube работает
              </div>
              <div className="flex items-center bg-blue-50 px-3 py-1.5 rounded-full text-sm text-blue-600">
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                3000+ каналов без абонплаты
              </div>
            </div>
            <div className="flex items-center gap-3 mb-2">
              {isPromotional && oldPrice ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-semibold text-blue-600">
                      {product.price.toLocaleString()} ₽
                    </div>
                    <div className="text-lg text-gray-500 line-through">
                      {oldPrice.toLocaleString()} ₽
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    СКИДКА {Math.round((1 - product.price / oldPrice) * 100)}%
                  </div>
                </>
              ) : (
                <div className="text-2xl font-semibold text-blue-600">
                  {product.price.toLocaleString()} ₽
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-row gap-3 px-6 pb-6 pt-0">
            <Button
              onClick={() => openProductDetails(product)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            >
              Подробнее
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
});

CatalogProductCard.displayName = "CatalogProductCard";
export default CatalogProductCard;