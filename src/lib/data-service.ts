import type { Product, CategoryData, SiteData } from '@/types/data';

// Кэш для данных
const cache = new Map<string, any>();

// Базовые данные сайта
const siteData: SiteData = {
  meta: {
    name: "SVB SHOP - ТВ без подписок",
    description: "Smart TV приставки для комфортного просмотра контента",
    baseUrl: "https://tv-bez-podpiski.ru"
  },
  categories: {
    home: {
      id: "home",
      name: "Главная",
      description: "Лучшие Smart TV приставки для вашего дома",
      meta: {
        title: "Купить Smart TV приставку в России | ТВ без подписок | SVB SHOP",
        description: "Купите Smart TV приставку с 3000+ каналами без абонплаты. YouTube работает, онлайн кинотеатры бесплатно. Доставка по всей России, оплата при получении. Цены от 4000₽.",
        keywords: [
          "smart tv приставка купить",
          "тв приставка android",
          "android tv box",
          "медиаплеер для телевизора",
          "приставка для тв с интернетом",
          "тв бокс купить",
          "smart tv приставка цена",
          "android приставка для телевизора",
          "тв приставка с каналами",
          "приставка для старого телевизора",
          "smart tv box",
          "android tv приставка",
          "медиаплеер android",
          "тв приставка без абонплаты",
          "smart tv приставка отзывы"
        ],
        ogImage: "/og/home.jpg"
      },
      products: []
    },
    catalog: {
      id: "catalog",
      name: "Каталог",
      description: "Полный каталог Smart TV приставок",
      meta: {
        title: "Каталог Smart TV приставок | Цены и характеристики | SVB SHOP",
        description: "Каталог Smart TV приставок с подробными характеристиками. VONTAR W2, Tanix W2, P7, Mortal T1. 3000+ каналов без абонплаты. России.",
        keywords: [
          "каталог smart tv приставок",
          "smart tv приставки цены",
          "android tv приставки характеристики",
          "тв приставки каталог",
          "smart tv box каталог",
          "android приставки для тв",
          "медиаплееры каталог",
          "тв боксы цены",
          "smart tv приставки отзывы",
          "android tv box характеристики",
          "приставки для телевизора каталог",
          "smart tv приставки купить",
          "android тв приставки",
          "медиаплеер android купить",
          "тв приставка с каналами купить"
        ],
        ogImage: "/og/catalog.jpg"
      },
      products: []
    },
    about: {
      id: "about",
      name: "О нас",
      description: "Информация о компании SVB SHOP - ТВ без подписок",
      meta: {
        title: "О компании SVB SHOP | Smart TV приставки | Доставка по России",
        description: "SVB SHOP - надежный поставщик Smart TV приставок в России. Качественные товары, быстрая доставка, оплата при получении. Гарантия на все товары.",
        keywords: [
          "svb shop отзывы",
          "тв без подписок",
          "smart tv приставки россия",
          "доставка тв приставок",
          "купить smart tv в россии",
          "android tv box россия",
          "медиаплееры доставка",
          "тв приставки интернет магазин",
          "smart tv приставки отзывы",
          "android приставки купить",
          "тв боксы россия",
          "медиаплеер android россия",
          "smart tv box купить",
          "приставки для телевизора россия",
          "тв приставки с каналами"
        ],
        ogImage: "/og/about.jpg"
      },
      products: []
    }
  }
};

// Функция для получения данных сайта
export async function getSiteData(): Promise<SiteData> {
  if (cache.has('siteData')) {
    return cache.get('siteData');
  }
  
  cache.set('siteData', siteData);
  return siteData;
}

// Функция для получения данных категории
export async function getCategoryData(categoryId: string): Promise<CategoryData | null> {
  const siteData = await getSiteData();
  return siteData.categories[categoryId] || null;
}

// Функция для получения всех доступных категорий
export async function getAvailableCategories(): Promise<string[]> {
  const siteData = await getSiteData();
  return Object.keys(siteData.categories);
}

// Функция для получения продуктов из текущего кода
export function getProductsFromCode(): Product[] {
  const allProducts = [
    {
      id: "1",
      name: "VONTAR W2 ATV 4/32",
      price: 4000,
      oldPrice: 5714,
      image: "https://i.ibb.co/KjQytm1C/7225679643.webp",
      additionalImages: [
        "https://i.ibb.co/23KSD7qv/6821401352.webp",
        "https://i.ibb.co/0y687tHj/6840859136.webp",
        "https://i.ibb.co/N2XwjdHt/6840859131.webp",
      ],
      specs: [
        "3000+ ТВ-каналов без абонплаты",
        "YouTube без рекламы",
        "ОНЛАЙН КИНОТЕАТРЫ 5+ БЕСПЛАТНО",
        "Android TV 11",
        "Оперативная память: 4 ГБ",
        "Встроенная память: 32 ГБ",
        "Wi-Fi: 2.4/5 ГГц",
        "Ethernet 100 Мбит/с",
        "HDMI 2.0, 4K поддержка",
        "Автоматические обновления приложений",
        "Гарантия 12 месяцев",
      ],
      type: "promotional",
      description: "🔥ТВ приставка с 3000+ каналами и YouTube без рекламы",
      shortDesc: "Smart TV приставка с 3000+ каналами",
      meta: {
        title: "VONTAR W2 ATV 4/32 - Купить Smart TV приставку | 3000+ каналов без абонплаты",
        description: "Купите VONTAR W2 ATV Smart TV приставку за 4000₽. Android TV 11, 4ГБ RAM, 32ГБ ROM. 3000+ каналов без абонплаты, YouTube без рекламы. Доставка по России.",
        keywords: [
          "vontar w2 atv купить",
          "vontar w2 atv цена",
          "smart tv приставка 4гб 32гб",
          "android tv 11 приставка",
          "тв приставка с каналами",
          "smart tv box 4gb 32gb",
          "android приставка для телевизора",
          "медиаплеер android tv",
          "тв бокс с каналами",
          "smart tv приставка отзывы",
          "android tv box купить",
          "приставка для тв с интернетом",
          "медиаплеер для телевизора",
          "тв приставка без абонплаты",
          "smart tv приставка характеристики"
        ],
        ogImage: "https://i.ibb.co/yn5S0zDB/capture-20250609144002448.jpg"
      }
    },
    {
      id: "2",
      name: "Tanix W2 4/32",
      price: 4000,
      image: "https://i.ibb.co/XkMQyVSP/1-r98-WGra4-Az-Ygr-YE7-RDz-K3i-7-ATCou4-Eg-ILYBNKaz-Czyg-7-K6-NVAh0m-Eemv-Fc-WOFO2bp-Lh-G4-D-mq-Hr-J.jpg",
      additionalImages: [
        "https://i.ibb.co/5x8yVRfQ/7390298369.webp",
        "https://i.ibb.co/3m0n7TQT/7390298396.webp",
        "https://i.ibb.co/zWcz87kw/7390298375.webp",
      ],
      specs: [
        "3000+ ТВ-каналов без абонплаты",
        "YouTube без рекламы",
        "ОНЛАЙН КИНОТЕАТРЫ 5+ БЕСПЛАТНО",
        "Android TV 11",
        "Процессор: S905W2, 4 ядра ARM Cortex A35",
        "Графика: Mali-G31",
        "Оперативная память: 4 ГБ DDR4",
        "Встроенная память: 32 ГБ eMMC",
        "Wi-Fi 2.4G/5G, Ethernet, Bluetooth 4.0",
        "HDMI 2.0, 4K поддержка",
        "Автоматические обновления приложений",
      ],
      type: "hit", // Хит продаж
      description: "🔥ТВ приставка с 3000+ каналами и YouTube без рекламы",
      shortDesc: "Smart TV приставка с быстрым процессором",
      meta: {
        title: "Tanix W2 4/32 - Купить Smart TV приставку | Хит продаж | Быстрый процессор",
        description: "Купите Tanix W2 Smart TV приставку за 4000₽. Процессор S905W2, 4ГБ DDR4, 32ГБ eMMC. 3000+ каналов без абонплаты. Хит продаж! Доставка по России.",
        keywords: [
          "tanix w2 купить",
          "tanix w2 цена",
          "smart tv приставка s905w2",
          "android tv приставка 4гб ddr4",
          "тв приставка с быстрым процессором",
          "smart tv box tanix",
          "android приставка tanix",
          "медиаплеер tanix w2",
          "тв бокс tanix",
          "smart tv приставка характеристики",
          "android tv box tanix w2",
          "приставка для тв tanix",
          "медиаплеер для телевизора tanix",
          "тв приставка без абонплаты tanix",
          "smart tv приставка отзывы tanix"
        ],
        ogImage: "https://i.ibb.co/XkMQyVSP/1-r98-WGra4-Az-Ygr-YE7-RDz-K3i-7-ATCou4-Eg-ILYBNKaz-Czyg-7-K6-NVAh0m-Eemv-Fc-WOFO2bp-Lh-G4-D-mq-Hr-J.jpg"
      }
    },
    {
      id: "3",
      name: "P7",
      price: 5000,
      image: "https://i.ibb.co/8gD2ckCy/1-f6-Iqlra400sc-IVFGWNNN5zk30-U2-UN1-Fd-HDr-RSZo-20-Gc.jpg",
      additionalImages: [
        "https://i.ibb.co/xtkRm5Nk/7348213856.webp",
        "https://i.ibb.co/HL9kLwKw/7348213854.webp",
        "https://i.ibb.co/67k4bqzd/7348213883.webp",
      ],
      specs: [
        "3000+ ТВ-каналов без абонплаты",
        "YouTube без рекламы",
        "ОНЛАЙН КИНОТЕАТРЫ 5+ БЕСПЛАТНО",
        "Android TV 12",
        "Процессор: Allwinner H618, 4 ядра",
        "Графика: Mali-G31 MP2",
        "Оперативная память: 4 ГБ DDR4",
        "Встроенная память: 32 ГБ eMMC",
        "4K HDR, AV1, VP9, H.265, MPEG-4",
        "Wi-Fi 2.4G/5G, Ethernet 100 Мбит/с",
        "Голосовой пульт управления",
      ],
      type: "new", // Новая модель
      description: "🔥ТВ приставка с 3000+ каналами и YouTube без рекламы",
      shortDesc: "Smart TV приставка Android TV 12 с голосовым пультом",
      meta: {
        title: "P7 - Купить Smart TV приставку Android TV 12 | Голосовой пульт | Новая модель",
        description: "Купите P7 Smart TV приставку за 5000₽. Android TV 12, процессор Allwinner H618, 4K HDR, голосовой пульт. 3000+ каналов без абонплаты. Новая модель! Доставка по России.",
        keywords: [
          "p7 smart tv приставка купить",
          "p7 android tv 12",
          "smart tv приставка с голосовым пультом",
          "android tv 12 приставка",
          "allwinner h618 приставка",
          "4k hdr тв приставка",
          "smart tv box p7",
          "android приставка p7",
          "медиаплеер p7",
          "тв бокс p7",
          "smart tv приставка характеристики p7",
          "android tv box p7 купить",
          "приставка для тв p7",
          "медиаплеер для телевизора p7",
          "тв приставка без абонплаты p7"
        ],
        ogImage: "https://i.ibb.co/8gD2ckCy/1-f6-Iqlra400sc-IVFGWNNN5zk30-U2-UN1-Fd-HDr-RSZo-20-Gc.jpg"
      }
    },
    {
      id: "4",
      name: "Mortal T1 4K ТВ приставка Android 13",
      price: 6000,
      image: "https://i.ibb.co/21LmSRSh/S744bf49f2198437f886ae5c04e07355bl.webp",
      additionalImages: [
        "https://i.ibb.co/5DH1hSN/7419516896.webp",
        "https://i.ibb.co/CptQ4c17/7419516995.webp",
        "https://i.ibb.co/qFRvcjj4/7419516770.webp",
      ],
      specs: [
        "3000+ ТВ-каналов без абонплаты",
        "YouTube без рекламы в 4K",
        "ОНЛАЙН КИНОТЕАТРЫ 5+ БЕСПЛАТНО",
        "Android 13 TV с Google TV",
        "Процессор Allwinner H313, 4 ядра",
        "Графика Mali-G31 MP2",
        "Оперативная память: 2 ГБ",
        "Встроенная память: 16 ГБ",
        "4K @ 60 Гц, HDR10+, HLG, Dolby Vision",
        "Wi-Fi 5 (802.11ac), Bluetooth, Ethernet 100 Мбит/с",
        "2x USB 2.0, MicroSD до 128 ГБ, Google Cast",
      ],
      type: "hit", // Хит продаж
      description: "🔥ТВ приставка с 3000+ каналами и YouTube без рекламы",
      shortDesc: "4K ТВ приставка Android 13 с Google TV",
      meta: {
        title: "Mortal T1 4K - Купить Smart TV приставку Android 13 | Google TV | Хит продаж",
        description: "Купите Mortal T1 4K Smart TV приставку за 6000₽. Android 13 TV с Google TV, 4K @ 60 Гц, HDR10+, Dolby Vision. 3000+ каналов без абонплаты. Хит продаж! Доставка по России.",
        keywords: [
          "mortal t1 купить",
          "mortal t1 цена",
          "smart tv приставка android 13",
          "google tv приставка",
          "4k smart tv приставка",
          "hdr10+ тв приставка",
          "dolby vision приставка",
          "smart tv box mortal t1",
          "android приставка mortal t1",
          "медиаплеер mortal t1",
          "тв бокс mortal t1",
          "smart tv приставка характеристики mortal t1",
          "android tv box mortal t1 купить",
          "приставка для тв mortal t1",
          "медиаплеер для телевизора mortal t1"
        ],
        ogImage: "https://i.ibb.co/21LmSRSh/S744bf49f2198437f886ae5c04e07355bl.webp"
      }
    },
    {
      id: "5",
      name: "UGOOS X4Q PRO ТВ приставка 4ГБ 32ГБ",
      price: 9800,
      image: "https://i.ibb.co/CKWQmBvV/S07189624587b428ea69ef9f7f4f7a375r-jpg-640x640.webp",
      additionalImages: [
        "https://i.ibb.co/rGNT3BGs/7639663110.webp",
        "https://i.ibb.co/MxrCJkQW/7639663097.webp",
        "https://i.ibb.co/fG9Dbszm/7639663100.webp",
      ],
      specs: [
        "3000+ ТВ-каналов без абонплаты",
        "YouTube без рекламы в 4K",
        "ОНЛАЙН КИНОТЕАТРЫ 5+ БЕСПЛАТНО",
        "Android 11.0 с OTA обновлениями",
        "Процессор Amlogic S905X4, 4 ядра ARM Cortex-A55",
        "Графика ARM G31 MP2 GPU",
        "Оперативная память: 4 ГБ DDR4",
        "Встроенная память: 32 ГБ eMMC Flash",
        "4K UHD видеовыход, HDMI 2.0",
        "Wi-Fi 2.4G/5 ГГц, Bluetooth, Ethernet 1000 Мбит/с",
        "MicroSD до 128 ГБ, DC 5В, 2А",
      ],
      type: "regular",
      description: "🔥ТВ приставка с 3000+ каналами и YouTube без рекламы",
      shortDesc: "4K ТВ приставка с Ethernet 1000 Мбит/с",
      meta: {
        title: "UGOOS X4Q PRO - 4K ТВ приставка с Ethernet 1000 Мбит/с",
        description: "UGOOS X4Q PRO - 4K Smart TV приставка с Android 11, процессором Amlogic S905X4, 4ГБ DDR4, Ethernet 1000 Мбит/с.",
        keywords: ["ugoos x4q pro", "amlogic s905x4", "4k uhd", "ethernet 1000", "android 11", "smart tv"],
        ogImage: "https://i.ibb.co/CKWQmBvV/S07189624587b428ea69ef9f7f4f7a375r-jpg-640x640.webp"
      }
    },
    {
      id: "6",
      name: "UGOOS SK1 ТВ-приставка Android 11 8ГБ 128ГБ",
      price: 25000,
      image: "https://i.ibb.co/wZW0ftrK/7573755794.webp",
      additionalImages: [
        "https://i.ibb.co/QvHnSXLd/7573755789.webp",
        "https://i.ibb.co/YBs81VbJ/7573755802.webp",
        "https://i.ibb.co/99hTwM89/7573755800.webp",
      ],
      specs: [
        "3000+ ТВ-каналов без абонплаты",
        "YouTube без рекламы в 4K",
        "ОНЛАЙН КИНОТЕАТРЫ 5+ БЕСПЛАТНО",
        "Android 11 с OTA обновлениями",
        "Процессор Amlogic S928X-K, 2.0GHz, ARM Cortex-A76 & A55",
        "Графика Mali G57 MC2",
        "Оперативная память: 8 ГБ",
        "Встроенная память: 128 ГБ",
        "Dolby Vision, Dolby Atmos, H.265/HEVC, VP9",
        "Ethernet 1000 Мбит/с, Wi-Fi, Bluetooth",
        "1x USB 2.0, 1x USB 3.0, MicroSD до 64 ГБ",
      ],
      type: "regular",
      description: "🔥ТВ приставка с 3000+ каналами и YouTube без рекламы",
      shortDesc: "Премиум ТВ приставка 8ГБ 128ГБ с Dolby Vision",
      meta: {
        title: "UGOOS SK1 - Премиум ТВ приставка 8ГБ 128ГБ с Dolby Vision",
        description: "UGOOS SK1 - премиум Smart TV приставка с Android 11, 8ГБ RAM, 128ГБ ROM, Dolby Vision, Dolby Atmos. Максимальная производительность.",
        keywords: ["ugoos sk1", "8гб", "128гб", "dolby vision", "dolby atmos", "премиум", "smart tv"],
        ogImage: "https://i.ibb.co/wZW0ftrK/7573755794.webp"
      }
    },
    {
      id: "7",
      name: "VONTAR W2 ATV 2/16",
      price: 3500,
      image: "https://i.ibb.co/hR7yWGn7/7381821526.webp",
      additionalImages: [
        "https://i.ibb.co/23KSD7qv/6821401352.webp",
        "https://i.ibb.co/0y687tHj/6840859136.webp",
        "https://i.ibb.co/N2XwjdHt/6840859131.webp",
      ],
      specs: [
        "3000+ ТВ-каналов без абонплаты",
        "YouTube без рекламы",
        "ОНЛАЙН КИНОТЕАТРЫ 5+ БЕСПЛАТНО",
        "Android TV 11",
        "Оперативная память: 2 ГБ",
        "Встроенная память: 16 ГБ",
        "Wi-Fi: 2.4/5 ГГц",
        "Ethernet 100 Мбит/с",
        "HDMI 2.0, 4K поддержка",
        "Автоматические обновления приложений",
        "Гарантия 12 месяцев",
      ],
      type: "regular",
      description: "🔥ТВ приставка с 3000+ каналами и YouTube без рекламы",
      shortDesc: "Smart TV приставка с 3000+ каналами",
      meta: {
        title: "VONTAR W2 ATV 2/16 - Smart TV приставка с 3000+ каналами",
        description: "VONTAR W2 ATV 2/16 - Smart TV приставка с Android TV 11, 2ГБ RAM, 16ГБ ROM. 3000+ каналов без абонплаты, YouTube без рекламы.",
        keywords: ["vontar w2 atv", "android tv 11", "2гб", "16гб", "smart tv", "тв приставка", "каналы"],
        ogImage: "https://i.ibb.co/yn5S0zDB/capture-20250609144002448.jpg"
      }
    },
    {
      id: "8",
      name: "Tanix W2 2/16",
      price: 3500,
      image: "https://i.ibb.co/XkMQyVSP/1-r98-WGra4-Az-Ygr-YE7-RDz-K3i-7-ATCou4-Eg-ILYBNKaz-Czyg-7-K6-NVAh0m-Eemv-Fc-WOFO2bp-Lh-G4-D-mq-Hr-J.jpg",
      additionalImages: [
        "https://i.ibb.co/5x8yVRfQ/7390298369.webp",
        "https://i.ibb.co/3m0n7TQT/7390298396.webp",
        "https://i.ibb.co/zWcz87kw/7390298375.webp",
      ],
      specs: [
        "3000+ ТВ-каналов без абонплаты",
        "YouTube без рекламы",
        "ОНЛАЙН КИНОТЕАТРЫ 5+ БЕСПЛАТНО",
        "Android TV 11",
        "Процессор: S905W2, 4 ядра ARM Cortex A35",
        "Графика: Mali-G31",
        "Оперативная память: 2 ГБ DDR4",
        "Встроенная память: 16 ГБ eMMC",
        "Wi-Fi 2.4G/5G, Ethernet, Bluetooth 4.0",
        "HDMI 2.0, 4K поддержка",
        "Автоматические обновления приложений",
      ],
      type: "regular",
      description: "🔥ТВ приставка с 3000+ каналами и YouTube без рекламы",
      shortDesc: "Smart TV приставка с быстрым процессором",
      meta: {
        title: "Tanix W2 2/16 - Smart TV приставка с быстрым процессором",
        description: "Tanix W2 2/16 - Smart TV приставка с Android TV 11, процессором S905W2, 2ГБ DDR4, 16ГБ eMMC. 3000+ каналов без абонплаты.",
        keywords: ["tanix w2", "s905w2", "android tv 11", "2гб ddr4", "16гб emmc", "smart tv"],
        ogImage: "https://i.ibb.co/XkMQyVSP/1-r98-WGra4-Az-Ygr-YE7-RDz-K3i-7-ATCou4-Eg-ILYBNKaz-Czyg-7-K6-NVAh0m-Eemv-Fc-WOFO2bp-Lh-G4-D-mq-Hr-J.jpg"
      }
    },
    {
      id: "9",
      name: "ZTE B866 2/8",
      price: 2800,
      image: "https://i.ibb.co/1tmCm9f5/6101018b1a67c3093240762b-1.jpg",
      additionalImages: [
        "https://i.ibb.co/MkMzwx7b/6904138096.jpg",
        "https://i.ibb.co/TBwy5WDJ/100031763503b0.jpg",
        "https://i.ibb.co/xSDpTFdK/50130198b4.jpg",
      ],
      specs: [
        "3000+ ТВ-каналов без абонплаты",
        "YouTube без рекламы",
        "ОНЛАЙН КИНОТЕАТРЫ 5+ БЕСПЛАТНО",
        "Android TV",
        "Оперативная память: 2 ГБ",
        "Встроенная память: 8 ГБ",
        "Wi-Fi поддержка",
        "HDMI выход",
        "Компактный дизайн",
      ],
      type: "regular",
      description: "🔥Компактная ТВ приставка с базовым функционалом",
      shortDesc: "Бюджетная Smart TV приставка",
      meta: {
        title: "ZTE B866 2/8 - Бюджетная Smart TV приставка",
        description: "ZTE B866 2/8 - доступная Smart TV приставка с Android TV, 2ГБ RAM, 8ГБ ROM. Отличное решение для базового использования.",
        keywords: ["zte b866", "android tv", "2гб", "8гб", "бюджетная", "smart tv"],
        ogImage: "https://i.ibb.co/xSBqLqzp/zte-b866v2-1.jpg"
      }
    },
    {
      id: "10",
      name: "DV 8235 2/8",
      price: 3000,
      image: "https://i.ibb.co/LdvRdQ65/1-x-X-1r7a4a-Za-DBqu-Ts-i2-Qr-MNa5-ALDuuewwtrl-AUGYZw-D.jpg",
      additionalImages: [
        "https://i.ibb.co/Df7J78hJ/20151229032431922.jpg",
        "https://i.ibb.co/zTM9xykQ/26350532.png",
        "https://i.ibb.co/svgM8CWr/orig.png",
      ],
      specs: [
        "3000+ ТВ-каналов без абонплаты",
        "YouTube без рекламы",
        "ОНЛАЙН КИНОТЕАТРЫ 5+ БЕСПЛАТНО",
        "Android TV",
        "Оперативная память: 2 ГБ",
        "Встроенная память: 8 ГБ",
        "Wi-Fi поддержка",
        "HDMI выход",
        "Стабильная работа",
      ],
      type: "regular",
      description: "🔥Надежная ТВ приставка для ежедневного использования",
      shortDesc: "Надежная Smart TV приставка",
      meta: {
        title: "DV 8235 2/8 - Надежная Smart TV приставка",
        description: "DV 8235 2/8 - надежная Smart TV приставка с Android TV, 2ГБ RAM, 8ГБ ROM. Стабильная работа для повседневного использования.",
        keywords: ["dv 8235", "android tv", "2гб", "8гб", "надежная", "smart tv"],
        ogImage: "https://i.ibb.co/pKBKJfyH/dv8235-1.jpg"
      }
    },
    {
      id: "11",
      name: "DV 9135 2/8",
      price: 3000,
      image: "https://i.ibb.co/LDTbwwMH/pristavka-mts-tv-SDMC-DV9135.webp",
      additionalImages: [
        "https://i.ibb.co/0jrH0pq8/600x600.jpg",
        "https://i.ibb.co/pvK0ky5V/600x600.jpg",
        "https://i.ibb.co/MD10gRHx/600x600.jpg",
      ],
      specs: [
        "3000+ ТВ-каналов без абонплаты",
        "YouTube без рекламы",
        "ОНЛАЙН КИНОТЕАТРЫ 5+ БЕСПЛАТНО",
        "Android TV",
        "Оперативная память: 2 ГБ",
        "Встроенная память: 8 ГБ",
        "Wi-Fi поддержка",
        "HDMI выход",
        "Улучшенная производительность",
      ],
      type: "regular",
      description: "🔥Улучшенная ТВ приставка с хорошей производительностью",
      shortDesc: "Улучшенная Smart TV приставка",
      meta: {
        title: "DV 9135 2/8 - Улучшенная Smart TV приставка",
        description: "DV 9135 2/8 - улучшенная Smart TV приставка с Android TV, 2ГБ RAM, 8ГБ ROM. Хорошая производительность для развлечений.",
        keywords: ["dv 9135", "android tv", "2гб", "8гб", "улучшенная", "smart tv"],
        ogImage: "https://i.ibb.co/LDTbwwMH/pristavka-mts-tv-SDMC-DV9135.webp"
      }
    },
    {
      id: "12",
      name: "SML-482 HD",
      price: 1500,
      image: "https://i.ibb.co/BH4qZDSd/600x600.jpg",
      additionalImages: [
        "https://i.ibb.co/tG93kSn/600x600.jpg",
        "https://i.ibb.co/g1DrqW4/600x600.jpg",
        "https://i.ibb.co/bgxdbffk/600x600.jpg",
      ],
      specs: [
        "HD качество видео",
        "Базовый функционал",
        "Простое управление",
        "HDMI выход",
        "Компактный размер",
        "Доступная цена",
      ],
      type: "regular",
      description: "💰Базовая HD приставка по доступной цене",
      shortDesc: "Базовая HD приставка",
      meta: {
        title: "SML-482 HD - Базовая HD приставка",
        description: "SML-482 HD - базовая HD приставка по доступной цене. Простое решение для просмотра контента в HD качестве.",
        keywords: ["sml-482", "hd", "базовая", "доступная", "приставка"],
        ogImage: "https://i.ibb.co/BH4qZDSd/600x600.jpg"
      }
    },
    {
      id: "13",
      name: "IPTV-HD mini",
      price: 1000,
      image: "https://i.ibb.co/JW7Ncv9r/600x600.jpg",
      additionalImages: [
        "https://i.ibb.co/Gr3r08c/600x600.jpg",
        "https://i.ibb.co/ymdrrJtM/600x600.jpg",
        "https://i.ibb.co/wNJWhMYP/600x600.jpg",
      ],
      specs: [
        "IPTV поддержка",
        "HD качество",
        "Мини размер",
        "Простая настройка",
        "Низкое энергопотребление",
        "Самая доступная цена",
      ],
      type: "regular",
      description: "💰Самая доступная IPTV приставка",
      shortDesc: "Мини IPTV приставка",
      meta: {
        title: "IPTV-HD mini - Мини IPTV приставка",
        description: "IPTV-HD mini - самая доступная IPTV приставка в мини формате. Идеальное решение для базового просмотра IPTV.",
        keywords: ["iptv-hd mini", "iptv", "мини", "доступная", "hd"],
        ogImage: "https://i.ibb.co/JW7Ncv9r/600x600.jpg"
      }
    },
    {
      id: "14",
      name: "VONTAR H618 ТВ-приставка Android 12 4ГБ/32ГБ",
      price: 4500,
      image: "https://i.ibb.co/bR16Y2W7/7381890732-1.webp",
      additionalImages: [
        "https://i.ibb.co/HTM52Kjv/7251596732.webp",
        "https://i.ibb.co/Lh5qWq1X/7251598314.webp",
        "https://i.ibb.co/276w76Z5/7251596793-1.webp",
      ],
      specs: [
        "3000+ ТВ-каналов без абонплаты",
        "YouTube без рекламы",
        "ОНЛАЙН КИНОТЕАТРЫ 5+ БЕСПЛАТНО",
        "Android 12.0",
        "Процессор: Allwinner H618 Quad Core ARM Cortex A53",
        "Графика: Mali-G31 MP2",
        "Оперативная память: 4 ГБ DDR3",
        "Встроенная память: 32 ГБ eMMC Flash",
        "8K Video, 4K@60fps, HDR10+, H.265/HEVC",
        "Wi-Fi 2.4G/5G, Bluetooth 4.0, Ethernet 100 Мбит/с",
        "2x USB 2.0, MicroSD до 32 ГБ, HDMI 2.0",
        "OTA Обновления, DC 5В 2А",
      ],
      type: "regular",
      description: "🔥ТВ приставка с 3000+ каналами и YouTube без рекламы",
      shortDesc: "Smart TV приставка Android 12 с 8K поддержкой",
      meta: {
        title: "VONTAR H618 - Smart TV приставка Android 12 с 8K поддержкой",
        description: "VONTAR H618 - Smart TV приставка с Android 12, процессором Allwinner H618, 4ГБ DDR3, 32ГБ eMMC. 8K Video, 4K@60fps, HDR10+.",
        keywords: ["vontar h618", "android 12", "allwinner h618", "8k", "4k@60fps", "hdr10+", "smart tv"],
        ogImage: "https://i.ibb.co/bR16Y2W7/7381890732-1.webp"
      }
    },
    {
      id: "15",
      name: "VONTAR H1 ТВ-приставка Android 12",
      price: 3800,
      image: "https://i.ibb.co/d4mbD1Nz/7384651252-1.webp",
      additionalImages: [
        "https://i.ibb.co/8L9VM7Qh/7251581173.webp",
        "https://i.ibb.co/Rk4cQjrh/7251581565.webp",
        "https://i.ibb.co/BKZ1HPXs/7251581252.webp",
      ],
      specs: [
        "3000+ ТВ-каналов без абонплаты",
        "YouTube без рекламы",
        "ОНЛАЙН КИНОТЕАТРЫ 5+ БЕСПЛАТНО",
        "Android 12.0",
        "Процессор: Allwinner H618 Quad Core ARM Cortex A53",
        "Графика: Mali G31 MP2",
        "Оперативная память: 2 ГБ / 4 ГБ",
        "Встроенная память: 16 ГБ / 32 ГБ / 64 ГБ",
        "HDR10+, H.265/HEVC декодер",
        "Wi-Fi 2.4G/5G Dual, Bluetooth, Ethernet 100 Мбит/с",
        "1x USB 2.0, MicroSD до 32 ГБ",
        "OTA Обновления, DC 5В 2А",
      ],
      type: "regular",
      description: "🔥ТВ приставка с 3000+ каналами и YouTube без рекламы",
      shortDesc: "Smart TV приставка Android 12 с гибкой конфигурацией памяти",
      meta: {
        title: "VONTAR H1 - Smart TV приставка Android 12 с гибкой конфигурацией",
        description: "VONTAR H1 - Smart TV приставка с Android 12, процессором Allwinner H618, гибкой конфигурацией памяти (2/4 ГБ RAM, 16/32/64 ГБ ROM). HDR10+, H.265/HEVC.",
        keywords: ["vontar h1", "android 12", "allwinner h618", "hdr10+", "h.265/hevc", "smart tv", "гибкая конфигурация"],
        ogImage: "https://i.ibb.co/d4mbD1Nz/7384651252-1.webp"
      }
    }
  ];

  // Список продуктов для скрытия
  const hiddenProductNames = [
    "P7",
    "Mortal T1 4K ТВ приставка Android 13", 
    "UGOOS X4Q PRO ТВ приставка 4ГБ 32ГБ",
    "UGOOS SK1 ТВ-приставка Android 11 8ГБ 128ГБ"
  ];

  // Фильтруем скрытые продукты
  return allProducts.filter(product => !hiddenProductNames.includes(product.name));
} 
