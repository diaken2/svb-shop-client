import React, { useState } from 'react';
import { FiX, FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { motion, AnimatePresence } from 'framer-motion';

interface Filters {
  brand: string[];
  memory: string[];
  storage: string[];
  priceRange: [number, number];
  features: string[];
  availability: boolean;
  specialOffers: boolean;
}

interface FiltersPanelProps {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  onFiltersChange: (changes: Partial<Filters>) => void;
  onApply: () => void;
  onClear: () => void;
  isMobile: boolean;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  open,
  onClose,
  filters,
  onFiltersChange,
  onApply,
  onClear,
  isMobile,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    brand: true,
    memory: true,
    storage: true,
    price: true,
    features: true,
    other: true,
  });

  const [showAllBrands, setShowAllBrands] = useState(false);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('ru-RU')} ₽`;
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCheckboxChange = (key: keyof Filters, value: string) => {
    if (key === 'availability' || key === 'specialOffers') {
      // Для булевых значений
      onFiltersChange({ [key]: !filters[key] });
    } else {
      // Для массивов
      const currentValues = Array.isArray(filters[key]) 
        ? [...filters[key] as string[]] 
        : [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      onFiltersChange({ [key]: newValues });
    }
  };

  const handleButtonClick = (key: keyof Filters, value: string) => {
    if (key === 'memory' || key === 'storage') {
      const currentValues = Array.isArray(filters[key]) 
        ? [...filters[key] as string[]] 
        : [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      onFiltersChange({ [key]: newValues });
    }
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      onFiltersChange({ priceRange: value as [number, number] });
    }
  };

  const handleClear = () => {
    onClear();
    setShowAllBrands(false);
  };

  const handleApply = () => {
    onApply();
    if (isMobile) {
      onClose();
    }
  };

  // --- PANEL FOR DESKTOP ---
  if (!isMobile) {
  return (
      <div className="bg-white rounded-2xl shadow border p-6 w-full max-w-xs">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Фильтры приставок</h3>
        
                {/* Бренды */}
                <div className="mb-6 border-b pb-4">
                  <button 
                    className="flex justify-between items-center w-full mb-3"
                    onClick={() => toggleSection('brand')}
            type="button"
                  >
                    <h4 className="font-semibold text-lg text-gray-800">Бренд</h4>
                    {expandedSections.brand ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {expandedSections.brand && (
                    <div className="space-y-2">
                      {/* Основные бренды */}
              {['VONTAR', 'Tanix', 'UGOOS', 'Mortal'].map((brand) => (
                        <label key={brand} className="flex items-center py-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.brand.includes(brand)}
                            onChange={() => handleCheckboxChange('brand', brand)}
                            className="form-checkbox h-5 w-5 text-orange-500 rounded focus:ring-orange-400"
                          />
                          <span className="ml-3 text-base text-gray-700">{brand}</span>
                        </label>
                      ))}
                      
                      {/* Кнопка "Показать все" */}
                      <button
                        onClick={() => setShowAllBrands(!showAllBrands)}
                        className="w-full text-left py-2 px-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-orange-600 font-medium"
                type="button"
                      >
                        {showAllBrands ? 'Скрыть остальные' : 'Показать все бренды'}
                      </button>
                      
                      {/* Остальные бренды */}
                      {showAllBrands && (
                        <div className="space-y-2 max-h-60 overflow-y-auto border-t pt-3">
                                                {[
                        'Mecool',
                        'Alloyseed',
                        'BEELINK',
                        'Blkj',
                        'Boxput',
                        'CIDOO',
                        'Dooertak',
                        'Enerfer',
                        'GTMEDIA',
                        'Gzduolahri',
                        'Homatics',
                        'HONGTOP',
                        'Hoxkee',
                        'Icaning',
                        'Kebidumei',
                        'Kepnix',
                        'Kickpi',
                        'KINHANK',
                        'Leedoar',
                        'Magcubic',
                        'Minix',
                        'REYFOON',
                        'Rnabau',
                        'Rocktek',
                        'Skybeats',
                        'Solovox',
                        'SZBOX',
                        'Tekasmi',
                        'Tenghong',
                        'TRANSPEED',
                        'Tvip',
                        'WOOPKER',
                        'Wudung',
                        'Zgemma',
                        'ZIDOO'
                      ].map((brand) => (
                            <label key={brand} className="flex items-center py-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={filters.brand.includes(brand)}
                                onChange={() => handleCheckboxChange('brand', brand)}
                                className="form-checkbox h-5 w-5 text-orange-500 rounded focus:ring-orange-400"
                              />
                              <span className="ml-3 text-base text-gray-700">{brand}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Оперативная память */}
                <div className="mb-6 border-b pb-4">
                  <button 
                    className="flex justify-between items-center w-full mb-3"
                    onClick={() => toggleSection('memory')}
            type="button"
                  >
                    <h4 className="font-semibold text-lg text-gray-800">Оперативная память</h4>
                    {expandedSections.memory ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {expandedSections.memory && (
                    <div className="grid grid-cols-3 gap-3">
                      {['1 ГБ', '2 ГБ', '3 ГБ', '4 ГБ', '8 ГБ'].map((memory) => (
                        <button
                          key={memory}
                          className={`py-2 px-4 rounded-lg border transition-colors ${
                            filters.memory.includes(memory)
                              ? 'bg-orange-100 border-orange-500 text-orange-700'
                              : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                          }`}
                  onClick={() => handleButtonClick('memory', memory)}
                  type="button"
                        >
                          {memory}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Встроенная память */}
                <div className="mb-6 border-b pb-4">
                  <button 
                    className="flex justify-between items-center w-full mb-3"
                    onClick={() => toggleSection('storage')}
            type="button"
                  >
                    <h4 className="font-semibold text-lg text-gray-800">Встроенная память</h4>
                    {expandedSections.storage ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {expandedSections.storage && (
                    <div className="grid grid-cols-3 gap-3">
                      {['4 ГБ', '8 ГБ', '12 ГБ', '16 ГБ', '32 ГБ', '64 ГБ', '128 ГБ', '256 ГБ'].map((storage) => (
                        <button
                          key={storage}
                          className={`py-2 px-4 rounded-lg border transition-colors ${
                            filters.storage.includes(storage)
                              ? 'bg-orange-100 border-orange-500 text-orange-700'
                              : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                          }`}
                  onClick={() => handleButtonClick('storage', storage)}
                  type="button"
                        >
                          {storage}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
        
        {/* Ползунок цены для десктопа */}
        <div className="mb-6 border-b pb-4">
          <button 
            className="flex justify-between items-center w-full mb-3"
            onClick={() => toggleSection('price')}
            type="button"
          >
            <h4 className="font-semibold text-lg text-gray-800">Цена</h4>
            {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {expandedSections.price && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{formatPrice(filters.priceRange[0])}</span>
                <span>{formatPrice(filters.priceRange[1])}</span>
              </div>
              <Slider
                range
                min={2000}
                max={30000}
                step={500}
                value={filters.priceRange}
                onChange={handlePriceChange}
                trackStyle={[{ backgroundColor: '#F97316' }]}
                handleStyle={[
                  { borderColor: '#F97316', backgroundColor: '#F97316' }, 
                  { borderColor: '#F97316', backgroundColor: '#F97316' }
                ]}
                railStyle={{ backgroundColor: '#E5E7EB' }}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Дополнительные фильтры */}
        <div className="mb-6 border-b pb-4">
          <button 
            className="flex justify-between items-center w-full mb-3"
            onClick={() => toggleSection('other')}
            type="button"
          >
            <h4 className="font-semibold text-lg text-gray-800">Дополнительно</h4>
            {expandedSections.other ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {expandedSections.other && (
            <div className="space-y-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.specialOffers}
                  onChange={() => handleCheckboxChange('specialOffers', '')}
                  className="form-checkbox h-5 w-5 text-orange-500 rounded focus:ring-orange-400"
                />
                <span className="ml-3 text-base text-gray-700">Только акции</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.availability}
                  onChange={() => handleCheckboxChange('availability', '')}
                  className="form-checkbox h-5 w-5 text-orange-500 rounded focus:ring-orange-400"
                />
                <span className="ml-3 text-base text-gray-700">В наличии</span>
              </label>
            </div>
          )}
        </div>

        {/* Кнопка "Сбросить" только для десктопа */}
        <button 
          onClick={handleClear}
          className="w-full py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors"
          type="button"
        >
          Сбросить фильтры
        </button>
            </div>
    );
  }

  // --- BOTTOM SHEET FOR MOBILE ---
    return (
      <AnimatePresence>
        {open && (
          <>
            {/* Затемнение фона только для мобильных фильтров */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            {/* Панель фильтров */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl z-50 max-h-[80vh] w-full"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              style={{ touchAction: 'none' }}
            >
              {/* Drag handle */}
              <div className="flex justify-center items-center pt-2 pb-1">
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-2" />
              </div>
              <div className="p-4 max-h-[70vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Фильтры</h3>
                  <button
                    onClick={onClose}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Закрыть фильтры"
                  type="button"
                  >
                  <FiX size={20} />
                  </button>
            </div>

            {/* Бренды */}
            <div className="mb-6 border-b pb-4">
              <button 
                className="flex justify-between items-center w-full mb-3"
                onClick={() => toggleSection('brand')}
                  type="button"
              >
                <h4 className="font-semibold text-lg text-gray-800">Бренд</h4>
                {expandedSections.brand ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {expandedSections.brand && (
                <div className="space-y-2">
                  {/* Основные бренды */}
                    {['VONTAR', 'Tanix', 'UGOOS', 'Mortal'].map((brand) => (
                    <label key={brand} className="flex items-center py-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.brand.includes(brand)}
                        onChange={() => handleCheckboxChange('brand', brand)}
                        className="form-checkbox h-5 w-5 text-orange-500 rounded focus:ring-orange-400"
                      />
                      <span className="ml-3 text-base text-gray-700">{brand}</span>
                    </label>
                  ))}
                  
                  {/* Кнопка "Показать все" */}
                  <button
                    onClick={() => setShowAllBrands(!showAllBrands)}
                    className="w-full text-left py-2 px-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-orange-600 font-medium"
                      type="button"
                  >
                    {showAllBrands ? 'Скрыть остальные' : 'Показать все бренды'}
                  </button>
                  
                  {/* Остальные бренды */}
                  {showAllBrands && (
                    <div className="space-y-2 max-h-60 overflow-y-auto border-t pt-3">
                      {[
                        'Mecool',
                        'Alloyseed',
                        'BEELINK',
                        'Blkj',
                        'Boxput',
                        'CIDOO',
                        'Dooertak',
                        'Enerfer',
                        'GTMEDIA',
                        'Gzduolahri',
                        'Homatics',
                        'HONGTOP',
                        'Hoxkee',
                        'Icaning',
                        'Kebidumei',
                        'Kepnix',
                        'Kickpi',
                        'KINHANK',
                        'Leedoar',
                        'Magcubic',
                        'Minix',
                        'REYFOON',
                        'Rnabau',
                        'Rocktek',
                        'Skybeats',
                        'Solovox',
                        'SZBOX',
                        'Tekasmi',
                        'Tenghong',
                        'TRANSPEED',
                        'Tvip',
                        'WOOPKER',
                        'Wudung',
                        'Zgemma',
                        'ZIDOO'
                      ].map((brand) => (
                        <label key={brand} className="flex items-center py-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.brand.includes(brand)}
                            onChange={() => handleCheckboxChange('brand', brand)}
                            className="form-checkbox h-5 w-5 text-orange-500 rounded focus:ring-orange-400"
                          />
                          <span className="ml-3 text-base text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Оперативная память */}
            <div className="mb-6 border-b pb-4">
              <button 
                className="flex justify-between items-center w-full mb-3"
                onClick={() => toggleSection('memory')}
                  type="button"
              >
                <h4 className="font-semibold text-lg text-gray-800">Оперативная память</h4>
                {expandedSections.memory ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {expandedSections.memory && (
                <div className="grid grid-cols-3 gap-3">
                  {['1 ГБ', '2 ГБ', '3 ГБ', '4 ГБ', '8 ГБ'].map((memory) => (
                    <button
                      key={memory}
                      className={`py-2 px-4 rounded-lg border transition-colors ${
                        filters.memory.includes(memory)
                          ? 'bg-orange-100 border-orange-500 text-orange-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                        onClick={() => handleButtonClick('memory', memory)}
                        type="button"
                    >
                      {memory}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Встроенная память */}
            <div className="mb-6 border-b pb-4">
              <button 
                className="flex justify-between items-center w-full mb-3"
                onClick={() => toggleSection('storage')}
                  type="button"
              >
                <h4 className="font-semibold text-lg text-gray-800">Встроенная память</h4>
                {expandedSections.storage ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {expandedSections.storage && (
                <div className="grid grid-cols-3 gap-3">
                  {['4 ГБ', '8 ГБ', '12 ГБ', '16 ГБ', '32 ГБ', '64 ГБ', '128 ГБ', '256 ГБ'].map((storage) => (
                    <button
                      key={storage}
                      className={`py-2 px-4 rounded-lg border transition-colors ${
                        filters.storage.includes(storage)
                          ? 'bg-orange-100 border-orange-500 text-orange-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => handleButtonClick('storage', storage)}
                      type="button"
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              )}
            </div>
                
              {/* Ползунок цены для мобильных */}
              <div className="mb-6 border-b pb-4">
                <button 
                  className="flex justify-between items-center w-full mb-3"
                  onClick={() => toggleSection('price')}
                  type="button"
                >
                  <h4 className="font-semibold text-lg text-gray-800">Цена</h4>
                  {expandedSections.price ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {expandedSections.price && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatPrice(filters.priceRange[0])}</span>
                      <span>{formatPrice(filters.priceRange[1])}</span>
                    </div>
                    <Slider
                      range
                      min={2000}
                      max={30000}
                      step={500}
                      value={filters.priceRange}
                      onChange={handlePriceChange}
                      trackStyle={[{ backgroundColor: '#F97316' }]}
                      handleStyle={[
                        { borderColor: '#F97316', backgroundColor: '#F97316' }, 
                        { borderColor: '#F97316', backgroundColor: '#F97316' }
                      ]}
                      railStyle={{ backgroundColor: '#E5E7EB' }}
                      className="w-full"
                    />
                  </div>
                )}
              </div>

              {/* Дополнительные фильтры для мобильных */}
              <div className="mb-6 border-b pb-4">
                <button 
                  className="flex justify-between items-center w-full mb-3"
                  onClick={() => toggleSection('other')}
                  type="button"
                >
                  <h4 className="font-semibold text-lg text-gray-800">Дополнительно</h4>
                  {expandedSections.other ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {expandedSections.other && (
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.specialOffers}
                        onChange={() => handleCheckboxChange('specialOffers', '')}
                        className="form-checkbox h-5 w-5 text-orange-500 rounded focus:ring-orange-400"
                      />
                      <span className="ml-3 text-base text-gray-700">Только акции</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.availability}
                        onChange={() => handleCheckboxChange('availability', '')}
                        className="form-checkbox h-5 w-5 text-orange-500 rounded focus:ring-orange-400"
                      />
                      <span className="ml-3 text-base text-gray-700">В наличии</span>
                    </label>
                  </div>
                )}
              </div>
                
              {/* Кнопки для мобильных */}
                <div className="flex justify-between gap-4 mt-8">
              <button 
                  onClick={handleClear}
                  className="w-1/2 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors"
                  type="button"
              >
                    Сбросить
              </button>
              <button 
                  onClick={handleApply}
                  className="w-1/2 py-3 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold hover:from-orange-500 hover:to-orange-600 transition-colors"
                  type="button"
              >
                Применить
              </button>
            </div>
          </div>
            </motion.div>
          </>
      )}
      </AnimatePresence>
  );
};

export default FiltersPanel; 