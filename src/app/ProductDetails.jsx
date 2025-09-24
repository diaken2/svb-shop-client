"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import ProductGallery from "@/components/ProductGallery";

const ProductDetails = ({ selectedProduct, addToCart }) => {
  const router = useRouter();

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Подробно о товаре</h2>
        <Button
          variant="outline"
          onClick={() => router.push("/catalog")}
          aria-label="Назад к каталогу"
        >
          ← В каталог
        </Button>
      </div>
      <Card className="overflow-hidden shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/2 bg-gray-100 p-8">
            <ProductGallery
              mainImage={selectedProduct.image}
              additionalImages={selectedProduct.additionalImages}
              productName={selectedProduct.name}
            />
          </div>
          <div className="md:w-1/2 p-8">
            <CardHeader className="relative">
              <CardTitle className="text-2xl font-semibold">
                {selectedProduct.name}
              </CardTitle>
              <CardDescription className="line-height-[1.6]">
                {selectedProduct.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <h3 className="font-semibold text-lg mb-4 mt-4">
                Технические характеристики:
              </h3>
              <ul className="space-y-3 mb-6">
                {selectedProduct.specs.map((spec, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  {selectedProduct.type === "promotional" ||
                  selectedProduct.type === "Акционная" ? (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="text-2xl font-semibold text-blue-600">
                          {selectedProduct.price.toLocaleString()} ₽
                        </div>
                        <div className="text-lg text-gray-500 line-through">
                          {Math.round(
                            selectedProduct.price / 0.7
                          ).toLocaleString()}{" "}
                          ₽
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        СКИДКА 30%
                      </div>
                    </>
                  ) : (
                    <div className="text-2xl font-semibold text-blue-600">
                      {selectedProduct.price.toLocaleString()} ₽
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={() => router.push("/catalog")}
                    aria-label="Сравнить модели"
                  >
                    Сравнить модели
                  </Button>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-indigo-700"
                    onClick={() => addToCart(selectedProduct)}
                    aria-label="Купить сейчас"
                  >
                    Купить сейчас
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
      {/* Дополнительная информация */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card className="p-8">
          <CardHeader>
            <CardTitle className="font-semibold">Преимущества модели</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">★</span>
                <span>Идеально подходит для ежедневного использования</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">★</span>
                <span>Простая настройка за 5 минут</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">★</span>
                <span>Поддержка всех популярных форматов видео</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">★</span>
                <span>Гарантия 12 месяцев</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card className="p-8">
          <CardHeader>
            <CardTitle className="font-semibold">Что в комплекте</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Приставка {selectedProduct.name}</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Пульт дистанционного управления</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Блок питания</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>HDMI кабель</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Инструкция на русском языке</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetails;
