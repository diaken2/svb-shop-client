import React, { useState, useEffect, useRef } from 'react';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface Filters {
  brand: string[];
  memory: string[];
  storage: string[];
  priceRange: [number, number];
  features: string[];
  availability: boolean;
  specialOffers: boolean;
}

interface HorizontalFiltersProps {
  filters: Filters;
  onFiltersChange: (changes: Partial<Filters>) => void;
  onClear: () => void;
  onApply: () => void;
  isMobile: boolean;
}

const HorizontalFilters: React.FC<HorizontalFiltersProps> = ({
  filters,
  onFiltersChange,
  onClear,
  onApply,
  isMobile,
}) => {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Закрытие фильтра при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setExpandedFilter(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  const handleCheckboxChange = (key: keyof Filters, value: string) => {
    if (key === 'availability' || key === 'specialOffers') {
      onFiltersChange({ [key]: !filters[key] });
    } else {
      const currentValues = Array.isArray(filters[key]) 
        ? [...filters[key] as string[]] 
        : [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      onFiltersChange({ [key]: newValues });
    }
  };

  const toggleFilter = (filterName: string) => {
    setExpandedFilter(expandedFilter === filterName ? null : filterName);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.brand.length > 0) count += filters.brand.length;
    if (filters.memory.length > 0) count += filters.memory.length;
    if (filters.storage.length > 0) count += filters.storage.length;
    if (filters.features.length > 0) count += filters.features.length;
    if (filters.availability) count += 1;
    if (filters.specialOffers) count += 1;
    return count;
  };

  if (isMobile) return null; // На мобильных используем старый фильтр

  return (
    <div ref={filterRef} className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Основные фильтры */}
          <div className="flex items-center space-x-4">
            {/* Бренд */}
            <div className="relative">
              <button
                onClick={() => toggleFilter('brand')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  filters.brand.length > 0
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>Бренд</span>
                {filters.brand.length > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {filters.brand.length}
                  </span>
                )}
                <FiChevronDown className={`w-4 h-4 transition-transform ${
                  expandedFilter === 'brand' ? 'rotate-180' : ''
                }`} />
              </button>
              
              <AnimatePresence>
                {expandedFilter === 'brand' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-48 z-50"
                  >
                    <div className="space-y-2">
                      {['VONTAR', 'Xiaomi', 'Apple TV', 'Google TV', 'Samsung'].map((brand) => (
                        <label key={brand} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.brand.includes(brand)}
                            onChange={() => handleCheckboxChange('brand', brand)}
                            className="form-checkbox h-4 w-4 text-blue-600 rounded"
                          />
                          <span className="ml-2 text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Память */}
            <div className="relative">
              <button
                onClick={() => toggleFilter('memory')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  filters.memory.length > 0
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>Память</span>
                {filters.memory.length > 0 && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {filters.memory.length}
                  </span>
                )}
                <FiChevronDown className={`w-4 h-4 transition-transform ${
                  expandedFilter === 'memory' ? 'rotate-180' : ''
                }`} />
              </button>
              
              <AnimatePresence>
                {expandedFilter === 'memory' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3 min-w-32 z-50"
                  >
                    <div className="space-y-2">
                      {['2 ГБ', '4 ГБ', '8 ГБ'].map((memory) => (
                        <label key={memory} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.memory.includes(memory)}
                            onChange={() => handleCheckboxChange('memory', memory)}
                            className="form-checkbox h-4 w-4 text-blue-600 rounded"
                          />
                          <span className="ml-2 text-sm">{memory}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Цена */}
            <div className="relative">
              <button
                onClick={() => toggleFilter('price')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  filters.priceRange[0] !== 2000 || filters.priceRange[1] !== 10000
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>Цена</span>
                {(filters.priceRange[0] !== 2000 || filters.priceRange[1] !== 10000) && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {formatPrice(filters.priceRange[0])} - {formatPrice(filters.priceRange[1])}
                  </span>
                )}
                <FiChevronDown className={`w-4 h-4 transition-transform ${
                  expandedFilter === 'price' ? 'rotate-180' : ''
                }`} />
              </button>
              
              <AnimatePresence>
                {expandedFilter === 'price' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 min-w-64 z-50"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{formatPrice(filters.priceRange[0])}</span>
                        <span>{formatPrice(filters.priceRange[1])}</span>
                      </div>
                      <div className="relative">
                        <Slider
                          range
                          min={2000}
                          max={30000}
                          step={500}
                          value={filters.priceRange}
                          onChange={(value) => Array.isArray(value) && onFiltersChange({ priceRange: value as [number, number] })}
                          trackStyle={[{ backgroundColor: '#3B82F6' }]}
                          handleStyle={[
                            { borderColor: '#3B82F6', backgroundColor: '#3B82F6' }, 
                            { borderColor: '#3B82F6', backgroundColor: '#3B82F6' }
                          ]}
                          railStyle={{ backgroundColor: '#E5E7EB' }}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Кнопки управления */}
          <div className="flex items-center space-x-2">
            {getActiveFiltersCount() > 0 && (
              <button
                onClick={onClear}
                className="text-gray-500 hover:text-gray-700 text-sm flex items-center"
              >
                <FiX className="w-4 h-4 mr-1" />
                Очистить
              </button>
            )}
            <span className="text-sm text-gray-500">
              {getActiveFiltersCount()} фильтр{getActiveFiltersCount() !== 1 ? 'ов' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalFilters; 