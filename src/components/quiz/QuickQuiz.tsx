"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

type Answer = string;

interface QuickQuizProps {
  title?: string;
  telemetryLabel?: string;
  className?: string;
}

export default function QuickQuiz({
  title = "🎯 Подберите идеальную приставку за 30 секунд",
  telemetryLabel = "quiz_submit",
  className = "",
}: QuickQuizProps) {
  const router = useRouter();
  const steps = useMemo(
    () => [
      {
        q: "📺 Какой у вас телевизор?",
        description: "Это поможет подобрать оптимальную модель",
        options: [
          { text: "Smart TV", icon: "📱", desc: "Уже умный, но можно лучше" },
          { text: "Обычный ТВ", icon: "📺", desc: "Станет умным за 2 минуты" },
          { text: "Не знаю", icon: "❓", desc: "Поможем определить" }
        ],
        key: "tvType",
      },
      {
        q: "🎬 Что хотите смотреть?",
        description: "Выберите главное, остальное будет бонусом",
        options: [
          { text: "ТВ каналы", icon: "📡", desc: "3000+ каналов без абонплаты" },
          { text: "YouTube", icon: "🔴", desc: "Без рекламы и ограничений" },
          { text: "Фильмы/сериалы", icon: "🎭", desc: "5+ онлайн-кинотеатров" },
          { text: "Всё сразу", icon: "⭐", desc: "Полный пакет развлечений" }
        ],
        key: "usage",
      },
      {
        q: "💰 Какой бюджет?",
        description: "У нас есть варианты для любого кошелька",
        options: [
          { text: "До 2000₽", icon: "💸", desc: "Базовые функции, отличное качество" },
          { text: "2000-5000₽", icon: "💎", desc: "Премиум возможности, 4K поддержка" },
          { text: "5000+₽", icon: "🚀", desc: "Максимум функций, игровая приставка" }
        ],
        key: "budget",
      },
    ],
    []
  );

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [phone, setPhone] = useState("+7");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSelect = (option: any) => {
    const key = steps[current].key;
    setAnswers((prev) => ({ ...prev, [key]: option.text }));
    setTimeout(() => setCurrent((c) => Math.min(c + 1, steps.length)), 300);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith("+7")) {
      value = "+7" + value.replace(/[^0-9]/g, "");
    }
    if (value.length <= 16) setPhone(value);
  };

  const handleSubmit = async () => {
    setError("");
    if (phone.replace(/\D/g, "").length < 11) {
      setError("Введите корректный номер телефона");
      return;
    }
    setIsSending(true);
    try {
      const text = [
        `🎯 Новая заявка (форма: Квиз — Подбор приставки)`,
        `📺 ТВ: ${answers.tvType || "-"}`,
        `🎬 Цель: ${answers.usage || "-"}`,
        `💰 Бюджет: ${answers.budget || "-"}`,
        `📱 Телефон: ${phone}`,
      ].join("\n");

      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, type: "question" }),
      });

      if (res.ok) {
        setIsSent(true);
        setTimeout(() => setIsSent(false), 3000);
        setPhone("+7");
        setAnswers({});
        setCurrent(0);
        if (typeof window !== "undefined" && (window as any).ym) {
          (window as any).ym(103576778, "reachGoal", telemetryLabel);
        }
        // редирект на страницу завершения
        setTimeout(() => router.push("/complete"), 500);
      } else {
        try {
          const data = await res.json();
          setError(data?.error || "Ошибка при отправке. Попробуйте позже.");
        } catch {
          setError("Ошибка при отправке. Попробуйте позже.");
        }
      }
    } catch (e) {
      setError("Сетевая ошибка. Попробуйте снова.");
    } finally {
      setIsSending(false);
    }
  };

  const isLast = current >= steps.length;

  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <Card className="shadow-xl border border-gray-100 ring-1 ring-black/5 sticky top-4 rounded-3xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl md:text-2xl mb-2">{title}</CardTitle>
          <p className="text-gray-600 text-sm">
            🎁 Заполнив тест, вы сэкономите время менеджеров — поэтому мы дадим вам скидку 20%
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {!isLast ? (
                <motion.div
                  key={`q-${current}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-4">
                    <p className="font-semibold text-lg mb-2">{steps[current].q}</p>
                    {steps[current].description && (
                      <p className="text-gray-600 text-sm mb-4">{steps[current].description}</p>
                    )}
                  </div>
                  <div className="space-y-3">
                    {steps[current].options.map((option, index) => (
                      <motion.button
                        key={option.text}
                        onClick={() => handleSelect(option)}
                        className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{option.icon}</span>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 group-hover:text-blue-700">
                              {option.text}
                            </div>
                            <div className="text-sm text-gray-600 group-hover:text-blue-600">
                              {option.desc}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3">🎉</div>
                    <p className="font-semibold text-lg mb-2">
                      Отлично! Остался последний шаг
                    </p>
                    <p className="text-gray-600 text-sm">
                      Укажите телефон — вышлем персональную подборку, цену и скидку 20%
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="Ваш телефон"
                      aria-label="Телефон"
                      className="rounded-lg bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300"
                    />
                    <Button className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:brightness-110 shadow-lg hover:shadow-xl text-base font-semibold" onClick={handleSubmit} disabled={isSending}>
                      {isSending ? "Отправка..." : "🎁 Получить подбор + скидку 20%"}
                    </Button>
                  </div>
                  {error && (
                    <p className="text-red-600 text-sm mt-2">{error}</p>
                  )}
                  {isSent && (
                    <p className="text-green-600 text-sm mt-2">
                      Заявка отправлена!
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Прогресс-бар */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Шаг {Math.min(current + 1, steps.length + 1)} из {steps.length + 1}</span>
                {!isLast && (
                  <button
                    className="underline underline-offset-2 hover:text-gray-700"
                    onClick={() => setCurrent((c) => Math.min(c + 1, steps.length))}
                  >
                    Пропустить
                  </button>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((current + 1) / (steps.length + 1)) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.aside>
  );
}



