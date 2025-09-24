"use client";
import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AvitoLink from "@/components/ui/AvitoLink";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <div className="container mx-auto px-2 md:px-4 py-8 max-w-7xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">О нас</h2>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
          >
            ← Назад
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                SVB SHOP - ТВ без подписок
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Мы специализируемся на продаже современных Android TV
                приставок, которые превращают ваш обычный телевизор в
                умный медиацентр. Наши клиенты получают:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 pl-4">
                <li>Только качественные и проверенные устройства</li>
                <li>Официальную гарантию от производителя</li>
                <li>Быструю доставку по всей России</li>
                <li>Профессиональную техническую поддержку</li>
              </ul>
              <p className="mb-4">
                Наша цель - сделать ваш домашний кинотеатр максимально
                удобным и функциональным. Мы постоянно расширяем
                ассортимент и предлагаем выгодные условия для всех
                клиентов.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                Наш процесс работы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img
                  src="https://i.ibb.co/ynKLpJwG/i.webp"
                  alt="Процесс прошивки приставки - стол, приставка в руках и монитор"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <p className="text-gray-600">
                  Каждая приставка проходит тщательную проверку и
                  настройку. Мы устанавливаем все необходимые
                  приложения, настраиваем доступ к каналам и тестируем
                  работу устройства перед отправкой.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">🔧</div>
                    <div className="font-semibold">Прошивка</div>
                    <div className="text-sm text-gray-600">
                      Установка ПО
                    </div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">✅</div>
                    <div className="font-semibold">Тестирование</div>
                    <div className="text-sm text-gray-600">
                      Проверка работы
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Блок о мастере */}
        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              Мастер-основатель SVB Shop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-1">
                <img
                  src="/master.jpg"
                  alt="Станислав - мастер и основатель SVB Shop"
                  className="w-full h-64 md:h-72 object-cover rounded-lg shadow-md"
                />
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  Мастер Станислав
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Каждая приставка после поступления сначала проходит тщательную 
                  проверку, а после настройки — недельное тестирование.
                </p>
                <p className="text-gray-600 mb-6 text-sm">
                  Как основатель SVB Shop гарантирую: вы получите полностью настроенную 
                  приставку — включаете и смотрите. Профессионально настраиваю 
                  Smart TV-приставки с 2015 года.
                </p>
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => window.open('https://wa.me/79922200037', '_blank')}
                >
                  <span className="text-lg">💬</span>
                  Написать Станиславу
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              Контактная информация
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <AvitoLink
                  href="https://www.avito.ru/user/7f6cea798e85ffdb3a87d48611188232/profile?src=sharing"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Связаться через Avito
                </AvitoLink>
              </p>
              <p>Адрес: Пермский край, г. Лысьва, ул. Мира, д. 34</p>
            </div>
          </CardContent>
        </Card>

        {/* Форма "Остались вопросы?" */}
        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              Остались вопросы?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white text-center shadow-xl ring-1 ring-black/5">
                <p className="mb-6 text-lg">
                  Задайте их нам и мы ответим в течение 15 минут
                </p>
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <input
                      type="tel"
                      placeholder="Ваш телефон"
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 border border-white/30"
                      required
                      aria-label="Номер телефона"
                    />
                  </div>
                  <textarea
                    placeholder="Ваш вопрос"
                    className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 border border-white/30 mb-4"
                    rows={3}
                    aria-label="Вопрос"
                  ></textarea>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:brightness-110 rounded-xl shadow-lg hover:shadow-xl"
                    aria-label="Отправить вопрос"
                  >
                    Отправить вопрос
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Форма "Поддержка 24/7" */}
        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">
              Поддержка 24/7
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 text-white text-center shadow-xl ring-1 ring-black/5">
                <p className="mb-6 text-lg">
                  Мы не пропадаем после продажи! Бесплатный Telegram-канал
                  поддержки и помощь в настройке приставки в любое время.
                </p>
                <div className="max-w-md mx-auto">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Опишите запрос (необязательно)"
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 border border-white/30"
                      aria-label="Описание запроса"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="tel"
                      placeholder="Ваш телефон"
                      className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder:text-gray-500 border border-white/30"
                      required
                      aria-label="Номер телефона"
                    />
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:brightness-110 rounded-xl shadow-lg hover:shadow-xl"
                    aria-label="Получить помощь и подбор"
                  >
                    Получить помощь и подбор
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
} 