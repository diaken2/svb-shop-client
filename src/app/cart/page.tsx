import type { Metadata } from 'next';
import CartPage from './CartPage';

export const metadata: Metadata = {
  title: "Корзина | SVB SHOP - ТВ без подписок",
  description: "Ваша корзина с выбранными товарами",
};

export default function CartPageWrapper() {
  return <CartPage />;
} 