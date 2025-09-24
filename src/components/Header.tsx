"use client";
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => {
              router.push("/");
            }}
            role="button"
            tabIndex={0}
            aria-label="На главную"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                router.push("/");
              }
            }}
          >
            <div className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="SVB SHOP Logo"
                width={80}
                height={80}
                className="w-12 h-12 md:w-20 md:h-20 object-contain"
              />
            </div>
            <span className="text-xl font-bold text-blue-600">
              ТВ без подписок
            </span>
          </div>

          {/* Center phone block (desktop) */}
          <div className="hidden md:flex flex-col items-center justify-center mx-4">
            <span className="text-xs text-gray-500 mb-1">
              Отвечаем на звонки без выходных с 07:00 до 22:00
            </span>
            <a
              href="tel:+79922200037"
              className="text-2xl font-semibold text-blue-700 hover:text-blue-800 tracking-wide"
              aria-label="Позвонить +7 992 220 0037"
            >
              +7 992 220 0037
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            <Button
              variant="ghost"
              onClick={() => {
                router.push("/");
              }}
            >
              Главная
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                router.push("/catalog");
              }}
            >
              Каталог
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                router.push("/about");
              }}
            >
              О нас
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                router.push("/cart");
              }}
              className="relative"
            >
              Корзина
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Cart Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                router.push("/cart");
              }}
              className="relative"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden py-4 border-t"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-3">
              {/* Phone block inside burger menu */}
              <div className="px-1 pb-3 border-b">
                <div className="text-xs text-gray-500 mb-1">
                  Отвечаем на звонки без выходных с 07:00 до 22:00
                </div>
                <a
                  href="tel:+79922200037"
                  className="text-lg font-semibold text-blue-700"
                  aria-label="Позвонить +7 992 220 0037"
                >
                  +7 992 220 0037
                </a>
              </div>
              <Button
                variant="ghost"
                onClick={() => {
                  router.push("/");
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                Главная
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  router.push("/catalog");
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                Каталог
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  router.push("/about");
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                О нас
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
} 