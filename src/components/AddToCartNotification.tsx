'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, ShoppingCart, ArrowRight } from 'lucide-react';

interface AddToCartNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  productName: string;
  productImage: string;
}

export default function AddToCartNotification({ 
  isVisible, 
  onClose, 
  productName, 
  productImage 
}: AddToCartNotificationProps) {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isVisible]);

  const handleCheckout = () => {
    onClose();
    router.push('/cart');
  };

  const handleContinue = () => {
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      <div className={`w-full max-w-md bg-white rounded-lg shadow-2xl border border-gray-200 pointer-events-auto transform transition-all duration-300 ${
        isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Товар добавлен в корзину</h3>
              <p className="text-sm text-gray-500">Продолжить покупки или оформить заказ?</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={productImage} 
                alt={productName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{productName}</h4>
              <p className="text-sm text-green-600 font-medium">✓ Добавлено в корзину</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 space-y-3">
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>Перейти к оформлению</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={handleContinue}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Продолжить покупки
          </button>
        </div>
      </div>
    </div>
  );
} 