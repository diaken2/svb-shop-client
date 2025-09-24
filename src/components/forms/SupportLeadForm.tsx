"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface SupportLeadFormProps {
  heading: string;
  description: React.ReactNode;
  ctaLabel: string;
  telemetryLabel: string;
  className?: string;
}

export default function SupportLeadForm({
  heading,
  description,
  ctaLabel,
  telemetryLabel,
  className = "",
}: SupportLeadFormProps) {
  const router = useRouter();
  const [phone, setPhone] = useState("+7");
  const [topic, setTopic] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (!value.startsWith("+7")) {
      value = "+7" + value.replace(/[^0-9]/g, "");
    }
    if (value.length <= 16) {
      setPhone(value);
    }
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
        `Новая заявка (форма: ${heading})`,
        topic ? `Тема: ${topic}` : undefined,
        `Телефон: ${phone}`,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, type: "question" }),
      });

      if (res.ok) {
        setIsSent(true);
        setTopic("");
        setPhone("+7");
        setTimeout(() => setIsSent(false), 3000);
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

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className={className}
    >
      <Card className="overflow-hidden border border-gray-100 ring-1 ring-black/5 shadow-xl rounded-3xl">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white px-6 py-6 md:py-8">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl md:text-3xl font-bold">
              {heading}
            </CardTitle>
          </CardHeader>
          <p className="mt-3 text-white/90 text-sm md:text-base max-w-3xl">
            {description}
          </p>
        </div>

        <CardContent className="p-6">
          <div className="grid gap-3 md:grid-cols-3">
            <Input
              type="text"
              placeholder="Опишите запрос (необязательно)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              aria-label="Тема"
              className="rounded-lg bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300"
            />
            <Input
              type="tel"
              placeholder="Ваш телефон"
              value={phone}
              onChange={handlePhoneChange}
              aria-label="Телефон"
              className="rounded-lg bg-white text-gray-900 placeholder:text-gray-500 border border-gray-300"
            />
            <Button
              className="w-full md:w-auto bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:brightness-110 md:justify-self-start rounded-xl shadow-lg hover:shadow-xl"
              onClick={handleSubmit}
              disabled={isSending}
              size="lg"
            >
              {isSending ? "Отправка..." : ctaLabel}
            </Button>
          </div>

          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          {isSent && (
            <p className="text-green-600 text-sm mt-2">Заявка отправлена!</p>
          )}
        </CardContent>
      </Card>
    </motion.section>
  );
}



