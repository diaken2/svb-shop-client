'use client';

import { useCart } from "@/contexts/CartContext";
import AddToCartNotification from '@/components/AddToCartNotification';

export default function CartNotificationWrapper() {
  const { isNotificationVisible, notificationProduct, hideNotification } = useCart();
  
  if (!notificationProduct) return null;
  
  return (
    <AddToCartNotification
      isVisible={isNotificationVisible}
      onClose={hideNotification}
      productName={notificationProduct.name}
      productImage={notificationProduct.image}
    />
  );
} 