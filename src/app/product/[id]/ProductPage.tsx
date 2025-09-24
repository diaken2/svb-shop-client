"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGallery from '@/components/ProductGallery';
import { useCart } from '@/contexts/CartContext';

interface Product {
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
}

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const goBack = () => {
    router.back();
  };

  // Безопасное получение данных
  const productImage = product.image || '/placeholder.png';
  const productAdditionalImages = product.additionalImages || [];
  const productSpecs = product.specs || [];
  const productDescription = product.description || product.shortDesc || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Кнопка "Назад" */}
        <Button
          variant="ghost"
          onClick={goBack}
          className="mb-6 flex items-center gap-2 hover:bg-gray-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Назад
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Галерея изображений */}
          <ProductGallery 
            mainImage={productImage}
            additionalImages={productAdditionalImages}
            productName={product.name}
          />
          
          {/* Информация о продукте */}
          <div className="space-y-4 sm:space-y-6">
            {/* Заголовок и описание */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{product.name}</h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{productDescription}</p>
            </div>
            
            {/* Цена */}
            <Card className="bg-white">
              <CardContent className="p-4 sm:p-6">
                  {product.oldPrice ? (
                  <div className="space-y-4 mb-6">
                    {/* Основная цена и старая цена */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <div className="flex items-baseline gap-2 sm:gap-4">
                        <span className="text-3xl sm:text-4xl font-bold text-red-600">{product.price.toLocaleString()} ₽</span>
                        <span className="text-xl sm:text-2xl text-gray-400 line-through">{product.oldPrice.toLocaleString()} ₽</span>
                      </div>
                      {/* Скидка */}
                      <div className="mt-2 sm:mt-0">
                        <span className="inline-block bg-red-100 text-red-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-lg font-semibold">
                        СКИДКА {Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </span>
                      </div>
                    </div>
                    </div>
                  ) : (
                  <div className="mb-6">
                    <span className="text-3xl sm:text-4xl font-bold text-blue-600">{product.price.toLocaleString()} ₽</span>
                  </div>
                  )}
                
                {/* Кнопка действия */}
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 text-base sm:text-lg font-semibold"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                    />
                  </svg>
                  Добавить в корзину
                </Button>
              </CardContent>
            </Card>
            
            {/* Характеристики */}
            <Card className="bg-white">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Характеристики
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {productSpecs.map((spec, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-gray-700 text-sm sm:text-base">{spec}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Дополнительная информация */}
            <Card className="bg-white">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Что входит в комплект
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Smart TV приставка</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Пульт дистанционного управления</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Блок питания</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>HDMI кабель</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Инструкция по настройке</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}