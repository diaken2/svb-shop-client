import type { Metadata } from 'next';
import { getCategoryData } from './data-service';

export async function generateHomeMetadata(): Promise<Metadata> {
  const categoryData = await getCategoryData('home');
  
  if (!categoryData) {
    return {
      title: "SVB SHOP - ТВ без подписок",
      description: "Smart TV приставки для комфортного просмотра контента",
    };
  }

  return {
    title: categoryData.meta.title,
    description: categoryData.meta.description,
    keywords: categoryData.meta.keywords,
    openGraph: {
      title: categoryData.meta.title,
      description: categoryData.meta.description,
      url: "https://tv-bez-podpiski.ru",
      images: [
        {
          url: categoryData.meta.ogImage || "https://tv-bez-podpiski.ru/og-default.jpg",
          width: 1200,
          height: 630,
          alt: categoryData.meta.title,
        },
      ],
    },
    alternates: {
      canonical: "https://tv-bez-podpiski.ru",
    },
  };
}

export async function generateCatalogMetadata(): Promise<Metadata> {
  const categoryData = await getCategoryData('catalog');
  
  if (!categoryData) {
    return {
      title: "Каталог - SVB SHOP - ТВ без подписок",
      description: "Каталог Smart TV приставок",
    };
  }

  return {
    title: categoryData.meta.title,
    description: categoryData.meta.description,
    keywords: categoryData.meta.keywords,
    openGraph: {
      title: categoryData.meta.title,
      description: categoryData.meta.description,
      url: "https://tv-bez-podpiski.ru/catalog",
      images: [
        {
          url: categoryData.meta.ogImage || "https://tv-bez-podpiski.ru/og-catalog.jpg",
          width: 1200,
          height: 630,
          alt: categoryData.meta.title,
        },
      ],
    },
    alternates: {
      canonical: "https://tv-bez-podpiski.ru/catalog",
    },
  };
}

export async function generateAboutMetadata(): Promise<Metadata> {
  const categoryData = await getCategoryData('about');
  
  if (!categoryData) {
    return {
      title: "О нас - SVB SHOP - ТВ без подписок",
      description: "Информация о компании",
    };
  }

  return {
    title: categoryData.meta.title,
    description: categoryData.meta.description,
    keywords: categoryData.meta.keywords,
    openGraph: {
      title: categoryData.meta.title,
      description: categoryData.meta.description,
      url: "https://tv-bez-podpiski.ru/about",
      images: [
        {
          url: categoryData.meta.ogImage || "https://tv-bez-podpiski.ru/og-about.jpg",
          width: 1200,
          height: 630,
          alt: categoryData.meta.title,
        },
      ],
    },
    alternates: {
      canonical: "https://tv-bez-podpiski.ru/about",
    },
  };
}

export async function generateProductMetadata(productId: string): Promise<Metadata> {
  try {
    // Запрашиваем продукт из API
    const response = await fetch(`https://svb-shop-back.onrender.com/api/products/${productId}`, {
      next: { revalidate: 3600 } // Кэшируем на 1 час для метаданных
    });
    
    if (!response.ok) {
      return {
        title: "Товар не найден - SVB SHOP - ТВ без подписок",
        description: "Запрашиваемый товар не найден",
      };
    }
    
    const data = await response.json();
    
    if (!data.ok || !data.product) {
      return {
        title: "Товар не найден - SVB SHOP - ТВ без подписок",
        description: "Запрашиваемый товар не найден",
      };
    }

    const product = data.product;

    // Используем значения по умолчанию, если meta не определено
    const meta = product.meta || {
      title: product.name,
      description: product.description || product.shortDesc || `Купить ${product.name} по выгодной цене`,
      keywords: [product.name, 'smart tv', 'тв приставка', 'купить', 'цена'],
      ogImage: product.image
    };

    // Обрабатываем keywords (может быть массивом или строкой)
    const keywords = Array.isArray(meta.keywords) 
      ? meta.keywords.join(', ')
      : meta.keywords || `${product.name}, smart tv, тв приставка, купить, цена`;

    return {
      title: meta.title,
      description: meta.description,
      keywords: keywords,
      openGraph: {
        title: meta.title,
        description: meta.description,
        url: `https://tv-bez-podpiski.ru/product/${product.id}`,
        images: [
          {
            url: meta.ogImage || product.image || '/og-default.jpg',
            width: 1200,
            height: 630,
            alt: meta.title,
          },
        ],
      },
      alternates: {
        canonical: `https://tv-bez-podpiski.ru/product/${product.id}`,
      },
    };
  } catch (error) {
    console.error('Error generating product metadata:', error);
    return {
      title: "Товар - SVB SHOP - ТВ без подписок",
      description: "Купить Smart TV приставку в SVB SHOP",
    };
  }
}