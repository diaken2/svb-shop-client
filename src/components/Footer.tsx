"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import AvitoLink from '@/components/ui/AvitoLink';
import AdvertiserInfoModal from './AdvertiserInfoModal';

interface FooterProps {
  activeView?: string;
  setActiveView?: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ activeView, setActiveView }) => {
  const router = useRouter();
  const [isAdvertiserInfoOpen, setIsAdvertiserInfoOpen] = useState(false);

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">
                SVB SHOP - ТВ без подписок
              </h3>
              <p className="text-gray-400">
                Smart TV приставки для комфортного просмотра контента
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Контакты</h3>
              <ul className="space-y-2">
                <li>
                  <AvitoLink
                    href="https://www.avito.ru/user/7f6cea798e85ffdb3a87d48611188232/profile?src=sharing"
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    <img
                      src="https://i.ibb.co/Z6b1GwLz/avito.png"
                      alt="Avito"
                      className="w-5 h-5 mr-2"
                    />
                    Авито
                  </AvitoLink>
                </li>
                <li>
                  <a
                    href="https://t.me/StasB78"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12z m5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                    </svg>
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Меню</h3>
              <ul className="space-y-2">
                <li>
                  <Button
                    variant="link"
                    className="text-gray-300 p-0 h-auto hover:text-white"
                    onClick={() => {
                      if (setActiveView) setActiveView("home");
                      router.push("/");
                    }}
                  >
                    Главная
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="text-gray-300 p-0 h-auto hover:text-white"
                    onClick={() => {
                      if (setActiveView) setActiveView("catalog");
                      router.push("/catalog");
                    }}
                  >
                    Каталог
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="text-gray-300 p-0 h-auto hover:text-white"
                    onClick={() => {
                      if (setActiveView) setActiveView("about");
                      router.push("/about");
                    }}
                  >
                    О нас
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Оплата и доставка</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Оплата при получении
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Доставка по всей России
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <span>
                © {new Date().getFullYear()} SVB SHOP - ТВ без подписок. Все
                права защищены.
              </span>
              <button
                onClick={() => setIsAdvertiserInfoOpen(true)}
                className="text-gray-400 hover:text-gray-300 text-sm underline underline-offset-2 transition-colors"
              >
                Информация о рекламодателе
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Advertiser Info Modal */}
      <AdvertiserInfoModal
        isOpen={isAdvertiserInfoOpen}
        onClose={() => setIsAdvertiserInfoOpen(false)}
      />
    </>
  );
};

export default Footer; 