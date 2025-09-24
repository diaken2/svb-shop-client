import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface AdvertiserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvertiserInfoModal: React.FC<AdvertiserInfoModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Информация о рекламодателе
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Закрыть"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">ФИО:</span>
                  <span className="text-gray-900">Борисов Станислав Владимирович</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">ИНН:</span>
                  <span className="text-gray-900">591801436779</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Город:</span>
                  <span className="text-gray-900">Лысьва</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Улица:</span>
                  <span className="text-gray-900">Мира 34</span>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200">
              <Button
                onClick={onClose}
                variant="outline"
                className="px-6"
              >
                Закрыть
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvertiserInfoModal; 