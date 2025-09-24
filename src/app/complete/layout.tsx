import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Заказ оформлен - SVB SHOP - ТВ без подписок',
  description: 'Спасибо за ваш заказ! Мы получили вашу заявку и свяжемся с вами в ближайшее время.',
  keywords: ['заказ оформлен', 'спасибо за заказ', 'тв приставка', 'доставка'],
  openGraph: {
    title: 'Заказ оформлен - SVB SHOP - ТВ без подписок',
    description: 'Спасибо за ваш заказ! Мы получили вашу заявку и свяжемся с вами в ближайшее время.',
    type: 'website',
  },
};

export default function CompleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 