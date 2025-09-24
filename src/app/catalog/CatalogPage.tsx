"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import FiltersPanel from '@/components/FiltersPanel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SimpleLeadForm from '@/components/forms/SimpleLeadForm';
import { FiFilter, FiX, FiLoader } from 'react-icons/fi';
import CatalogProductCard from '../CatalogProductCard';



// Тип продукта
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

export default function CatalogPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState({
    brand: [] as string[],
    memory: [] as string[],
    storage: [] as string[],
    priceRange: [500, 30000] as [number, number],
    features: [] as string[],
    availability: false,
    specialOffers: false,
  });

  // Загрузка товаров из API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('https://svb-shop-back.onrender.com/api/products');
        const data = await response.json();
        
        if (data.ok) {
          setProducts(data.items || []);
        } else {
          setError(data.error || 'Ошибка загрузки товаров');
        }
      } catch (err) {
        console.error('Ошибка загрузки товаров:', err);
        setError('Не удалось загрузить товары');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openProductDetails = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const handleFiltersChange = (changes: any) => {
    setFilters(prev => ({ ...prev, ...changes }));
  };

  const clearFilters = () => {
    setFilters({
      brand: [] as string[],
      memory: [] as string[],
      storage: [] as string[],
      priceRange: [500, 30000] as [number, number],
      features: [] as string[],
      availability: false,
      specialOffers: false,
    });
  };

  const applyFilters = () => {
    setIsFiltersOpen(false);
  };

  // Улучшенная фильтрация продуктов
  const filteredProducts = products.filter(product => {
    // Фильтр по бренду
    if (filters.brand.length > 0) {
      const productName = product.name.toLowerCase();
      const hasMatchingBrand = filters.brand.some((brand: string) => 
        productName.includes(brand.toLowerCase())
      );
      if (!hasMatchingBrand) {
        return false;
      }
    }

    // Улучшенный фильтр по оперативной памяти
    if (filters.memory.length > 0 && product.specs) {
      const productMemory = product.specs.find(spec => 
        spec.toLowerCase().includes('оперативная память') || 
        spec.toLowerCase().includes('память') ||
        spec.toLowerCase().includes('ram')
      );
      
      if (!productMemory) {
        return false;
      }
      
      // Извлекаем все значения памяти из строки
      const memoryMatches = productMemory.match(/(\d+)\s*ГБ/gi) || 
                           productMemory.match(/(\d+)\s*GB/gi) ||
                           productMemory.match(/\b(\d+)\s*[ГG]?[БB]?\b/gi);
      
      if (!memoryMatches) {
        return false;
      }
      
      // Проверяем, есть ли хотя бы одно совпадение с фильтрами
      const hasMatchingMemory = filters.memory.some(filterMemory => 
        memoryMatches.some(match => match.includes(filterMemory))
      );
      
      if (!hasMatchingMemory) {
        return false;
      }
    }

    // Улучшенный фильтр по встроенной памяти
    if (filters.storage.length > 0 && product.specs) {
      const productStorage = product.specs.find(spec => 
        spec.toLowerCase().includes('встроенная память') || 
        spec.toLowerCase().includes('память') ||
        spec.toLowerCase().includes('storage') ||
        spec.toLowerCase().includes('rom')
      );
      
      if (!productStorage) {
        return false;
      }
      
      // Извлекаем все значения памяти из строки
      const storageMatches = productStorage.match(/(\d+)\s*ГБ/gi) || 
                            productStorage.match(/(\d+)\s*GB/gi) ||
                            productStorage.match(/\b(\d+)\s*[ГG]?[БB]?\b/gi);
      
      if (!storageMatches) {
        return false;
      }
      
      // Проверяем, есть ли хотя бы одно совпадение с фильтрами
      const hasMatchingStorage = filters.storage.some(filterStorage => 
        storageMatches.some(match => match.includes(filterStorage))
      );
      
      if (!hasMatchingStorage) {
        return false;
      }
    }

    // Фильтр по цене
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }

    // Фильтр по акциям
    if (filters.specialOffers && product.type !== "promotional") {
      return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-7xl flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <FiLoader className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
            <p className="text-gray-600">Загрузка товаров...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-7xl flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <FiX className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-600 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Попробовать снова
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />

      <div className="container mx-auto px-2 md:px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Заголовок страницы */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Каталог Smart TV приставок
              </h1>
              <p className="text-gray-600">
                Найдено товаров: {filteredProducts.length}
              </p>
            </div>

            {/* Кнопка фильтров для мобильных */}
            {isMobile && (
              <Button
                onClick={() => setIsFiltersOpen(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600"
              >
                <FiFilter />
                Фильтры
              </Button>
            )}
          </div>

          {/* Форма подбора приставки */}
          <SimpleLeadForm
            heading="Подбор приставки за 1 минуту"
            description={
              <>
                Не знаете, какая приставка вам подойдёт? Наш специалист
                бесплатно подберёт модель под ваш телевизор за 1 минуту.
              </>
            }
            ctaLabel="Подобрать приставку"
            telemetryLabel="lead_pick_1min_catalog"
            accent="indigo"
            className="mb-8"
          />

          <div className="flex gap-6">
            {/* Панель фильтров для десктопа */}
            {!isMobile && (
              <div className="w-80 flex-shrink-0">
                <FiltersPanel
                  open={true}
                  onClose={() => {}}
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onApply={applyFilters}
                  onClear={clearFilters}
                  isMobile={false}
                />
              </div>
            )}

            {/* Список товаров */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <Card className="p-8 text-center">
                  <CardContent>
                    <div className="text-gray-500 mb-4">
                      <FiX className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Товары не найдены
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Попробуйте изменить параметры фильтров
                    </p>
                    <Button
                      onClick={clearFilters}
                      variant="outline"
                      className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                    >
                      Сбросить фильтры
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex flex-col gap-4">
                  {filteredProducts.map((product) => (
                      <div key={product.id} className="w-full">
                    <CatalogProductCard
                      key={product.id}
                      product={product}
                      openProductDetails={openProductDetails}
                    />
                     </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Форма "14 дней на тест" */}
      <div className="py-12 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <SimpleLeadForm
            heading="14 дней на тест"
            description={
              <>
                Каждый второй советует нас друзьям! Попробуйте приставку
                14 дней — бесплатный возврат и гарантия 1 год на
                техническую неисправность.
              </>
            }
            ctaLabel="Попробовать без риска"
            telemetryLabel="lead_test_14d_catalog"
            accent="green"
          />
        </div>
      </div>

      {/* Модальное окно фильтров для мобильных */}
      {isMobile && (
        <FiltersPanel
          open={isFiltersOpen}
          onClose={() => setIsFiltersOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onApply={applyFilters}
          onClear={clearFilters}
          isMobile={true}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}