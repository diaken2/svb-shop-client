"use client";

import React, { useState } from 'react';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import RangeSlider from '../ui/Slider';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvancedFiltersProps {
  onFilterChange: (filters: any) => void;
  initialFilters?: any;
}

export default function AdvancedFilters({ onFilterChange, initialFilters }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState({
    priceRange: [500, 30000] as [number, number],
    memoryRange: [2, 8] as [number, number],
    storageRange: [16, 128] as [number, number],
    brands: [] as string[],
    features: [] as string[],
    specialOffers: false,
    inStock: false,
    ...initialFilters
  });

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    memory: true,
    storage: true,
    brands: true,
    features: true,
  });

  const handleFilterChange = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  const formatMemory = (memory: number) => {
    return `${memory} ГБ`;
  };

  const formatStorage = (storage: number) => {
    return `${storage} ГБ`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FiFilter className="w-5 h-5" />
          Продвинутые фильтры
        </h3>
        <button
          onClick={() => setFilters({
            priceRange: [2000, 30000],
            memoryRange: [2, 8],
            storageRange: [16, 128],
            brands: [],
            features: [],
            specialOffers: false,
            inStock: false,
          })}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Сбросить
        </button>
      </div>

      {/* Цена */}
      <div className="mb-6 border-b pb-4">
        <button 
          className="flex justify-between items-center w-full mb-3"
          onClick={() => toggleSection('price')}
        >
          <h4 className="font-semibold text-lg text-gray-800">Цена</h4>
          <FiChevronDown className={`w-4 h-4 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.price && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
            <RangeSlider
              min={2000}
              max={30000}
              value={filters.priceRange}
              onChange={(value) => handleFilterChange({ priceRange: value })}
              step={500}
              trackColor="#3B82F6"
              handleColor="#3B82F6"
              railColor="#E5E7EB"
            />
          </div>
        )}
      </div>

      {/* Оперативная память */}
      <div className="mb-6 border-b pb-4">
        <button 
          className="flex justify-between items-center w-full mb-3"
          onClick={() => toggleSection('memory')}
        >
          <h4 className="font-semibold text-lg text-gray-800">Оперативная память</h4>
          <FiChevronDown className={`w-4 h-4 transition-transform ${expandedSections.memory ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.memory && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatMemory(filters.memoryRange[0])}</span>
              <span>{formatMemory(filters.memoryRange[1])}</span>
            </div>
            <RangeSlider
              min={1}
              max={8}
              value={filters.memoryRange}
              onChange={(value) => handleFilterChange({ memoryRange: value })}
              step={1}
              trackColor="#10B981"
              handleColor="#10B981"
              railColor="#E5E7EB"
            />
          </div>
        )}
      </div>

      {/* Встроенная память */}
      <div className="mb-6 border-b pb-4">
        <button 
          className="flex justify-between items-center w-full mb-3"
          onClick={() => toggleSection('storage')}
        >
          <h4 className="font-semibold text-lg text-gray-800">Встроенная память</h4>
          <FiChevronDown className={`w-4 h-4 transition-transform ${expandedSections.storage ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.storage && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{formatStorage(filters.storageRange[0])}</span>
              <span>{formatStorage(filters.storageRange[1])}</span>
            </div>
            <RangeSlider
              min={8}
              max={256}
              value={filters.storageRange}
              onChange={(value) => handleFilterChange({ storageRange: value })}
              step={8}
              trackColor="#F59E0B"
              handleColor="#F59E0B"
              railColor="#E5E7EB"
            />
          </div>
        )}
      </div>

      {/* Бренды */}
      <div className="mb-6 border-b pb-4">
        <button 
          className="flex justify-between items-center w-full mb-3"
          onClick={() => toggleSection('brands')}
        >
          <h4 className="font-semibold text-lg text-gray-800">Бренды</h4>
          <FiChevronDown className={`w-4 h-4 transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.brands && (
          <div className="space-y-2">
            {['VONTAR', 'Tanix', 'UGOOS', 'Mortal', 'P7'].map((brand) => (
              <label key={brand} className="flex items-center py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => {
                    const newBrands = filters.brands.includes(brand)
                      ? filters.brands.filter((b: string) => b !== brand)
                      : [...filters.brands, brand];
                    handleFilterChange({ brands: newBrands });
                  }}
                  className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-400"
                />
                <span className="ml-3 text-base text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Особенности */}
      <div className="mb-6 border-b pb-4">
        <button 
          className="flex justify-between items-center w-full mb-3"
          onClick={() => toggleSection('features')}
        >
          <h4 className="font-semibold text-lg text-gray-800">Особенности</h4>
          <FiChevronDown className={`w-4 h-4 transition-transform ${expandedSections.features ? 'rotate-180' : ''}`} />
        </button>
        {expandedSections.features && (
          <div className="space-y-2">
            {[
              '4K поддержка',
              'HDR',
              'Dolby Vision',
              'Wi-Fi 6',
              'Bluetooth 5.0',
              'Голосовой пульт'
            ].map((feature) => (
              <label key={feature} className="flex items-center py-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.features.includes(feature)}
                  onChange={() => {
                    const newFeatures = filters.features.includes(feature)
                      ? filters.features.filter((f: string) => f !== feature)
                      : [...filters.features, feature];
                    handleFilterChange({ features: newFeatures });
                  }}
                  className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-400"
                />
                <span className="ml-3 text-base text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Дополнительные опции */}
      <div className="space-y-3">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.specialOffers}
            onChange={() => handleFilterChange({ specialOffers: !filters.specialOffers })}
            className="form-checkbox h-5 w-5 text-red-600 rounded focus:ring-red-400"
          />
          <span className="ml-3 text-base text-gray-700">Только акции и скидки</span>
        </label>
        
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={() => handleFilterChange({ inStock: !filters.inStock })}
            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-400"
          />
          <span className="ml-3 text-base text-gray-700">В наличии</span>
        </label>
      </div>
    </div>
  );
} 