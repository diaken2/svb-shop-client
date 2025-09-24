"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  mainImage: string;
  additionalImages?: string[];
  productName: string;
}

export default function ProductGallery({ mainImage, additionalImages = [], productName }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Создаем массив всех изображений с пустышками
  const createImageArray = () => {
    const images = [mainImage];
    
    // Если есть дополнительные изображения, добавляем их
    if (additionalImages && additionalImages.length > 0) {
      images.push(...additionalImages);
    }
    
    // Если изображений меньше 4, добавляем пустышки
    while (images.length < 4) {
      images.push(mainImage); // Используем основное изображение как пустышку
    }
    
    return images;
  };

  const allImages = createImageArray();
  
  // Подписи не требуются, убираем
  const imageLabels: string[] = [];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') setIsFullscreen(false);
  };

  return (
    <div className="space-y-4" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Основное изображение */}
      <div className="relative group">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <motion.img 
            key={selectedImage}
            src={allImages[selectedImage]} 
            alt={`${productName}`}
            className="w-full h-80 md:h-96 object-contain p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsFullscreen(true)}
          />
        </div>

        {/* Навигационные кнопки (только для десктопа) */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="hidden md:flex absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Предыдущее изображение"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="hidden md:flex absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Следующее изображение"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Индикатор текущего изображения */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === selectedImage 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Перейти к изображению ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Миниатюры изображений */}
      <div className="grid grid-cols-4 gap-3">
        {allImages.map((image, index) => (
          <motion.div 
            key={index}
            className={`relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-200 ${
              selectedImage === index 
                ? 'ring-2 ring-blue-500 shadow-lg' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedImage(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img 
              src={image} 
              alt={`${productName}`}
              className="w-full h-20 object-cover"
            />
            
          </motion.div>
        ))}
      </div>

      {/* Полноэкранный режим */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
          >
            <div className="relative max-w-4xl max-h-full p-4">
              <motion.img 
                key={selectedImage}
                src={allImages[selectedImage]} 
                alt={`${productName} - ${imageLabels[selectedImage] || `фото ${selectedImage + 1}`}`}
                className="max-w-full max-h-[80vh] object-contain"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Кнопки навигации в полноэкранном режиме */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all duration-200"
                    aria-label="Предыдущее изображение"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all duration-200"
                    aria-label="Следующее изображение"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Кнопка закрытия */}
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-all duration-200"
                aria-label="Закрыть"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Подпись изображения */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="text-white text-lg font-medium">
                  {imageLabels[selectedImage] || `Фото ${selectedImage + 1}`}
                </p>
                <p className="text-white/70 text-sm">
                  {selectedImage + 1} из {allImages.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 