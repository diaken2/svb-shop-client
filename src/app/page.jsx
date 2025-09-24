"use client";
import React, { useState, useEffect, lazy, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import AvitoLink from "@/components/ui/AvitoLink";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ProductCard from "./ProductCard";
import CatalogProductCard from "./CatalogProductCard";
const ProductDetails = lazy(() => import("./ProductDetails"));
import Spinner from "@/components/ui/Spinner";
import { FiFilter } from "react-icons/fi";
import Header from "@/components/Header";
import FiltersPanel from "@/components/FiltersPanel";
import AvitoScreenshots from "@/components/AvitoScreenshots";
import HeroBanner from "@/components/HeroBanner";
import SimpleLeadForm from "@/components/forms/SimpleLeadForm";
import SupportLeadForm from "@/components/forms/SupportLeadForm";
import QuickQuiz from "@/components/quiz/QuickQuiz";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";

export default function App() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const [cart, setCart] = useState([]);
  const [activeView, setActiveView] = useState("home");
  const [isFaqOpen, setIsFaqOpen] = useState(Array(5).fill(false));
  const [stickyVisible, setStickyVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Contact form state
  const [phone, setPhone] = useState("+7");
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  // Filter states
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    brand: [],
    memory: [],
    storage: [],
    priceRange: [2000, 30000],
    features: [],
    availability: false,
    specialOffers: false,
  });

  // For mobile card indicators
  const [currentMobileIndex, setCurrentMobileIndex] = useState(0);
  const mobileScrollRef = useRef(null);
  // For card scroll progress bar
  const [scrollProgress, setScrollProgress] = useState(0);

  // Load products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('https://svb-shop-back.onrender.com/api/products');
        const data = await response.json();
        
        if (data.ok) {
          setProducts(data.items || []);
          if (data.items && data.items.length > 0) {
            setSelectedProduct(data.items[0]);
          }
        } else {
          setError(data.error || 'Ошибка загрузки товаров');
        }
      } catch (err) {
        console.error('Ошибка загрузки товаров:', err);
        setError('Не удалось загрузить товары');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setStickyVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatic banner rotation
  useEffect(() => {
    if (products.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % products.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [products.length]);

  // Enhanced product filtering
  const filteredProducts = products.filter((product) => {
    // Brand filter
    if (filters.brand.length > 0) {
      const productName = product.name.toLowerCase();
      const hasMatchingBrand = filters.brand.some((brand) =>
        productName.includes(brand.toLowerCase())
      );
      if (!hasMatchingBrand) {
        return false;
      }
    }

    // Enhanced memory filter
    if (filters.memory.length > 0 && product.specs) {
      const productMemory = product.specs.find((spec) =>
        spec.toLowerCase().includes('оперативная память') || 
        spec.toLowerCase().includes('память') ||
        spec.toLowerCase().includes('ram')
      );
      
      if (!productMemory) {
        return false;
      }
      
      // Extract all memory values from the string
      const memoryMatches = productMemory.match(/(\d+)\s*ГБ/gi) || 
                           productMemory.match(/(\d+)\s*GB/gi) ||
                           productMemory.match(/\b(\d+)\s*[ГG]?[БB]?\b/gi);
      
      if (!memoryMatches) {
        return false;
      }
      
      // Check if at least one memory value matches the filter
      const hasMatchingMemory = filters.memory.some((filterMemory) =>
        memoryMatches.some((match) => match.includes(filterMemory))
      );
      
      if (!hasMatchingMemory) {
        return false;
      }
    }

    // Enhanced storage filter
    if (filters.storage.length > 0 && product.specs) {
      const productStorage = product.specs.find((spec) =>
        spec.toLowerCase().includes('встроенная память') || 
        spec.toLowerCase().includes('память') ||
        spec.toLowerCase().includes('storage') ||
        spec.toLowerCase().includes('rom')
      );
      
      if (!productStorage) {
        return false;
      }
      
      // Extract all storage values from the string
      const storageMatches = productStorage.match(/(\d+)\s*ГБ/gi) || 
                            productStorage.match(/(\d+)\s*GB/gi) ||
                            productStorage.match(/\b(\d+)\s*[ГG]?[БB]?\b/gi);
      
      if (!storageMatches) {
        return false;
      }
      
      // Check if at least one storage value matches the filter
      const hasMatchingStorage = filters.storage.some((filterStorage) =>
        storageMatches.some((match) => match.includes(filterStorage))
      );
      
      if (!hasMatchingStorage) {
        return false;
      }
    }

    // Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }

    // Special offers filter
    if (filters.specialOffers && product.type !== "promotional") {
      return false;
    }

    return true;
  });

  // Update index on scroll
  useEffect(() => {
    const el = mobileScrollRef.current;
    if (!el) return;
    const updateProgress = () => {
      const children = el.querySelectorAll("[data-card-index]");
      let minDiff = Infinity;
      let idx = 0;
      const containerRect = el.getBoundingClientRect();
      const containerCenter = (containerRect.left + containerRect.right) / 2;
      children.forEach((child, i) => {
        const rect = child.getBoundingClientRect();
        const cardCenter = (rect.left + rect.right) / 2;
        const diff = Math.abs(cardCenter - containerCenter);
        if (diff < minDiff) {
          minDiff = diff;
          idx = i;
        }
      });
      setCurrentMobileIndex(idx);
      const maxScroll = el.scrollWidth - el.clientWidth;
      setScrollProgress(maxScroll > 0 ? el.scrollLeft / maxScroll : 0);
    };
    el.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
    return () => {
      el.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [filteredProducts.length]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    scrollToTop();
    if (window.ym) {
      window.ym(103576778, "reachGoal", "add_to_cart");
    }
    const button = document.querySelector(`[data-product-id="${product.id}"]`);
    if (button) {
      button.classList.add("animate-ping");
      setTimeout(() => button.classList.remove("animate-ping"), 500);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const nextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentProductIndex(
      (prev) => (prev - 1 + products.length) % products.length
    );
  };

  const selectProduct = (index) => {
    setCurrentProductIndex(index);
  };

  const openProductDetails = (product) => {
    router.push(`/product/${product.id}`);
  };

  const currentProduct = products[currentProductIndex];

  const calculateTotal = () => {
    return cart.length > 0 ? cart[0].price * cart[0].quantity : 0;
  };

  const handleCheckout = () => {
    setIsOrderFormOpen(true);
    if (window.ym) {
      window.ym(103576778, "reachGoal", "checkout");
    }
  };

  const toggleFaq = (index) => {
    const newFaqState = [...isFaqOpen];
    newFaqState[index] = !newFaqState[index];
    setIsFaqOpen(newFaqState);
  };

  const openVideoReview = (review) => {
    setSelectedReview(review);
  };

  const closeVideoReview = () => {
    setSelectedReview(null);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("+7")) {
      value = "+7" + value.replace(/[^0-9]/g, "");
    }
    if (value.length <= 16) {
      setPhone(value);
    }
  };

  const handleSubmitQuestion = async () => {
    if (phone.length < 11) {
      setError("Введите корректный номер телефона");
      return;
    }

    setIsSending(true);
    setError("");
    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `Новый вопрос с сайта SVB SHOP - ТВ без подписок (форма: "Остались вопросы?")\nТелефон: ${phone}\nВопрос: ${question}`,
          type: "question",
        }),
      });

      if (response.ok) {
        setIsSent(true);
        setPhone("+7");
        setQuestion("");
        if (window.ym) {
          window.ym(103576778, "reachGoal", "question_submit");
        }
        setTimeout(() => setIsSent(false), 3000);
        setTimeout(() => router.push("/complete"), 500);
      } else {
        setError("Ошибка при отправке. Попробуйте позже.");
      }
    } catch (err) {
      setError("Сетевая ошибка. Попробуйте снова.");
    } finally {
      setIsSending(false);
    }
  };

  const handleFiltersChange = (changes) => {
    setFilters((prev) => ({ ...prev, ...changes }));
  };

  const clearFilters = () => {
    setFilters({
      brand: [],
      memory: [],
      storage: [],
      priceRange: [2000, 30000],
      features: [],
      availability: false,
      specialOffers: false,
    });
  };

  const applyFilters = () => {
    // Filtering is applied automatically when filters change
  };

  // SVG filter icon
  const MinimalFilterIcon = () => (
    <svg
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      className="inline-block mr-1 text-gray-700 align-middle"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="16" height="2" rx="1" fill="currentColor" />
      <rect x="5" y="9" width="10" height="2" rx="1" fill="currentColor" />
      <rect x="8" y="14" width="4" height="2" rx="1" fill="currentColor" />
    </svg>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Попробовать снова
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-sans text-gray-800">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="container mx-auto px-2 md:px-4 py-8 max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Render sections based on activeView */}
            {activeView === "home" && (
              <div className="space-y-8">
                {/* Hero Section - Multi-banner */}
                <HeroBanner
                  products={products}
                  onCtaClick={() => router.push("/catalog")}
                  onProductClick={(productId) =>
                    router.push(`/product/${productId}`)
                  }
                />

                {/* Quiz — moved up, right after banner for better conversion */}
                <div id="quiz" className="mt-6">
                  <QuickQuiz />
                </div>

                {/* Features Section */}
                <motion.div
                  className="py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ staggerChildren: 0.1 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Почему стоит выбрать нашу приставку
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        icon: <TVIcon className="w-10 h-10 text-blue-600" />,
                        title: "3000+ ТВ-каналов",
                        desc: "Без абонплаты и подписок",
                      },
                      {
                        icon: (
                          <CinemaIcon className="w-10 h-10 text-purple-600" />
                        ),
                        title: "Онлайн-кинотеатры",
                        desc: "На борту 7 онлайн кинотеатров",
                      },
                      {
                        icon: (
                          <YouTubeIcon className="w-10 h-10 text-red-600" />
                        ),
                        title: "YouTube без рекламы",
                        desc: "Полный доступ к Google Play",
                      },
                      {
                        icon: <EasyIcon className="w-10 h-10 text-green-600" />,
                        title: "Простая система",
                        desc: "Разберётся человек с любым уровнем подготовки",
                      },
                    ].map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                          <CardContent className="p-6 flex items-start">
                            <div className="mr-4">{feature.icon}</div>
                            <div>
                              <h3 className="text-xl font-bold mb-2">
                                {feature.title}
                              </h3>
                              <p className="text-gray-600">{feature.desc}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Catalog Section - moved up to show products earlier */}
                <motion.section
                  className="py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Доступные приставки для вашего телевизора
                  </h2>
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar filters for desktop */}
                    <div className="hidden md:block w-full max-w-xs">
                      <div className="sticky top-4">
                        <FiltersPanel
                          open={true}
                          onClose={() => {}}
                          filters={filters}
                          onFiltersChange={handleFiltersChange}
                          onApply={applyFilters}
                          onClear={clearFilters}
                          isMobile={false}
                        />
                      </div>
                    </div>
                    {/* Catalog content */}
                    <div className="w-full">
                      {/* Filter button only on mobile */}
                      <div className="mb-4 md:hidden flex items-center justify-between">
                        <span className="text-gray-500 text-sm">
                          Найдено: {filteredProducts.length}
                        </span>
                        <span
                          onClick={() => setIsFiltersOpen(true)}
                          className="text-gray-800 font-medium cursor-pointer select-none hover:underline active:opacity-70 flex items-center"
                          role="button"
                          tabIndex={0}
                          aria-label="Открыть фильтры"
                          onKeyDown={(e) =>
                            (e.key === "Enter" || e.key === " ") &&
                            setIsFiltersOpen(true)
                          }
                        >
                          <MinimalFilterIcon />
                          Фильтр
                        </span>
                      </div>
                      {/* Horizontal card shelf for mobile */}
                      <div className="relative md:hidden">
                        {/* Decorative shelf */}
                        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-gray-200 to-transparent rounded-t-lg z-10 pointer-events-none"></div>
                        {/* Horizontal scroll container */}
                        <div
                          ref={mobileScrollRef}
                          className="flex overflow-x-auto pb-8 -mb-8 hide-scrollbar scroll-smooth snap-x snap-mandatory"
                        >
                          <div className="flex space-x-4 pl-4 pr-8 min-w-max">
                            {filteredProducts
                              .slice(0, 3)
                              .map((product, idx) => (
                                <div
                                  key={product.id}
                                  data-card-index={idx}
                                  className="snap-center min-w-[75vw] max-w-[320px]"
                                >
                                  <ProductCard
                                    product={product}
                                    openProductDetails={openProductDetails}
                                  />
                                </div>
                              ))}
                            {/* "Show more" card */}
                            <div className="snap-center min-w-[75vw] max-w-[320px]">
                              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 h-full flex flex-col items-center justify-center p-6 hover:shadow-lg transition-all duration-300">
                                <div className="text-4xl mb-4">📺</div>
                                <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                                  Показать больше приставок
                                </h3>
                                <p className="text-sm text-gray-600 text-center mb-4">
                                  В каталоге {products.length} моделей
                                </p>
                                <Button
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    router.push("/catalog");
                                  }}
                                >
                                  Перейти в каталог →
                                </Button>
                              </Card>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Regular grid for desktop */}
                      <div className="hidden md:grid grid-cols-1 gap-6">
                        {filteredProducts.slice(0, 3).map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            openProductDetails={openProductDetails}
                          />
                        ))}
                        {/* "Show more" card for desktop */}
                        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-300 hover:shadow-lg transition-all duration-300">
                          <CardContent className="p-8 text-center">
                            <div className="text-6xl mb-6">📺</div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                              Показать больше приставок
                            </h3>
                            <p className="text-lg text-gray-600 mb-6">
                              В каталоге {products.length} моделей для
                              выбора
                            </p>
                            <Button
                              size="lg"
                              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3"
                              onClick={() => router.push("/catalog")}
                            >
                              Перейти в каталог →
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                  {/* Mobile filters panel (renders over content) */}
                  <FiltersPanel
                    open={isFiltersOpen}
                    onClose={() => setIsFiltersOpen(false)}
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onApply={applyFilters}
                    onClear={clearFilters}
                    isMobile={true}
                  />
                </motion.section>

                {/* How It Works Section - explain process after showing products */}
                <motion.section
                  className="py-12 bg-gradient-to-b from-gray-50 to-white rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                      Как это работает?
                    </h2>
                    {/* Progress bar */}
                    <div className="flex justify-center mb-8">
                      <div className="flex items-center w-full max-w-md">
                        {[1, 2, 3].map((step, index) => (
                          <React.Fragment key={step}>
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                index <= currentStep
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {step}
                            </div>
                            {index < 2 && (
                              <div
                                className={`flex-1 h-1 ${
                                  index < currentStep
                                    ? "bg-blue-600"
                                    : "bg-gray-200"
                                }`}
                              ></div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          icon: "🛒",
                          title: "Оформляете покупку",
                          desc: "Выберите приставку и оформите заказ онлайн за 2 минуты",
                        },
                        {
                          icon: "🔌",
                          title: "Подключаете к ТВ",
                          desc: (
                            <>
                              Подключите приставку к телевизору через HDMI и к
                              интернету
                              <br />
                              <a
                                href="https://telegra.ph/Instrukciya-po-podklyucheniyu-05-25"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline mt-2 inline-block"
                              >
                                Инструкция по подключению →
                              </a>
                            </>
                          ),
                        },
                        {
                          icon: "📺",
                          title: "Наслаждаетесь",
                          desc: "Смотрите 3000+ каналов, YouTube без рекламы, фильмы и сериалы",
                        },
                      ].map((step, index) => (
                        <motion.div
                          key={index}
                          className="text-center cursor-pointer"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 * index }}
                          onClick={() => setCurrentStep(index)}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="text-5xl mb-4">{step.icon}</div>
                          <h3 className="text-xl font-bold mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-600">{step.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.section>

                {/* Avito screenshots section */}
                <AvitoScreenshots />

                {/* Video Reviews Section */}
                <motion.section
                  className="py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                      Отзывы наших клиентов
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          name: "Иван Петров",
                          duration: "2 месяца",
                          videoSrc: "/videos/review1.mp4",
                        },
                        {
                          name: "Ольга Смирнова",
                          duration: "2 года",
                          videoSrc: "/videos/review2.mp4",
                        },
                        {
                          name: "Алексей Иванов",
                          duration: "4 года",
                          videoSrc: "/videos/review3.mp4",
                        },
                      ].map((review, index) => (
                        <motion.div
                          key={index}
                          className="bg-gray-100 rounded-xl overflow-hidden cursor-pointer"
                          whileHover={{ y: -5 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 * index }}
                          onClick={() => openVideoReview(review)}
                        >
                          <div className="aspect-video bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center relative">
                            <div className="text-center text-white">
                              <div className="text-4xl mb-2">📹</div>
                              <p>Видеоотзыв</p>
                              <p className="text-sm mt-1">{review.name}</p>
                            </div>
                            <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                              <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                                <svg
                                  className="w-8 h-8 text-gray-800"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <p className="font-medium">{review.name}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              Использует {review.duration}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.section>

                {/* FAQ Section */}
                <motion.section
                  className="py-12 bg-gradient-to-b from-white to-gray-50 rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                      Частые вопросы
                    </h2>
                    <div className="space-y-4">
                      {[
                        {
                          question: "Нужно ли платить за каналы каждый месяц?",
                          answer:
                            "Нет, после покупки приставки вы получаете доступ ко всем каналам без абонентской платы.",
                        },
                        {
                          question: "Будут ли обновления?",
                          answer:
                            "Да, мы регулярно обновляем программное обеспечение и добавляем новые функции.",
                        },
                        {
                          question: "Подойдет ли для моего телевизора?",
                          answer:
                            "Приставка работает с любым телевизором, имеющим HDMI-порт (HDMI входит в комплект).",
                        },
                        {
                          question: "Есть ли гарантия?",
                          answer:
                            "Да, предоставляем официальную гарантию 12 месяцев.",
                        },
                        {
                          question: "Как быстро доставите?",
                          answer:
                            "Доставка по России занимает 2-5 дней в зависимости от региона.",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="border rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <div
                            className="p-4 font-medium bg-gray-50 cursor-pointer flex justify-between items-center"
                            onClick={() => toggleFaq(index)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) =>
                              e.key === "Enter" && toggleFaq(index)
                            }
                          >
                            {item.question}
                            <PlusMinusIcon isOpen={isFaqOpen[index]} />
                          </div>
                          {isFaqOpen[index] && (
                            <motion.div
                              className="p-4 bg-white border-t"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <p>{item.answer}</p>
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.section>

                {/* Main lead capture form - Save on a new TV */}
                <SimpleLeadForm
                  heading="Сэкономьте на новом ТВ"
                  description={
                    <>
                      Старый телевизор? Не хотите тратить 20 000 ₽ на новый?
                      <br />
                      Оставьте заявку — подключим 3000+ каналов, YouTube без
                      рекламы, онлайн-кинотеатры и многое другое. Ваш телевизор
                      станет полноценным Smart TV. Приставки от 800 ₽.
                    </>
                  }
                  ctaLabel="Сэкономить 20 000 ₽"
                  telemetryLabel="lead_save_20000"
                  accent="blue"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer activeView={activeView} setActiveView={setActiveView} />

      {/* Sticky WhatsApp Button (Mobile, only on home) */}
      <AnimatePresence>
        {stickyVisible &&
          !isFiltersOpen &&
          activeView === "home" &&
          !selectedReview && (
            <motion.div
              className="fixed bottom-4 left-0 right-0 z-50 px-4 md:hidden"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.3 }}
            >
              <a
                href="https://wa.me/79922200037"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center shadow-lg py-6 text-lg bg-gradient-to-r from-green-400 to-green-600 text-white font-bold rounded-xl hover:from-green-500 hover:to-green-700 transition-colors"
                aria-label="Написать консультанту в WhatsApp"
              >
                Написать консультанту
              </a>
            </motion.div>
          )}
      </AnimatePresence>

      {/* Order Form */}
      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        cart={cart}
        total={calculateTotal()}
      />
    </div>
  );
}

// Icon Components
const StarIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label="Звезда"
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const TVIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-label="Телевизор"
  >
    <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
    <path d="M17 2l-5 5-5-5"></path>
  </svg>
);

const CinemaIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-label="Кинотеатр"
  >
    <path d="M7 2v20M17 2v20M3 7h4M3 11h4M3 15h4m10 0h4m0-4h-4m0-4h4M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
  </svg>
);

const YouTubeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label="YouTube"
  >
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

const EasyIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-label="Простота"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8 12h8"></path>
    <path d="M12 8v8"></path>
  </svg>
);

const PlusMinusIcon = ({ isOpen }) => (
  <svg
    className={`w-6 h-6 text-gray-500 transition-transform ${
      isOpen ? "rotate-180" : ""
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-label={isOpen ? "Свернуть" : "Развернуть"}
  >
    {isOpen ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 12H4"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    )}
  </svg>
);

const ChevronLeftIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    aria-label="Предыдущий товар"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    aria-label="Следующий товар"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
